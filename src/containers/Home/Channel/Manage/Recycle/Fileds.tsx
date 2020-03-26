import React, { useState, useEffect } from 'react'
import { Card, Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'

const { Option } = Select
const { RangePicker } = DatePicker

interface IProps {
  form: any
  callback: any
}

const Fileds = Form.create<IProps>()((props: IProps) => {
  const { getFieldDecorator } = props.form

  useEffect(() => {
    return () => {}
  }, [])

  const handleSubmit = () => {
    props.callback()
  }

  return (
    <Card bordered={false} className="fileds">
      <Form className="ant-advanced-search-form" onSubmit={handleSubmit}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="类型">
              {getFieldDecorator(`type`)(
                <Select placeholder="选择类型" allowClear>
                  <Option value="0">不限</Option>
                  <Option value="1">百度</Option>
                  <Option value="2">360</Option>
                  <Option value="3">搜狗</Option>
                  <Option value="4">其他</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
})

export default Fileds
