import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import theme from './styles/theme'
import LayoutComponent from './components/common/Layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import DealEntryPage from './pages/DealEntryPage'
import InquiryPage from './pages/InquiryPage'
import RateMonitorPage from './pages/RateMonitorPage'
import ReportPage from './pages/ReportPage'
import FileMaintenancePage from './pages/FileMaintenancePage'
import SpreadPage from './pages/SpreadPage'
import UserManagementPage from './pages/UserManagementPage'
import GroupManagementPage from './pages/GroupManagementPage'
import Error403Page from './pages/Error403Page'
import Error404Page from './pages/Error404Page'
import Error500Page from './pages/Error500Page'
import RedirectPage from './pages/RedirectPage'
import GuidePage from './pages/GuidePage'
import React from 'react'

// 路由拦截组件
const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // 模拟登录状态检查
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  // 模拟用户角色
  const userRole = localStorage.getItem('userRole') || 'user'
  
  // 白名单页面，不需要登录
  const whiteList = ['/login', '/403', '/404', '/500']
  
  // 检查是否在白名单中
  if (whiteList.includes(location.pathname)) {
    return <>{children}</>
  }
  
  // 检查登录状态
  if (!isLoggedIn) {
    // 如果访问的是根路由且未登录，显示登录页
    if (location.pathname === '/') {
      return <LoginPage />
    }
    navigate('/login', { replace: true })
    return null
  }
  
  // 权限检查示例
  const adminRoutes = ['/user-management', '/group-management']
  if (adminRoutes.includes(location.pathname) && userRole !== 'admin') {
    navigate('/403', { replace: true })
    return null
  }
  
  return <>{children}</>
}

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <Router>
        <RouteGuard>
          <Routes>
            {/* 登录相关 */}
            <Route path='/login' element={<LoginPage />} />
            
            {/* 错误页面 */}
            <Route path='/403' element={<Error403Page />} />
            <Route path='/404' element={<Error404Page />} />
            <Route path='/500' element={<Error500Page />} />
            
            {/* 带有Layout的嵌套路由 */}
            <Route path='/' element={<LayoutComponent />}>
              {/* 首页 */}
              <Route index element={<HomePage />} />
              
              {/* 交易入口 */}
              <Route path='deal-entry' element={<DealEntryPage />}>
                <Route path='forward-contract' element={<div>远期合约录入</div>} />
                <Route path='today-deal' element={<div>今日交易录入</div>} />
              </Route>
              
              {/* 询价 */}
              <Route path='inquiry' element={<InquiryPage />}>
                <Route path='forward-contract' element={<div>远期合约查询</div>} />
                <Route path='position' element={<div>持仓查询</div>} />
              </Route>
              
              {/* 汇率监控 */}
              <Route path='rate-monitor' element={<RateMonitorPage />} />
              
              {/* 报表 */}
              <Route path='report' element={<ReportPage />}>
                <Route path='master-report' element={<div>主数据报表</div>} />
                <Route path='trade-report' element={<div>交易报表</div>} />
              </Route>
              
              {/* 文件维护 */}
              <Route path='file-maintenance' element={<FileMaintenancePage />}>
                <Route path='system-parameter' element={<div>系统参数设置</div>} />
                <Route path='currency-setup' element={<div>货币设置</div>} />
              </Route>
              
              {/* Spread */}
              <Route path='spread' element={<SpreadPage />}>
                <Route path='layer-setup' element={<div>层级设置</div>} />
                <Route path='profile-setup' element={<div>配置文件设置</div>} />
              </Route>
              
              {/* 用户管理 */}
              <Route path='user-management' element={<UserManagementPage />}>
                <Route path='user-setup' element={<div>用户设置</div>} />
                <Route path='user-access' element={<div>用户权限</div>} />
              </Route>
              
              {/* 角色管理 */}
              <Route path='group-management' element={<GroupManagementPage />}>
                <Route path='group-setup' element={<div>角色设置</div>} />
                <Route path='group-function' element={<div>角色功能</div>} />
              </Route>
              
              {/* 其他页面 */}
              <Route path='about' element={<AboutPage />} />
              <Route path='redirect' element={<RedirectPage />} />
              <Route path='guide' element={<GuidePage />} />
            </Route>
            
            {/* 404页面 */}
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </RouteGuard>
      </Router>
    </ConfigProvider>
  )
}

export default App
