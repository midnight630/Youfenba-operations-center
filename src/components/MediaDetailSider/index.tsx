import React, { memo, useState } from 'react'
import { Drawer, List, Avatar, Icon, Input, Button } from 'antd'
import { Image } from 'src/components'
import './style.less'
const { Search } = Input

interface IMedDetProps {
  data?: any
  list?: any
  history?: any
  onClickList?: any //点击列表
  onClose: any //关闭左侧
  onTogglerContent: any //关闭打开 左侧
  visible: boolean
}

export default memo(function Index(props: IMedDetProps) {
  const { data, onClickList, onClose, onTogglerContent, visible } = props
  const detailclass: string = 'media_detail_mp'

  // const jump = (id: any) => {
  //   props.history.push(`/media/detail_mp/${id}`)
  //   setvisible(false)
  // }

  const handleSearch = () => {
    // let { opts } = this.state
    // this.setState({
    //   searchLoading: true
    // })
    // document.getElementById('drawer-wechat-list-scroll').scrollTop = 0
    // get({
    //   url: this.props.http,
    //   headers: {
    //     params: Object.assign(opts, { keyword: e, offset: 1 })
    //   }
    // }).then(res => {
    //   if (res && res.data) {
    //     this.setState(
    //       {
    //         total: res._count,
    //         data: res.data,
    //         searchLoading: false
    //       },
    //       () => {
    //         this.hasMore()
    //       }
    //     )
    //   }
    // })
  }

  return (
    <Drawer
      placement="right"
      width={300}
      closable={false}
      onClose={onClose}
      visible={visible}
      className={detailclass + '-sidebar'}
      title={
        <Search
          // ref={myInput}
          placeholder="搜索公众号"
          // onSearch={handleSearch}
          // enterButton={
          //   searchLoading ? <Icon type="loading" /> : <Icon type="search" />
          // }
          // disabled={searchLoading}
        />
      }
      handler={
        <div>
          <Icon
            className="side-drawer-handle"
            onClick={onTogglerContent}
            type={visible ? 'close' : 'search'}
            style={{
              color: '#fff',
              fontSize: 20
            }}
          />
        </div>
      }
    >
      <div className="op-components-mediadetailsifer">
        <div className="contentlist">
          <List
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item
                key={item.id}
                onClick={() => onClickList(item.id)}
                className="crt"
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} />}
                  title={<a href="">{item.name}</a>}
                  description={item.wechat_id}
                />
                <div
                  className={`status ${
                    item.status === 4 || item.status === 2
                      ? 'fc-warn'
                      : item.status === 1
                      ? 'fc-success'
                      : item.status === 3 || item.status === 0
                      ? 'fc-danger'
                      : null
                  }`}
                >
                  {item.status === 4
                    ? '未完善'
                    : item.status === 1
                    ? '正常'
                    : item.status === 2
                    ? '未通过'
                    : item.status === 3
                    ? '冻结'
                    : item.status === 0
                    ? '待审核'
                    : null}
                </div>
              </List.Item>
            )}
          >
            <div className="side-drawer-btn-load">
              <Button type="primary" ghost size="small">
                点击加载
              </Button>
            </div>
          </List>
        </div>
      </div>
    </Drawer>
  )
})
