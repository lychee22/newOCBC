import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import theme from './styles/theme'
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

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <Router>
        <Routes>
          {/* 登录相关 */}
          <Route path='/login' element={<LoginPage />} />
          
          {/* 错误页面 */}
          <Route path='/403' element={<Error403Page />} />
          <Route path='/404' element={<Error404Page />} />
          <Route path='/500' element={<Error500Page />} />
          
          {/* 其他 */}
          <Route path='/redirect' element={<RedirectPage />} />
          <Route path='/guide' element={<GuidePage />} />
          
          {/* 功能页面 */}
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/deal-entry' element={<DealEntryPage />} />
          <Route path='/inquiry' element={<InquiryPage />} />
          <Route path='/rate-monitor' element={<RateMonitorPage />} />
          <Route path='/report' element={<ReportPage />} />
          <Route path='/file-maintenance' element={<FileMaintenancePage />} />
          <Route path='/spread' element={<SpreadPage />} />
          <Route path='/user-management' element={<UserManagementPage />} />
          <Route path='/group-management' element={<GroupManagementPage />} />
          
          {/* 404页面 */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
