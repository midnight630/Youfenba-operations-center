import React, { useEffect } from 'react'
import { dataMenu } from 'src/Router/menu'
import { RenderPage } from 'src/components'
import './index.less'

const Data = (props: any) => {
  useEffect(() => {
    if (props.location.pathname === '/data') {
      props.history.push('/data/indicators')
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname])
  return (
    <div className="dashboard_container">
      <RenderPage {...props} menu={dataMenu} />
    </div>
  )
}

export default Data
