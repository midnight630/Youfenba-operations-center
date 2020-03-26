export interface ISiderMenu {
  name: string
  path: string
  title: string
  icon: string
  link: string
  children: any[]
}
// 左侧菜单
export const siderMenu: ISiderMenu[] = [
  {
    name: 'dashboard',
    path: '/dashboard',
    title: '概况',
    icon: 'pie-chart',
    link: '/dashboard',
    children: [
      {
        name: 'customer',
        title: '运营看板',
        path: '/dashboard/operation'
      }
    ]
  },
  {
    name: 'channel',
    path: '/channel',
    title: '渠道',
    icon: 'control',
    link: '/channel',
    children: [
      {
        name: 'channel',
        title: '渠道管理',
        path: '/channel/manage'
      }
    ]
  },
  {
    name: 'data',
    path: '/data',
    title: '数据',
    icon: 'stock',
    link: '/data',
    children: [
      {
        name: 'indicators',
        title: '渠道指标',
        path: '/data/indicators'
      },
      {
        name: 'trend',
        title: '渠道走势',
        path: '/data/trend'
      },
      {
        name: 'order',
        title: '接单指标',
        path: '/data/order'
      },
      {
        name: 'extant',
        title: '留存指标',
        path: '/data/extant'
      }
    ]
  }
]

export interface ISubMenu {
  name: string
  title: string
  path?: string
  children?: ISubMenu[]
}

// 概况 dashboard
export const dashboardMenu: ISubMenu[] = [
  {
    name: 'dashboard',
    title: '概况',
    children: [
      {
        name: 'customer',
        title: '运营看板',
        path: '/dashboard/operation'
      }
    ]
  }
]

// 渠道 dashboard
export const channelMenu: ISubMenu[] = [
  {
    name: 'channel',
    title: '渠道',
    children: [
      {
        name: 'channel',
        title: '渠道管理',
        path: '/channel/manage'
      }
    ]
  }
]

//  数据 data
export const dataMenu: ISubMenu[] = [
  {
    name: 'data',
    title: '数据',
    children: [
      {
        name: 'indicators',
        title: '渠道指标',
        path: '/data/indicators'
      },
      {
        name: 'trend',
        title: '渠道走势',
        path: '/data/trend'
      },
      {
        name: 'order',
        title: '接单指标',
        path: '/data/order'
      },
      {
        name: 'extant',
        title: '留存指标',
        path: '/data/extant'
      }
    ]
  }
]
