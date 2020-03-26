import * as React from 'react'
import './index.less'
import { classPrefix } from '../../const/index'

export interface IProps {
  tabs?: any
  onChange?: any
}
class TabsShift extends React.Component<IProps, object> {
  state: any

  constructor(props: IProps) {
    super(props)
    this.state = {
      focus: '0' || this.props.tabs[0].id
    }
  }

  componentDidMount() {
    this.setState({ focus: this.props.tabs[0].id })
  }

  render() {
    const { tabs } = this.props
    const { focus } = this.state
    return (
      <div className={`${classPrefix}-components-tabsshift`}>
        {tabs.map((it: any) => (
          <div
            key={it.id}
            className={`${classPrefix}-components-tabsshift-option ${
              focus === it.id ? 'active' : ''
            }`}
            onClick={() => {
              const { focus } = this.state
              if (it.id !== focus)
                this.setState({ focus: it.id }, () =>
                  this.props.onChange(this.state.focus)
                )
            }}
          >
            {it.name}
          </div>
        ))}
      </div>
    )
  }
}

export default TabsShift
