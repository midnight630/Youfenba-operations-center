import React, { useState, useEffect } from 'react'
import { Icon, message, Progress, Button } from 'antd'
import Upload from 'rc-upload'
import './style.less'

interface IProps {
  fileList: any[]
  onChange: any
  maxLength?: number
  accept?: string
  location?: any
}

function UploadFile(props: IProps) {
  const [fileList, setfileList] = useState<any>(props.fileList || [])
  const [upload, setupload] = useState<any>(undefined)
  const [token, settoken] = useState<any>(undefined)

  useEffect(() => {
    setfileList(props.fileList)
    return () => {
      settoken(undefined)
    }
  }, [props.fileList])

  const getToken = () => {
    settoken('token')
    return true
  }

  const handleUploadStart = (data: any) => {
    console.log(data, data.size / 1024 / 1024 < 2, '1111111111111')
    let filesize = data.size / 1024 / 1024 < 2
    if (!filesize) {
      message.error('文件过大，要小于5M')
      return
    }
    setupload(
      Object.assign(upload, { uid: data.uid, percent: 0, name: data.name })
    )
  }

  const handleUploadProgress = (data: any) => {
    setupload(Object.assign(upload, { percent: data.percent }))
  }

  const handleUploadSuccess = (data: any) => {
    const { onChange } = props
    fileList[0] = {
      url: `${'_global.qiniu_domain'}/${data.url}`,
      name: data.file_name
    }
    setfileList(fileList)
    setupload(undefined)
    onChange(fileList)
  }

  const handleUploadError = (err: any, response: any) => {
    console.log('handleUploadError')
    setupload(undefined)
    if (response.error && response.error === 'bad token') {
      settoken(undefined)
      getToken()
      message.error('token失效，请重试！')
      return
    } else {
      response = JSON.parse(response.error)
    }
    message.error(response.error)
  }

  const handleDeleteImage = (index: number) => {
    const { onChange } = props
    fileList.splice(index, 1)
    setfileList(fileList)
    onChange(fileList)
  }

  const { maxLength, accept, location } = props
  const uploadButton = (
    <div className="addimgbox">
      <Button>
        <Icon type="upload" />
        上传文件
      </Button>
    </div>
  )

  return (
    <div className="op-upload-file">
      <div className="upload-box">
        <div className="op-upload-list">
          {fileList && fileList.length !== 0
            ? fileList.map((item: any, index: number) => (
                <div
                  key={index}
                  className="op-upload-list-item-one image"
                  data-id={index}
                >
                  <Icon type="snippets" className="snippets" />
                  <span>
                    {item.name && item.name.length > 8
                      ? item.name.substring(0, 7) + '...'
                      : item.name}
                  </span>
                  <span
                    onClick={() => handleDeleteImage(index)}
                    className="remove-btn"
                  >
                    <Icon type="delete" />
                  </span>
                </div>
              ))
            : ''}
        </div>
      </div>
      <div className="upload-box">
        <div className="op-upload-list">
          {upload ? (
            <div className="op-upload-list-item-one upload">
              <div className="upload-btn">
                <span>上传中...</span>
                <Progress
                  percent={upload.percent}
                  showInfo={false}
                  size="small"
                />
              </div>
            </div>
          ) : null}
          {fileList && fileList.length < (maxLength || 11) ? (
            <div
              className="op-upload-list-item-one upload"
              style={{ display: upload ? 'none' : 'block' }}
            >
              <Upload
                className="upload-btn-one"
                accept={accept ? accept : ''}
                action={
                  location &&
                  location.protocol &&
                  location.protocol === 'https:'
                    ? '//upload.qbox.me'
                    : '//up.qiniu.com'
                }
                data={() => ({ token })}
                beforeUpload={() => getToken()}
                onStart={handleUploadStart}
                onProgress={handleUploadProgress}
                onError={handleUploadError}
                onSuccess={handleUploadSuccess}
              >
                {fileList && fileList.length > 0 ? null : uploadButton}
              </Upload>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default UploadFile
