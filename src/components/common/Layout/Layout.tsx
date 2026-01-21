import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Button, Typography, Badge, Spin } from 'antd';
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
  MediumOutlined,
  AuditOutlined
} from '@ant-design/icons';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '../../../store/modules/user';
import { usePermissionStore } from '../../../store/modules/permission';
import './Layout.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // 使用状态管理
  const { userInfo, logout } = useUserStore();
  const { sidebarRouters, generateRoutes, isAddRouters } = usePermissionStore();
  
  // 生成菜单图标映射
  const iconMap: Record<string, React.ReactNode> = {
    'ant-design:home-filled': <DashboardOutlined />,
    'ant-design:medium-outlined': <MediumOutlined />,
    'ant-design:split-cells-outlined': <DollarOutlined />,
    'ant-design:alert-outlined': <BarChartOutlined />,
    'ant-design:delivered-procedure-outlined': <TransactionOutlined />,
    'ant-design:search-outlined': <InfoCircleOutlined />,
    'ant-design:audit-outlined': <AuditOutlined />,
    'ant-design:file-outlined': <FileTextOutlined />
  };

  // 生成菜单items
  const generateMenuItems = (routes: any[] = [], parentPath = ''): any[] => {
    return routes.map(route => {
      // 构建完整路径
      const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path;
      
      const menuItem: any = {
        key: fullPath,
        icon: iconMap[route.meta?.icon] || <FileTextOutlined />,
        label: route.meta?.title,
        onClick: () => navigate(fullPath)
      };
      
      // 如果有children，递归生成子菜单
      if (route.children && route.children.length > 0) {
        menuItem.children = generateMenuItems(route.children, fullPath);
      }
      
      return menuItem;
    });
  };

  // 用户菜单
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
      onClick: async () => {
        await logout();
        navigate('/login');
      }
    }
  ];

  // 加载动态菜单
  useEffect(() => {
    const loadRoutes = async () => {
      console.log('Loading routes, isAddRouters:', isAddRouters, 'userInfo:', userInfo);
      console.log('Current sidebarRouters:', sidebarRouters);
      
      if (!isAddRouters && userInfo?.role) {
        try {
          await generateRoutes(userInfo.role);
          console.log('Routes loaded successfully for role:', userInfo.role);
        } catch (error) {
          console.error('Failed to load routes:', error);
        }
      } else if (!isAddRouters) {
        console.log('Waiting for user info to load routes');
      } else {
        console.log('Routes already loaded, sidebarRouters:', sidebarRouters);
      }
      setIsLoading(false);
    };
    
    loadRoutes();
  }, [isAddRouters, generateRoutes, userInfo]);

  // 生成完整菜单
  const menuItems = generateMenuItems(sidebarRouters);
  console.log('Generated menuItems:', menuItems);
  console.log('Menu items count:', menuItems.length);
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
        <Spin spinning={isLoading} tip="加载中...">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="app-menu"
            theme="dark"
            inlineCollapsed={collapsed}
          />
        </Spin>
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
                <Text>{userInfo?.name || '用户'}</Text>
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