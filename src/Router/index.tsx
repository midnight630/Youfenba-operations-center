import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import { routes, defaultRoute } from './routes'

const Router = () => (
  <BrowserRouter>{renderRoutes(routes, { defaultRoute })}</BrowserRouter>
)

export default Router
