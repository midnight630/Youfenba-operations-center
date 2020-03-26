import * as React from 'react'
import './index.less'
import { classPrefix } from '../../const/index'
export interface IProps {
  children?: any
  title?: any
}
const Bar = (props: IProps) => {
  return (
    <div className={`${classPrefix}-components-bar`}>
      {props.children || props.title}
    </div>
  )
}
export default Bar
