import React, { useMemo, useCallback } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { classPrefix } from 'src/const'
import classnames from 'classnames'
import { Image } from 'src/components'
import { getLogout as getLogoutModel } from 'src/api/login'
import './index.less'

export interface IUser {
  username?: string
  id?: number
  nick_name?: string
}
export interface IUserProps {
  className?: string
  user: IUser
}

const User = (props: IUserProps) => {
  const { className, user } = props

  const classNames = classnames(`${classPrefix}_header-user`, className)
  const history = useHistory()

  const handleLogout = useCallback(() => {
    getLogoutModel()
      .then(res => {
        if (res.data.code === 200) {
          history.push('/login')
        }
      })
      .catch(e => {})
  }, [getLogoutModel])

  const menu = useMemo(
    () => (
      <Menu style={{ width: 85 }}>
        {/* <Menu.Item key="0">
          <Link to="/">
            <div>配置菜单</div>
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/">
            <div>修改密码</div>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="2" onClick={handleLogout}>
          <div>退出登录</div>
        </Menu.Item>
      </Menu>
    ),
    [handleLogout]
  )

  return (
    <Dropdown overlay={menu} className={classNames} placement="bottomRight">
      <div
        className={`${classPrefix}_header-user-pointer`}
        data-id={user.id || ''}
      >
        <div className="user" title={user.nick_name}>
          <Image src="" className="face" />
          <span className="text-ellipsis-one nick-name">
            {user.nick_name || ''}
          </span>
        </div>
        <Icon type="down" />
      </div>
    </Dropdown>
  )
}

export default User
