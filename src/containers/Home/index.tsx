import React, { useState, useEffect } from 'react'
import { Layout, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { renderRoutes, RouteConfig } from 'react-router-config'
import { SiderMenu, User, Image } from 'src/components'
import { classPrefix } from 'src/const/index'
import logo from 'src/assets/images/logo.png'
import { getMe as getMeModel, getGlobal as getGlobalModel } from 'src/api/user'
import { useLocation, useHistory } from 'react-router-dom'
import './index.less'

const { Header, Sider, Content } = Layout

interface IProps extends RouteConfig {
  children?: any
}

const Home = (props: IProps) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  let location = useLocation()
  let history = useHistory()

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      history.push('/dashboard')
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    // const getMe = getMeModel()
    // const getGlobal = getGlobalModel()
    // Promise.all([getMe, getGlobal]).then(function(values) {
    //   if (values[0].data.code === 200 && values[1].data.code === 200) {
    //     window['_global'] = values[1].data.data
    //     setUser(values[0].data.data.user)
    //     setLoading(false)
    //   }
    // })
  }, [])

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: '100vh'
  //       }}
  //     >
  //       <Icon type="loading" style={{ fontSize: 30 }} />
  //     </div>
  //   )
  // }

  return (
    <Layout className={classPrefix + '_layout'}>
      <Sider className={classPrefix + '_sider'} theme="light" width={200}>
        <Link to="/">
          <div className={classPrefix + '_logo'}>
            <Image src={logo} />
            <span className="site-name-cn">优粉吧运营中心</span>
          </div>
        </Link>
        <SiderMenu />
      </Sider>
      <Layout className={classPrefix + '_right-layout'}>
        <Header className={classPrefix + '_right-layout-header'}>
          <div className="left"></div>
          <div className="right">
            <User user={user} />
          </div>
        </Header>
        <Content className={classPrefix + '_right-layout-content'}>
          {renderRoutes(props.route.routes)}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Home
