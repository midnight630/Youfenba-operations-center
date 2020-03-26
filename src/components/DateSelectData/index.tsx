import React, { useState, memo } from 'react'
import { Radio, DatePicker } from 'antd'
import moment from 'moment'
interface IProps {
  defaultValue?: number
  getSelectDate?: any
}
const DateSelectData = (props: IProps) => {
  const dayEnd: any = moment()
  const dayWeek: any = moment().add(-6, 'days')
  const dayMonth: any = moment().add(-29, 'days')
  const dateFormat: string = 'YYYY-MM-DD'
  const [date_time, setDateTime] = useState([
    props.defaultValue === 1
      ? dayEnd
      : props.defaultValue === 2
      ? dayWeek
      : props.defaultValue === 3
      ? dayMonth
      : dayEnd,
    moment()
  ])
  const [tabActive, setTabActive] = useState(
    props.defaultValue ? props.defaultValue : 1
  )
  const handleTabChange = (e: any) => {
    let value: number = e.target.value
    setTabActive(value)
    setDateTime([
      moment(
        value === 1
          ? dayEnd
          : value === 2
          ? dayWeek
          : value === 3
          ? dayMonth
          : dayEnd,
        dateFormat
      ),
      moment(dayEnd, dateFormat)
    ])
    if (typeof props.getSelectDate === 'function') {
      props.getSelectDate([
        moment(
          value === 1
            ? dayEnd
            : value === 2
            ? dayWeek
            : value === 3
            ? dayMonth
            : dayEnd,
          dateFormat
        ).format(dateFormat),
        moment(dayEnd, dateFormat).format(dateFormat)
      ])
    }
  }
  const handleTimeChange = (date: any, dateString: any) => {
    let day: string = JSON.stringify([
      dayEnd.format(dateFormat),
      dayEnd.format(dateFormat)
    ])
    let week: string = JSON.stringify([
      dayEnd.format(dateFormat),
      dayEnd.format(dateFormat)
    ])
    let month: string = JSON.stringify([
      dayEnd.format(dateFormat),
      dayEnd.format(dateFormat)
    ])
    let dateS: string = JSON.stringify(dateString)
    setDateTime(date)
    if (day === dateS) {
      setTabActive(1)
    } else if (week === dateS) {
      setTabActive(2)
    } else if (month === dateS) {
      setTabActive(3)
    } else {
      setTabActive(0)
    }
    if (typeof props.getSelectDate === 'function') {
      props.getSelectDate(dateString)
    }
  }
  return (
    <>
      <Radio.Group
        className="date_select"
        value={tabActive}
        onChange={handleTabChange}
      >
        {!(
          props.defaultValue &&
          (props.defaultValue === 2 || props.defaultValue === 3)
        ) ? (
          <Radio.Button value={1}>今日</Radio.Button>
        ) : null}
        {!(props.defaultValue && props.defaultValue === 3) ? (
          <Radio.Button value={2}>近7日</Radio.Button>
        ) : null}
        <Radio.Button value={3}>近30日</Radio.Button>
      </Radio.Group>

      <DatePicker.RangePicker
        style={{ width: 240 }}
        allowClear={false}
        value={date_time}
        onChange={handleTimeChange}
        format="YYYY-MM-DD"
      />
    </>
  )
}
export default memo(DateSelectData)
