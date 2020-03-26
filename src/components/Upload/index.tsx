import React, { useState } from 'react'
import { Icon, Button } from 'antd'
import Upload from 'rc-upload'
import { getQiniuToken as getQiniuTokenModel } from 'src/api/qiniu'
import './index.less'

// https://www.npmjs.com/package/rc-upload

export interface RcFile extends File {
  uid: string
  readonly lastModifiedDate: Date
  readonly webkitRelativePath: string
}

export interface UploadFile<T = any> {
  uid: string
  size: number
  name: string
  fileName?: string
  lastModified?: number
  lastModifiedDate?: Date
  url?: string
  status?: 'error' | 'success' | 'done' | 'uploading' | 'removed'
  percent?: number
  thumbUrl?: string
  originFileObj?: File | Blob
  response?: T
  error?: any
  linkProps?: any
  type: string
  xhr?: T
  preview?: string
}

export interface IRcUpload {
  name?: string
  style?: object
  className?: string
  disabled?: boolean
  component?: string // 标签名
  //   supportServerRender?: boolean
  //   onReady?: void
  //   action?: string
  //   method?: string
  //   directory?: boolean
  //   data?: object | () => object
  //   headers: object
  accept?: string
  multiple?: boolean
  onStart?: (node: any) => void
  onError?: (error: Error, response: any, file: UploadFile<any>) => void
  onSuccess?: (response: any, file: UploadFile<any>, xhr: any) => void
  onProgress?: (
    e: {
      percent: number
    },
    file: UploadFile<any>
  ) => void
  //   beforeUpload?: (
  //     file: RcFile,
  //     fileList: RcFile[]
  //   ) => boolean | PromiseLike<void>
  //   customRequest?: void
  openFileDialogOnClick?: boolean
  //   transformFile: void
  children?: React.ReactNode
}

const UploadButton = (
  <Button>
    <Icon type="upload" /> Click to Upload
  </Button>
)
function UploadComponent(props: IRcUpload) {
  const { accept = 'image/*', ...otherProps } = props
  const [token, setToken] = useState<string>('')

  const getToken = () => {
    return getQiniuTokenModel().then(res => {
      if (res.data.code === 200) {
        setToken(res.data.data.token)
        return true
      }
    })
  }

  //   const handleUploadSuccess = (data: any) => {
  //     //   imageList[0] = {
  //     //     url: `${'_global.qiniu_domain'}/${data.url}`,
  //     //     img: `${'_global.qiniu_domain'}/${data.url}`
  //     //   }
  //   }

  // https://www.npmjs.com/package/rc-upload
  return (
    <Upload
      accept={accept}
      action={
        window.location &&
        window.location.protocol &&
        window.location.protocol === 'https:'
          ? '//upload.qbox.me'
          : '//up.qiniu.com'
      }
      data={() => ({ token })}
      beforeUpload={() => getToken()}
      {...otherProps}
    >
      {props.children || UploadButton}
    </Upload>
  )
}

export default UploadComponent
