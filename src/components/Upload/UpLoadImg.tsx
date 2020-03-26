import React, { useState, useEffect } from 'react'
import { Icon, message, Progress, Avatar, Button } from 'antd'
import Upload from 'rc-upload'
import './style.less'

interface IProps {
  imageList: any
  onChange: any
  maxLength: number
  location?: any
  uploadChildren?: any
}
const uploadButton = (
  <div className="addimgbox">
    <Button type="primary">上传</Button>
  </div>
)
function UploadImage(props: IProps) {
  const [imageList, setimageList] = useState<any>(props.imageList || [])
  const [upload, setupload] = useState<any>('')
  const [token, settoken] = useState<any>(undefined)
  // const [element] = useState<any>(
  //   props.uploadChildren ? props.uploadChildren : uploadButton
  // )
  useEffect(() => {
    setimageList(props.imageList)
    return () => {
      settoken(undefined)
    }
  }, [props.imageList])

  const getToken = () => {
    settoken('token')
    return true
  }

  const handleUploadStart = (data: any) => {
    setupload(
      Object.assign(upload, {
        uid: data.uid,
        percent: 0
      })
    )
  }

  const handleUploadProgress = (data: any) => {
    setupload(
      Object.assign(upload, {
        percent: data.percent
      })
    )
  }

  const handleUploadSuccess = (data: any) => {
    const { onChange } = props
    imageList[0] = {
      url: `${'_global.qiniu_domain'}/${data.url}`,
      img: `${'_global.qiniu_domain'}/${data.url}`
    }
    setupload(undefined)
    setimageList(imageList)
    onChange(imageList)
  }

  const handleUploadError = (err: any, response: any) => {
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
    imageList.splice(index, 1)
    setimageList(imageList)
    onChange(imageList)
  }

  const { maxLength, location } = props

  return (
    <div className="op-upload-image">
      <div className="upload-box">
        <div className="op-upload-list">
          {imageList && imageList.length !== 0
            ? imageList.map((item: any, index: number) => (
                <div
                  key={index}
                  className="op-upload-list-item-one image"
                  data-id={index}
                >
                  {item.url ? (
                    <img
                      alt="uploadimg"
                      src={
                        /(http[s]|http)?:\/\//.test(item.url)
                          ? item.url
                          : `${'_global.qiniu_domain'}/${item.url}`
                      }
                    />
                  ) : (
                    <Avatar shape="square" size={110} icon="user" />
                  )}
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
          {imageList && imageList.length < (maxLength || 11) ? (
            <div
              className="op-upload-list-item-one upload"
              style={{ display: upload ? 'none' : 'block' }}
            >
              <Upload
                className="upload-btn-one"
                accept="image/*"
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
                {imageList && imageList.length !== 0 ? null : uploadButton}
              </Upload>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default UploadImage
