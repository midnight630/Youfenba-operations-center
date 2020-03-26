import * as React from 'react'
import './index.less'
import { classPrefix } from '../../const/index'
import { Link } from 'react-router-dom'
export interface IProps {
  data?: any
  focus?: number
  setFocus?: any
}

class SelfMenu extends React.Component<IProps, object> {
  state: any
  constructor(props: IProps) {
    super(props)
    this.state = {}
  }

  render() {
    const { data, focus } = this.props
    return (
      <div className={`${classPrefix}-components-selfmenu`}>
        <div className={`${classPrefix}-components-selfmenu-content`}>
          {data.length !== 0 &&
            data.map((it: any, i: number) => {
              return (
                <Link to={it.link} key={it.key}>
                  <div
                    className={`${classPrefix}-components-selfmenu-content-item ${
                      focus === it.key ? 'active' : ''
                    }`}
                    onClick={() => this.props.setFocus(it.key)}
                  >
                    {it.title}
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
    )
  }
}

export default SelfMenu
