import React, { Component } from 'react'
import { DatePicker, Button, Input, Icon } from 'antd'
import { InputProps } from 'antd/es/input'
import classnames from 'classnames'
import moment from 'moment'

import './style.less'

interface IProps extends InputProps {
  className?: string
  style?: object
  innerStyle?: object
  value?: any
  format?: string
  onChange?: any
  onPanelChange?: any
  onOk?: any
  onCancel?: any
  allowClear?: boolean
  placeholder?: string
}

const format = 'YYYY-MM-DD'

class MultipleDatePicker extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      open: false,
      value: [],
      prevValue: []
    }
  }

  handleChange = (date: any) => {
    const { value } = this.state
    const { onChange } = this.props

    const index = this.findDateIndex(value, date)

    if (index < 0) {
      // 不存在数组中
      value.push(date)
      this.setState({
        value
      })
    } else {
      value.splice(index, 1)
      this.setState({
        value
      })
    }

    const dateStr = this.getDateStr(value)

    if (typeof onChange == 'function') {
      onChange(value, dateStr)
    }
  }

  handleOk = () => {
    const { onOk } = this.props
    const { value } = this.state
    if (typeof onOk == 'function') {
      onOk(value, this.getDateStr(value))
    }
    this.setState({
      open: false
    })
  }

  handleCancel = () => {
    const { onCancel } = this.props
    const { prevValue } = this.state

    this.setState(
      {
        open: false
      },
      () => {
        if (typeof onCancel == 'function') {
          onCancel(prevValue, this.getDateStr(prevValue))
        }
      }
    )
  }

  dateRander = (currentDate: any) => {
    const { value } = this.state

    const index = this.findDateIndex(value, currentDate)
    let cls = 'ant-calendar-date'
    cls =
      index < 0
        ? cls
        : cls + ' nmmc_calendar-select-date nmmc_calendar-select-day'

    return (
      <div className={cls} aria-selected={index < 0} aria-disabled="false">
        {currentDate.format('DD')}
      </div>
    )
  }

  disabledDate = (current: any) => {
    return current && current < moment().startOf('day')
  }

  findDateIndex(value: any, date: any) {
    const index = value.findIndex((v: any) => {
      return date.format(format) === v.format(format)
    })
    return index
  }

  getDateStr(date: any) {
    return date.map((d: any) => d.format(format ? format : 'YYYY-MM-DD'))
  }

  handleOpenChange = (status: any) => {
    this.setState({
      open: status
    })
  }

  handleOpenDatePicker = () => {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

  handleAllowClear = () => {
    const { onChange } = this.props
    this.setState({
      value: [],
      prevValue: []
    })

    if (typeof onChange == 'function') {
      onChange([], [])
    }
  }

  render() {
    const { open, value } = this.state
    let {
      size,
      className,
      style,
      innerStyle,
      format,
      allowClear,
      placeholder
    } = this.props
    const classNames = classnames('hmm_multiple_date', className)

    const inputValue = this.getDateStr(value).join(',')
    return (
      <div className={classNames} style={style}>
        <div className="hmm_multiple_date_input_warp">
          <Input
            size={size}
            className="hmm_multiple_date_input"
            onClick={this.handleOpenDatePicker}
            value={inputValue}
            placeholder={placeholder}
            style={innerStyle}
            suffix={
              inputValue.length > 0 ? (
                allowClear ? (
                  <Icon
                    type="close-circle"
                    theme="filled"
                    onClick={this.handleAllowClear}
                    style={{ display: 'none', color: 'rgba(0,0,0,.25)' }}
                  />
                ) : null
              ) : (
                <Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />
              )
            }
          />
        </div>
        <DatePicker
          onChange={this.handleChange}
          format={format}
          className="hmm_multiple_date_picker"
          open={open}
          showToday={false}
          disabledDate={this.disabledDate}
          dropdownClassName="hmm_multiple_date_picker_dropdown"
          getCalendarContainer={(): any =>
            document.getElementsByClassName('hmm_multiple_date_input_warp')[0]
          }
          showTime
          onOpenChange={this.handleCancel}
          renderExtraFooter={() => (
            <div className="hmm_multiple_date_picker_dropdown-footer">
              <Button size="small" onClick={this.handleCancel}>
                取消
              </Button>
              <Button size="small" type="primary" onClick={this.handleOk}>
                确定
              </Button>
            </div>
          )}
          dateRender={this.dateRander}
        />
      </div>
    )
  }
}

export default MultipleDatePicker
