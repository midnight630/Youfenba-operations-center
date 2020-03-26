import React, { Component } from 'react'
interface IProps {
  data: any
  height?: number
  width?: number
  EchartRender: any
  idName: string
  onRef?: any
}
class G2CanvasData extends Component<IProps> {
  chart: any
  constructor(props: IProps) {
    super(props)
    this.chart = null
  }
  Inchart = () => {
    if (this.chart) {
      this.chart.clear()
      this.chart.destroy()
      this.chart = null
    }
    const { width, idName, height, EchartRender } = this.props
    let chartData: any = new G2.Chart({
      container: idName ? idName : 'c1',
      forceFit: width ? false : true,
      width: width ? width : null,
      height: height ? height : 544,
      padding: ['auto', 50, 'auto', 50]
    })
    this.chart = chartData
    EchartRender(chartData)
  }
  componentDidUpdate(prevProps: any) {
    // console.log(prevProps, this.props, '//////////////')
    if (JSON.stringify(prevProps.data) === JSON.stringify(this.props.data)) {
      return
    }
    console.log('sasasasasasas')
    this.Inchart()
  }
  componentDidMount() {
    this.Inchart()
    //监听widow屏幕变化
    window.addEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    this.Inchart()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }
  render() {
    return <div id={this.props.idName}></div>
  }
}
export default G2CanvasData
/*// import React, { useState, useEffect, memo } from 'react'
// interface IProps {
//   data: any
//   height?: number
//   width?: number
//   EchartRender: any
//   idName: string
//   onRef?: any
//   ref?: any
// }
// const G2CanvasData = (props: IProps) => {
//   const [chart, setChart] = useState()
//   const Inchart = () => {
//     if (chart) {
//       chart.clear()
//       chart.destroy()
//       setChart(null)
//     }
//     let chartData: any = new G2.Chart({
//       container: props.idName ? props.idName : 'c1',
//       forceFit: props.width ? false : true,
//       width: props.width ? props.width : null,
//       height: props.height ? props.height : 544,
//       padding: ['auto', 50, 'auto', 50]
//     })
//     setChart(chartData)
//     props.EchartRender(chartData)
//   }
//   useEffect(() => {
//     Inchart()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [props.data])
//   return <div id={props.idName}></div>
// }
// export default memo(G2CanvasData)*/
