import React, { useEffect } from 'react'
import { dashboardMenu } from 'src/Router/menu'
import { RenderPage } from 'src/components'
import './index.less'

const Dashboard = (props: any) => {
  useEffect(() => {
    if (props.location.pathname === '/dashboard') {
      props.history.push('/dashboard/operation')
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname])
  return (
    <div className="dashboard_container">
      <RenderPage {...props} menu={dashboardMenu} />
    </div>
  )
}

export default Dashboard
