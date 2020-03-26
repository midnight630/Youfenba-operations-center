import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

interface IProps {
  level?: any[]
}

const BreadcrumbCustom = (props: IProps) => {
  const { level }: any = props
  const levelData = level
    ? level.map((v: any, i: string) => {
        let { link }: any = v
        return (
          <Breadcrumb.Item key={i}>
            {v.tag && v.tag === 'a' && v.link && v.name ? (
              <a href={link}>{v.name}</a>
            ) : v.link && v.name ? (
              <Link to={link}>{v.name}</Link>
            ) : (
              v.name
            )}
          </Breadcrumb.Item>
        )
      })
    : null
  return (
    <span>
      <Breadcrumb style={{ margin: '12px 0' }}>{levelData}</Breadcrumb>
    </span>
  )
}

export default BreadcrumbCustom
