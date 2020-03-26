import React, { useState, useEffect } from 'react'
import { RouteConfig } from 'react-router-config'
import { Card, Row, Col } from 'antd'
import { Sem } from './children'

interface IProps extends RouteConfig {
  children?: any
  location?: any
  route?: any
}
const Manage = (props: IProps) => {
  const [id, setId] = useState<any>()

  useEffect(() => {
    setId(1)
  }, [])

  console.log(props)

  const onSearch = (params: any) => {
    console.log(params)
  }

  return (
    <div>
      <Row justify="space-between" gutter={20}>
        <Col span={3}>
          <Card bordered={false} className="sider">
            <p className="tit">通用渠道</p>
            <div>
              <ul className="list">
                <li className="active">123</li>
                <li>123</li>
              </ul>
            </div>
            <p className="tit">媒体主渠道</p>
            <div>
              <ul className="list">
                <li>123</li>
                <li>123</li>
              </ul>
            </div>
            <p className="tit">广告主渠道</p>
            <div>
              <ul className="list">
                <li>123</li>
                <li>123</li>
              </ul>
            </div>
          </Card>
        </Col>
        <Col span={21}>
          <Sem channelId={id} />
        </Col>
      </Row>
    </div>
  )
}

export default Manage
