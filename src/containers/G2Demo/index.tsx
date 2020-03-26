import React from 'react'
import { classPrefix } from '../../const/index'
import classnames from 'classnames'

interface IProps {
  className?: string
}
const G2Demo = (props: IProps) => {
  // 下面是代码不一定能执行成功  但是语法不报错了

  const classNames = classnames(classPrefix + '_g2demo', props.className)

  const chart = new G2.Chart({
    container: 'c1',
    width: 1000,
    height: 500
  })

  return <div id="chart_10000" className={classNames}></div>
}

export default G2Demo
