import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Icon } from 'antd'
import cx from 'classnames'
import { ISubMenu } from 'src/Router/menu'
import { classPrefix } from 'src/const/index'
import { routeMatching } from 'src/utils/util'
import './index.less'

export interface ISubMenuProps {
  list: ISubMenu[]
  select: string | string[]
}

const SubMenu = (props: ISubMenuProps) => {
  const [showside, setshowside] = useState(true)
  const { list, select } = props
  // 判断前两级路由，对应的上，即显示高亮
  const routeFocus = routeMatching(select, 2)
  return (
    <Layout.Sider
      width={showside ? 130 : 0}
      className={`${classPrefix}_layout-sider-sub`}
    >
      <ul className={`${classPrefix}_sub-menu`}>
        {list.map((item, index) => (
          <li key={item.name + index}>
            <a>{item.title}</a>
            {item.children ? (
              <ul>
                {item.children
                  ? item.children.map(it => (
                      <li
                        key={it.name}
                        className={cx({
                          select: routeFocus === it.path
                        })}
                      >
                        <Link to={it.path || ''}>{it.title}</Link>
                      </li>
                    ))
                  : null}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
      <span
        onClick={() => setshowside(!showside)}
        className={`${classPrefix}_sub-show`}
      >
        <Icon type={showside ? 'left' : 'right'} />
      </span>
    </Layout.Sider>
  )
}

export default SubMenu
