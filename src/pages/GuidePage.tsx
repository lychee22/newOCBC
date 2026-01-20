import React from 'react';
import { Card, Typography, Steps, Button, Space } from 'antd';
import { 
  DashboardOutlined, 
  TransactionOutlined, 
  InfoCircleOutlined, 
  BarChartOutlined,
  FileTextOutlined,
  DollarOutlined,
  UserOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import LayoutComponent from '../components/common/Layout/Layout';

const { Title, Text } = Typography;

const GuidePage: React.FC = () => {
  const steps = [
    {
      title: '首页',
      description: '查看系统概览、统计数据和最新动态',
      icon: <DashboardOutlined />
    },
    {
      title: '交易入口',
      description: '进行外汇交易操作',
      icon: <TransactionOutlined />
    },
    {
      title: '询价',
      description: '获取实时汇率信息',
      icon: <InfoCircleOutlined />
    },
    {
      title: '汇率监控',
      description: '监控汇率走势和变化',
      icon: <BarChartOutlined />
    },
    {
      title: '报表',
      description: '查看交易报表和统计数据',
      icon: <FileTextOutlined />
    },
    {
      title: '文件维护',
      description: '管理系统配置文件',
      icon: <FileTextOutlined />
    },
    {
      title: 'Spread',
      description: '查看和管理汇率差价',
      icon: <DollarOutlined />
    },
    {
      title: '用户管理',
      description: '管理系统用户账号',
      icon: <UserOutlined />
    },
    {
      title: '角色管理',
      description: '管理用户角色和权限',
      icon: <UsergroupAddOutlined />
    }
  ];

  return (
    <LayoutComponent>
      <div className="guide-page">
        <Title level={2}>系统使用指南</Title>
        <Text type="secondary">欢迎使用FXOL外汇交易系统，以下是系统各功能模块的使用说明</Text>
        
        <Card className="guide-card" style={{ marginTop: '20px' }}>
          <Steps
            direction="vertical"
            items={steps.map((step) => ({
              title: step.title,
              description: step.description,
              icon: step.icon
            }))}
          />
        </Card>
        
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Space>
            <Button>上一步</Button>
            <Button type="primary">下一步</Button>
          </Space>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default GuidePage;