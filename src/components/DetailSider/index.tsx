import React, { memo, useState } from 'react'
import { Icon, Input } from 'antd'
import './style.less'
const { Search } = Input

interface IProps {
  list?: any
}

const data = [
  {
    create_time: '2019-04-30 14:31:56',
    id: '4486',
    is_appoint: '0',
    order_num: 'C1904301431568754072',
    status: '验收异常已申诉',
    weixinname: '女人深夜读书'
  },
  {
    create_time: '2019-05-20 02:42:29',
    id: '4491',
    is_appoint: '0',
    order_num: 'C1905200242294087269',
    status: '验收异常已申诉',
    weixinname: '武汉身边事'
  },
  {
    create_time: '2019-06-26 17:07:50',
    id: '4759',
    is_appoint: '0',
    order_num: 'C1906261707504218446',
    status: '验收异常已申诉',
    weixinname: '96编辑器'
  },
  {
    create_time: '2019-06-26 17:07:50',
    id: '47',
    is_appoint: '0',
    order_num: 'C1906261707504218446',
    status: '验收异常已申诉',
    weixinname: '96编辑器'
  },
  {
    create_time: '2019-06-26 17:07:50',
    id: '4',
    is_appoint: '0',
    order_num: 'C1906261707504218446',
    status: '验收异常已申诉',
    weixinname: '96编辑器'
  },
  {
    create_time: '2019-06-26 17:07:50',
    id: '7',
    is_appoint: '0',
    order_num: 'C1906261707504218446',
    status: '验收异常已申诉',
    weixinname: '96编辑器'
  },
  {
    create_time: '2019-06-26 17:07:50',
    id: '6',
    is_appoint: '0',
    order_num: 'C1906261707504218446',
    status: '验收异常已申诉',
    weixinname: '96编辑器'
  },
  {
    create_time: '2019-06-26 17:07:50',
    id: '9',
    is_appoint: '0',
    order_num: 'C1906261707504218446',
    status: '验收异常已申诉',
    weixinname: '96编辑器'
  }
]
export default memo(function Index(props: IProps) {
  const [choosebox, setchoosebox] = useState(data[0].id)

  return (
    <div className="op-components-detailsifer">
      <div className="top">
        <div className="up">
          <Icon className="upicon" type="caret-up" />
        </div>
        <div className="search">
          <Search placeholder="订单号" onSearch={value => console.log(value)} />
        </div>
      </div>

      <div className="contentlist">
        <div className="list">
          {data &&
            data.map((item, index) => (
              <div
                className={`${
                  choosebox === item.id ? 'choosebox' : ''
                } list-box`}
                key={item.id + index}
                onClick={() => setchoosebox(item.id)}
              >
                <div className="orderid">
                  <div>{item.order_num}</div>
                  <div>{item.status}</div>
                </div>
                <div className="ordername">{item.weixinname}</div>
                <div className="ordertime">{item.create_time}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="bottom">
        <div className="down">
          <Icon className="downicon" type="caret-down" />
        </div>
      </div>
    </div>
  )
})
