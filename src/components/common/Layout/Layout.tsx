import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Button, Typography, Badge } from 'antd';
import {
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  DashboardOutlined,
  TransactionOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  FileTextOutlined,
  DollarOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import './Layout.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '首页',
      onClick: () => navigate('/')
    },
    {
      key: 'deal-entry',
      icon: <TransactionOutlined />,
      label: '交易入口',
      onClick: () => navigate('/deal-entry')
    },
    {
      key: 'inquiry',
      icon: <InfoCircleOutlined />,
      label: '询价',
      onClick: () => navigate('/inquiry')
    },
    {
      key: 'rate-monitor',
      icon: <BarChartOutlined />,
      label: '汇率监控',
      onClick: () => navigate('/rate-monitor')
    },
    {
      key: 'report',
      icon: <FileTextOutlined />,
      label: '报表',
      onClick: () => navigate('/report')
    },
    {
      key: 'file-maintenance',
      icon: <FileTextOutlined />,
      label: '文件维护',
      onClick: () => navigate('/file-maintenance')
    },
    {
      key: 'spread',
      icon: <DollarOutlined />,
      label: 'Spread',
      onClick: () => navigate('/spread')
    },
    {
      key: 'user-management',
      icon: <UserOutlined />,
      label: '用户管理',
      onClick: () => navigate('/user-management')
    },
    {
      key: 'group-management',
      icon: <UsergroupAddOutlined />,
      label: '角色管理',
      onClick: () => navigate('/group-management')
    },
  ];

  const userMenu = [
    {
      key: 'profile',
      label: '个人中心',
      icon: <UserOutlined />
    },
    {
      key: 'settings',
      label: '设置',
      icon: <SettingOutlined />
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: () => navigate('/login')
    }
  ];

  return (
    <Layout className="app-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="app-sider"
      >
        <div className="sider-logo">
          <Text strong className="logo-text">FXOL</Text>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          className="app-menu"
        />
      </Sider>
      <Layout>
        <Header className="app-header">
          <Space className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="toggle-btn"
            />
          </Space>
          <Space className="header-right">
            <Badge count={5} className="notification-badge">
              <Button type="text" icon={<InfoCircleOutlined />} />
            </Badge>
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Text>admin</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;