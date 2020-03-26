import React, { Component, memo } from 'react'
import classnames from 'classnames'
import defaultImg from './default.png'

export interface IProps {
  src: string // 图片路径
  alt?: string
  defaultSrc?: string // 图片默认路径
  className?: string // class
  style?: Object
  [propName: string]: any
}

class Image extends Component<IProps> {
  static defaultProps = {
    defaultSrc: defaultImg, // 图片默认路径
    alt: 'Image'
  }

  render() {
    const { src, className = '', alt, defaultSrc, ...other } = this.props
    const classNames = classnames('image', className)

    const targetSrc = src
      ? /^http[s]?:\/\/|^\/\//.test(src)
        ? src
        : /^data:image\//.test(src)
        ? src
        : `${window['_global'].qiniu_domain}${src}`
      : defaultSrc

    return (
      <img
        src={targetSrc}
        onError={(e: any) => {
          e.target.setAttribute('src', defaultSrc)
        }}
        alt={alt}
        className={classNames}
        {...other}
      />
    )
  }
}

export default memo(Image)
