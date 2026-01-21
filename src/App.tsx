import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import theme from './styles/theme'
import React from 'react'
import { RouteGuard, RouteComponents } from './router'

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <Router>
        <RouteGuard>
          <React.Suspense fallback={<div>Loading...</div>}>
            <RouteComponents />
          </React.Suspense>
        </RouteGuard>
      </Router>
    </ConfigProvider>
  )
}

export default App