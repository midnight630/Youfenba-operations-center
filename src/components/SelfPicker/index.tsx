import * as React from 'react'
import { DatePicker, Radio } from 'antd'
import moment from 'moment'
import './index.less'
import { classPrefix } from '../../const/index'
const { RangePicker } = DatePicker
export interface IProps {
  group?: any
  focus?: number
  excludeToday?: boolean
  rangePicker?: any
  onSummit?: any
}
/**
 * @group 必填项 array 长度不固定取决于多少时间选项卡，数组内部item的text要和num统一，example：text为‘近7天’，num应为7
 * @focus number|string 非必填 当前选中的选项卡的key
 * @excludeToday 非必填  boolen 默认false 取决于近x天包不包括今天，不包括为true
 * @rangePicker 非必填 object antd RangePicker组件的其他属性定义，包括可选时间等
 * @onSummit 必填项 func 选项卡成功回调，返回日期数组
 * 使用方法可以参考文件夹containers/Home/Home/Conversion组件SelfPicker
 */
class SelfPicker extends React.Component<IProps, object> {
  state: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      focus: props.focus || 0,
      start_at: '',
      end_at: ''
    }
  }

  componentDidMount() {
    const { focus, onSummit, excludeToday } = this.props
    const focusNum = Number(focus)
    if (focusNum) {
      const start_at = excludeToday
        ? moment()
            .add('days', -focusNum)
            .format('YYYYMMDD')
        : moment()
            .add('days', -focusNum + 1)
            .format('YYYYMMDD')

      const end_at = excludeToday
        ? moment()
            .add('days', -1)
            .format('YYYYMMDD')
        : moment().format('YYYYMMDD')
      this.setState({ start_at, end_at }, () => onSummit([start_at, end_at]))
    }
  }

  render() {
    const { focus, start_at, end_at } = this.state
    const { onSummit, group, rangePicker, excludeToday } = this.props
    const r_value: any = [
      start_at ? moment(start_at) : null,
      end_at ? moment(end_at) : null
    ]
    return (
      <div className={`${classPrefix}-components-selfpicker clearfix`}>
        <div
          className={`${classPrefix}-components-selfpicker-content l-left clearfix`}
        >
          <Radio.Group
            onChange={(e: any) => {
              const dayEnd = excludeToday
                ? moment()
                    .add('days', -1)
                    .format('YYYYMMDD')
                : moment().format('YYYYMMDD')
              const numE = Number(e.target.value)
              const dayStart = excludeToday
                ? moment()
                    .add('days', -numE)
                    .format('YYYYMMDD')
                : moment()
                    .add('days', -numE + 1)
                    .format('YYYYMMDD')
              this.setState({
                focus: numE,
                start_at: dayStart,
                end_at: dayEnd
              })
              onSummit([dayStart, dayEnd])
            }}
            value={focus}
          >
            {group.map((it: any) => {
              return (
                <Radio.Button key={it.num} value={it.num}>
                  {it.text}
                </Radio.Button>
              )
            })}
          </Radio.Group>
        </div>
        <div className="l-left m-l-20 clearfix">
          <div className="l-left">
            <RangePicker
              allowClear={false}
              style={{ width: '240px' }}
              value={r_value}
              onChange={(data, e) => {
                this.setState({ start_at: e[0], end_at: e[1], focus: 0 })
                const st = moment(e[0]).format('YYYYMMDD')
                const ed = moment(e[1]).format('YYYYMMDD')
                onSummit([st, ed])
              }}
              {...rangePicker}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SelfPicker
