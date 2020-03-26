import React, { useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Modal } from 'antd'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import './index.less'

export interface IProps {
  visible?: any
  className?: any
  [propKey: string]: any
}

const Dialog = (props: IProps) => {
  const { visible, className } = props

  const [visible1, setVisible1] = useState(true)

  const handleCancel = () => {
    setVisible1(!visible1)
  }

  return (
    <Modal
      visible={typeof visible != 'undefined' ? visible : visible}
      onCancel={handleCancel}
      {...props}
      className={className ? `v-dialog ${className}` : 'v-dialog'}
    />
  )
}

export default Dialog

Dialog.OpenDialog = (base = {}, children?: any) => {
  const container: any = document.createElement('div')
  document.body.appendChild(container)

  const props = Object.assign(base, {
    afterClose: () => unmountComponentAtNode(container),
    getContainer: () => container
  })

  render(
    <ConfigProvider locale={zh_CN}>
      <children.type {...children.props} {...props} />
    </ConfigProvider>,
    container
  )
}
