import { RouteConfig } from 'react-router-config'

import Home from '../containers/Home'

import { DashboardSub, Dashboard } from '../containers/Home/Dashboard/children'

import { ChannelSub, Channel } from '../containers/Home/Channel/children'

import {
  DataSub,
  Data,
  DataTrend,
  DataOrder,
  DataExtant
} from '../containers/Home/Data/children'

import NotFound from '../containers/Error/NotFound'

export interface IRoutes extends RouteConfig {
  defaultRouter?: number
  routes?: IRoutes[]
}

export const routes: IRoutes[] = [
  {
    path: '/',
    component: Home,
    defaultRouter: 0,
    routes: [
      {
        path: '/dashboard',
        component: DashboardSub,
        defaultRouter: 0,
        routes: [
          {
            path: '/dashboard/operation',
            component: Dashboard
          }
        ]
      },
      {
        path: '/channel',
        component: ChannelSub,
        defaultRouter: 0,
        routes: [
          {
            path: '/channel/manage',
            component: Channel
          }
        ]
      },
      {
        path: '/data',
        component: DataSub,
        defaultRouter: 0,
        routes: [
          {
            path: '/data/indicators',
            component: Data
          },
          {
            path: '/data/trend',
            component: DataTrend
          },
          {
            path: '/data/order',
            component: DataOrder
          },
          {
            path: '/data/extant',
            component: DataExtant
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

export const defaultRoute = routes[0]
