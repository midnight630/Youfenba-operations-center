import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { ISubMenu } from 'src/Router/menu'
import { IRoutes } from 'src/Router/routes'
import { classPrefix } from 'src/const/index'
import SubMenu from '../SubMenu'

import './index.less'

export interface IRenderPageProps {
  route?: IRoutes
  menu?: ISubMenu[]
  className?: string
}

const RenderPage = (props: IRenderPageProps) => {
  const { route, menu } = props
  if (!route) {
    return null
  }

  const defaultRoute = route.routes
    ? route.routes[route.defaultRoute || 0]
    : route

  const MatchRoute = matchRoutes(
    route.routes ? route.routes : [route],
    window.location.pathname
  )

  const select = MatchRoute.length
    ? MatchRoute[0].route.path
      ? MatchRoute[0].route.path
      : ''
    : defaultRoute.path
    ? defaultRoute.path
    : ''
  return (
    <Layout className={classPrefix + '_layout-renderpage'}>
      {/* {menu ? <SubMenu list={menu} select={select} /> : null} */}
      <Layout.Content>
        {MatchRoute.length ? (
          renderRoutes(route.routes, { defaultRoute })
        ) : (
          <Route component={defaultRoute.component} />
        )}
      </Layout.Content>
    </Layout>
  )
}

export default RenderPage
