interface Window {
  helloWorld(): void
  _global: {
    qiniu_domain: string
    qiniu_static_domain: string
  }
  location: Object
  io: any
}

declare var window: Window
declare var Math: Math
declare var Date: Date
declare var G2: any
declare var DataSet: any
// socket.io client
declare var io: any
declare var particlesJS: any
