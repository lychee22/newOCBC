import React, { useState } from 'react';
import { Card, Form, Select, Button, Table, Space, Typography, Row, Col, DatePicker, Tag, Tabs, Input } from 'antd';
import { SearchOutlined, ReloadOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const RateMonitorPage: React.FC = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('realTime');

  const currencyPairs = [
    { value: 'USD/CNY', label: 'USD/CNY' },
    { value: 'EUR/USD', label: 'EUR/USD' },
    { value: 'GBP/USD', label: 'GBP/USD' },
    { value: 'USD/JPY', label: 'USD/JPY' },
  ];

  const realTimeRates = [
    {
      id: '1',
      currencyPair: 'USD/CNY',
      currentPrice: 7.2345,
      change: 0.0015,
      changePercent: 0.02,
      high: 7.2456,
      low: 7.2234,
      volume: 123456789
    },
    {
      id: '2',
      currencyPair: 'EUR/USD',
      currentPrice: 1.0876,
      change: -0.0008,
      changePercent: -0.07,
      high: 1.0900,
      low: 1.0850,
      volume: 987654321
    },
    {
      id: '3',
      currencyPair: 'GBP/USD',
      currentPrice: 1.2456,
      change: 0.0023,
      changePercent: 0.19,
      high: 1.2480,
      low: 1.2430,
      volume: 567890123
    },
    {
      id: '4',
      currencyPair: 'USD/JPY',
      currentPrice: 148.23,
      change: -0.15,
      changePercent: -0.10,
      high: 148.50,
      low: 148.00,
      volume: 345678901
    }
  ];

  const columns = [
    {
      title: '货币对',
      dataIndex: 'currencyPair',
      key: 'currencyPair',
      width: 120,
      render: (text: string) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '当前价格',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      width: 120,
      render: (text: number) => <Text strong>{text}</Text>
    },
    {
      title: '涨跌',
      dataIndex: 'change',
      key: 'change',
      width: 120,
      render: (text: number) => {
        const color = text >= 0 ? 'success' : 'danger';
        const symbol = text >= 0 ? '+' : '';
        return <Text type={color}>{symbol}{text}</Text>;
      }
    },
    {
      title: '涨跌幅',
      dataIndex: 'changePercent',
      key: 'changePercent',
      width: 120,
      render: (text: number) => {
        const color = text >= 0 ? 'success' : 'danger';
        const symbol = text >= 0 ? '+' : '';
        return <Text type={color}>{symbol}{text}%</Text>;
      }
    },
    {
      title: '最高价',
      dataIndex: 'high',
      key: 'high',
      width: 100
    },
    {
      title: '最低价',
      dataIndex: 'low',
      key: 'low',
      width: 100
    },
    {
      title: '成交量',
      dataIndex: 'volume',
      key: 'volume',
      width: 150,
      render: (text: number) => text.toLocaleString()
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />}>
            详情
          </Button>
          <Button type="text" icon={<DownloadOutlined />}>
            导出
          </Button>
        </Space>
      )
    }
  ];

  const handleRefresh = () => {
    // 模拟刷新数据
    console.log('刷新数据');
  };

  return (
      <div className="rate-monitor-page">
        <Title level={2}>汇率监控</Title>
        <Text type="secondary">监控汇率走势和变化</Text>
        
        <Card className="search-card" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="currencyPair" label="货币对">
                <Select placeholder="选择货币对" mode="multiple">
                  {currencyPairs.map(pair => (
                    <Option key={pair.value} value={pair.value}>
                      {pair.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="timeRange" label="时间范围">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="interval" label="时间间隔">
                <Select placeholder="选择时间间隔">
                  <Option value="1m">1分钟</Option>
                  <Option value="5m">5分钟</Option>
                  <Option value="15m">15分钟</Option>
                  <Option value="1h">1小时</Option>
                  <Option value="1d">1天</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Space>
                <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                <Button icon={<ReloadOutlined />} onClick={handleRefresh}>刷新</Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="实时汇率" key="realTime">
            <Row gutter={16}>
              <Col xs={24} lg={8}>
                <Card title="实时汇率列表" size="small">
                  <Table
                    columns={columns}
                    dataSource={realTimeRates}
                    rowKey="id"
                    pagination={false}
                    scroll={{ y: 500 }}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={16}>
                <Card title="汇率走势图" size="small">
                  <div style={{ 
                    height: 500, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px'
                  }}>
                    <Space direction="vertical" size="large" align="center">
                      <EyeOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                      <Text type="secondary" style={{ fontSize: '18px' }}>汇率图表区域</Text>
                      <Text type="secondary">这里将显示实时汇率走势图</Text>
                    </Space>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
          
          <TabPane tab="历史走势" key="history">
            <Card title="历史汇率走势">
              <div style={{ 
                height: 600, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}>
                <Space direction="vertical" size="large" align="center">
                  <EyeOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  <Text type="secondary" style={{ fontSize: '18px' }}>历史汇率图表区域</Text>
                  <Text type="secondary">这里将显示历史汇率走势图</Text>
                </Space>
              </div>
            </Card>
          </TabPane>
          
          <TabPane tab="汇率预警" key="alert">
            <Row gutter={16}>
              <Col xs={24} lg={12}>
                <Card title="预警设置" size="small">
                  <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                      currencyPair: 'USD/CNY',
                      alertType: 'up',
                      alertPrice: 7.3
                    }}
                  >
                    <Form.Item
                      name="currencyPair"
                      label="货币对"
                      rules={[{ required: true, message: '请选择货币对' }]}
                    >
                      <Select placeholder="选择货币对">
                        {currencyPairs.map(pair => (
                          <Option key={pair.value} value={pair.value}>
                            {pair.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="alertType"
                      label="预警类型"
                      rules={[{ required: true, message: '请选择预警类型' }]}
                    >
                      <Select placeholder="选择预警类型">
                        <Option value="up">上涨突破</Option>
                        <Option value="down">下跌突破</Option>
                        <Option value="range">区间波动</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="alertPrice"
                      label="预警价格"
                      rules={[{ required: true, message: '请输入预警价格' }]}
                    >
                      <Input placeholder="请输入预警价格" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" block>添加预警</Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="预警列表" size="small">
                  <Table
                    columns={[
                      { title: '货币对', dataIndex: 'currencyPair', key: 'currencyPair' },
                      { title: '预警类型', dataIndex: 'alertType', key: 'alertType' },
                      { title: '预警价格', dataIndex: 'alertPrice', key: 'alertPrice' },
                      { title: '状态', dataIndex: 'status', key: 'status' },
                      { title: '操作', key: 'action', render: () => <Button type="text" danger>删除</Button> }
                    ]}
                    dataSource={[
                      { id: '1', currencyPair: 'USD/CNY', alertType: '上涨突破', alertPrice: 7.3, status: '已启用' },
                      { id: '2', currencyPair: 'EUR/USD', alertType: '下跌突破', alertPrice: 1.08, status: '已启用' },
                    ]}
                    rowKey="id"
                    pagination={false}
                    scroll={{ y: 300 }}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
  );
};

export default RateMonitorPage;