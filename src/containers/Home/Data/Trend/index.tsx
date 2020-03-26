import React, { useState, useEffect } from 'react'
import { RouteConfig } from 'react-router-config'

interface IProps extends RouteConfig {
  children?: any
  location?: any
  route?: any
}
const Trend = (props: IProps) => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    setData(1)
  }, [])

  return <div>渠道走势{data}</div>
}

export default Trend
