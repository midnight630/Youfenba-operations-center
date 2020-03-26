import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { siderMenu, ISiderMenu } from 'src/Router/menu'
import classnames from 'classnames'
import { classPrefix } from 'src/const'

import './index.less'

const SiderMenu = () => {
  const classNames = classnames(`${classPrefix}_sider_menu`)
  const [select, setSelect] = useState<any>([])
  const [open, setOpen] = useState<any>([])
  const pathname = window.location.pathname
  const matchPath = window.location.pathname.match(/^\/[0-9,a-z, A-Z]*/)

  useEffect(() => {
    setSelect([pathname])
    if (matchPath) {
      let path = matchPath[0]
      setOpen(path === '/' ? ['/dashboard'] : [path])
    }
  }, [pathname])

  const handleChange = ({ ...param }) => {
    setSelect(param.selectedKeys)
  }

  const onOpenChange = (openKeys: any) => {
    setOpen(openKeys)
  }

  return (
    <Menu
      mode="inline"
      openKeys={open}
      selectedKeys={select}
      onOpenChange={onOpenChange}
      onSelect={handleChange}
      style={{ width: 200, paddingTop: 10 }}
      className={classNames}
    >
      {siderMenu.map((item: ISiderMenu) => {
        return item.children && item.children.length > 0 ? (
          <Menu.SubMenu
            key={item.link}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {item.children.map((child: any) => (
              <Menu.Item key={child.path}>
                <Link to={child.path}>
                  <span>{child.title}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default SiderMenu
