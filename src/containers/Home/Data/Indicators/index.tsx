import React, { useState, useEffect } from 'react'
import { RouteConfig } from 'react-router-config'

interface IProps extends RouteConfig {
  children?: any
  location?: any
  route?: any
}
const Indicators = (props: IProps) => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    setData(1)
  }, [])
  return <div>渠道指标{data}</div>
}

export default Indicators
