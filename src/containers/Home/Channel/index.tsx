import React, { useEffect } from 'react'
import { channelMenu } from 'src/Router/menu'
import { RenderPage } from 'src/components'
import './index.less'

const Channel = (props: any) => {
  useEffect(() => {
    if (props.location.pathname === '/channel') {
      props.history.push('/channel/manage')
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname])
  return (
    <div className="dashboard_container">
      <RenderPage {...props} menu={channelMenu} />
    </div>
  )
}

export default Channel
