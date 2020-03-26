import React, { memo } from 'react'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import Router from './Router'

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  )
}

export default memo(App)
