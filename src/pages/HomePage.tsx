import React from 'react';
import { Card, Row, Col, Statistic, Typography, List, Progress, Space } from 'antd';
import { 
  DollarOutlined, 
  TransactionOutlined, 
  InfoCircleOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined 
} from '@ant-design/icons';
import LayoutComponent from '../components/common/Layout/Layout';

const { Title, Text } = Typography;

const HomePage: React.FC = () => {
  const statistics = [
    {
      title: '总交易量',
      value: '1,234,567',
      suffix: 'USD',
      icon: <DollarOutlined />,
      color: '#3f8600',
      trend: 12.5
    },
    {
      title: '今日交易',
      value: '456',
      suffix: '笔',
      icon: <TransactionOutlined />,
      color: '#1890ff',
      trend: 8.2
    },
    {
      title: '询价次数',
      value: '1,234',
      suffix: '次',
      icon: <InfoCircleOutlined />,
      color: '#722ed1',
      trend: -3.5
    },
    {
      title: '活跃用户',
      value: '234',
      suffix: '人',
      icon: <InfoCircleOutlined />,
      color: '#faad14',
      trend: 5.8
    }
  ];

  const recentTransactions = [
    { id: 1, type: '买入', currency: 'USD/CNY', amount: 10000, price: 7.2345, time: '2024-01-20 10:30:00' },
    { id: 2, type: '卖出', currency: 'EUR/USD', amount: 5000, price: 1.0876, time: '2024-01-20 10:25:00' },
    { id: 3, type: '买入', currency: 'GBP/USD', amount: 3000, price: 1.2456, time: '2024-01-20 10:20:00' },
    { id: 4, type: '卖出', currency: 'USD/JPY', amount: 100000, price: 148.23, time: '2024-01-20 10:15:00' },
  ];

  return (
    <LayoutComponent>
      <div className="home-page">
        <Title level={2} className="page-title">Dashboard</Title>
        
        {/* 统计卡片 */}
        <Row gutter={[16, 16]} className="statistics-row">
          {statistics.map((stat, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card className="stat-card">
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Text strong>{stat.title}</Text>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Statistic 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      valueStyle={{ color: stat.color, fontSize: '24px' }}
                      prefix={stat.icon}
                    />
                    <Space>
                      {stat.trend > 0 ? (
                        <ArrowUpOutlined style={{ color: '#52c41a' }} />
                      ) : (
                        <ArrowDownOutlined style={{ color: '#ff4d4f' }} />
                      )}
                      <Text 
                        type={stat.trend > 0 ? 'success' : 'danger'} 
                        style={{ fontSize: '14px' }}
                      >
                        {Math.abs(stat.trend)}%
                      </Text>
                    </Space>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 汇率监控和最近交易 */}
        <Row gutter={[16, 16]} className="main-content">
          <Col xs={24} lg={12}>
            <Card title="汇率监控" className="monitor-card">
              <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text type="secondary">汇率图表区域</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="最近交易" className="transactions-card">
              <List
                dataSource={recentTransactions}
                renderItem={(item) => (
                  <List.Item key={item.id} className="transaction-item">
                    <div className="transaction-info">
                      <Space>
                        <Text strong>{item.currency}</Text>
                        <Text type="secondary">{item.time}</Text>
                      </Space>
                      <Text>{item.type}</Text>
                      <Text strong>{item.amount} {item.currency.split('/')[0]}</Text>
                      <Text type="secondary">@ {item.price}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* 系统概览 */}
        <Row gutter={[16, 16]} className="overview-row">
          <Col xs={24} sm={12} md={8}>
            <Card title="系统状态" className="overview-card">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text>CPU使用率</Text>
                    <Text strong>35%</Text>
                  </div>
                  <Progress percent={35} size="small" />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text>内存使用率</Text>
                    <Text strong>65%</Text>
                  </div>
                  <Progress percent={65} size="small" />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text>磁盘使用率</Text>
                    <Text strong>45%</Text>
                  </div>
                  <Progress percent={45} size="small" />
                </div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="今日统计" className="overview-card">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text>交易成功率</Text>
                    <Text strong>98.5%</Text>
                  </div>
                  <Progress percent={98.5} size="small" status="success" />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text>平均响应时间</Text>
                    <Text strong>120ms</Text>
                  </div>
                  <Progress percent={75} size="small" />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text>系统可用性</Text>
                    <Text strong>99.9%</Text>
                  </div>
                  <Progress percent={99.9} size="small" status="success" />
                </div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="待办事项" className="overview-card">
              <List
                dataSource={['检查汇率异常', '处理用户反馈', '更新系统文档', '准备周报']}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta title={<Text>{item}</Text>} />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </LayoutComponent>
  );
};

export default HomePage;
