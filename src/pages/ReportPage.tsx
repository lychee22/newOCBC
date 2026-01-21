import React, { useState } from 'react';
import { Card, Form, Select, Button, Table, Space, Typography, Row, Col, DatePicker, Tabs } from 'antd';
import { SearchOutlined, DownloadOutlined, BarChartOutlined, LineChartOutlined, PieChartOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const ReportPage: React.FC = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('transaction');

  const reportTypes = [
    { value: 'transaction', label: '交易报表' },
    { value: 'balance', label: '余额报表' },
    { value: 'position', label: '持仓报表' },
    { value: 'pnl', label: '盈亏报表' },
  ];

  const transactionReports = [
    {
      id: '1',
      reportName: '2024-01交易报表',
      reportType: 'transaction',
      period: '2024-01',
      generateTime: '2024-02-01 10:00:00',
      status: '已生成',
      fileSize: '1.2 MB'
    },
    {
      id: '2',
      reportName: '2024-02交易报表',
      reportType: 'transaction',
      period: '2024-02',
      generateTime: '2024-03-01 10:00:00',
      status: '已生成',
      fileSize: '1.5 MB'
    },
    {
      id: '3',
      reportName: '2024-03交易报表',
      reportType: 'transaction',
      period: '2024-03',
      generateTime: '2024-04-01 10:00:00',
      status: '已生成',
      fileSize: '1.3 MB'
    },
  ];

  const columns = [
    {
      title: '报表名称',
      dataIndex: 'reportName',
      key: 'reportName',
      width: 200
    },
    {
      title: '报表类型',
      dataIndex: 'reportType',
      key: 'reportType',
      width: 120,
      render: (text: string) => {
        const typeMap: any = {
          transaction: '交易报表',
          balance: '余额报表',
          position: '持仓报表',
          pnl: '盈亏报表'
        };
        return typeMap[text] || text;
      }
    },
    {
      title: '报表周期',
      dataIndex: 'period',
      key: 'period',
      width: 120
    },
    {
      title: '生成时间',
      dataIndex: 'generateTime',
      key: 'generateTime',
      width: 180
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string) => (
        <Text type={text === '已生成' ? 'success' : 'warning'}>{text}</Text>
      )
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: 100
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any) => (
        <Space size="small">
          <Button type="text" icon={<BarChartOutlined />}>查看</Button>
          <Button type="text" icon={<DownloadOutlined />}>下载</Button>
        </Space>
      )
    }
  ];

  const handleGenerateReport = () => {
    form.validateFields().then(values => {
      console.log('Generate report with values:', values);
    });
  };

  return (
      <div className="report-page">
        <Title level={2}>报表</Title>
        <Text type="secondary">查看交易报表和统计数据</Text>
        
        <Card className="search-card" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="reportType" label="报表类型">
                <Select placeholder="选择报表类型">
                  {reportTypes.map(type => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
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
              <Form.Item name="currency" label="货币">
                <Select placeholder="选择货币">
                  <Option value="USD">USD</Option>
                  <Option value="CNY">CNY</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="GBP">GBP</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Space>
                <Button type="primary" icon={<SearchOutlined />} onClick={handleGenerateReport}>
                  生成报表
                </Button>
                <Button icon={<DownloadOutlined />}>
                  导出模板
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="报表列表" key="reportList">
            <Card title="报表列表">
              <Table
                columns={columns}
                dataSource={transactionReports}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                }}
              />
            </Card>
          </TabPane>
          
          <TabPane tab="交易统计" key="transaction">
            <Row gutter={16}>
              <Col xs={24} lg={12}>
                <Card title="交易金额统计" size="small">
                  <div style={{ 
                    height: 300, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px'
                  }}>
                    <Space direction="vertical" size="large" align="center">
                      <BarChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                      <Text type="secondary" style={{ fontSize: '18px' }}>交易金额统计图表</Text>
                      <Text type="secondary">这里将显示交易金额统计图表</Text>
                    </Space>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="交易笔数统计" size="small">
                  <div style={{ 
                    height: 300, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px'
                  }}>
                    <Space direction="vertical" size="large" align="center">
                      <LineChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                      <Text type="secondary" style={{ fontSize: '18px' }}>交易笔数统计图表</Text>
                      <Text type="secondary">这里将显示交易笔数统计图表</Text>
                    </Space>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="交易类型分布" size="small">
                  <div style={{ 
                    height: 300, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px'
                  }}>
                    <Space direction="vertical" size="large" align="center">
                      <PieChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                      <Text type="secondary" style={{ fontSize: '18px' }}>交易类型分布图表</Text>
                      <Text type="secondary">这里将显示交易类型分布图表</Text>
                    </Space>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="盈亏统计" size="small">
                  <div style={{ 
                    height: 300, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px'
                  }}>
                    <Space direction="vertical" size="large" align="center">
                      <LineChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                      <Text type="secondary" style={{ fontSize: '18px' }}>盈亏统计图表</Text>
                      <Text type="secondary">这里将显示盈亏统计图表</Text>
                    </Space>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
          
          <TabPane tab="余额报表" key="balance">
            <Card title="余额报表">
              <div style={{ 
                height: 400, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}>
                <Space direction="vertical" size="large" align="center">
                  <LineChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  <Text type="secondary" style={{ fontSize: '18px' }}>余额报表图表</Text>
                  <Text type="secondary">这里将显示余额报表图表</Text>
                </Space>
              </div>
            </Card>
          </TabPane>
          
          <TabPane tab="持仓报表" key="position">
            <Card title="持仓报表">
              <Table
                columns={[
                  { title: '货币对', dataIndex: 'currencyPair', key: 'currencyPair' },
                  { title: '持仓数量', dataIndex: 'position', key: 'position' },
                  { title: '持仓均价', dataIndex: 'avgPrice', key: 'avgPrice' },
                  { title: '当前价格', dataIndex: 'currentPrice', key: 'currentPrice' },
                  { title: '浮动盈亏', dataIndex: 'pnl', key: 'pnl' },
                  { title: '盈亏比例', dataIndex: 'pnlPercent', key: 'pnlPercent' },
                ]}
                dataSource={[
                  { id: '1', currencyPair: 'USD/CNY', position: 10000, avgPrice: 7.23, currentPrice: 7.25, pnl: 200, pnlPercent: 0.28 },
                  { id: '2', currencyPair: 'EUR/USD', position: 5000, avgPrice: 1.08, currentPrice: 1.09, pnl: 50, pnlPercent: 0.93 },
                ]}
                rowKey="id"
              />
            </Card>
          </TabPane>
        </Tabs>
      </div>
  );
};

export default ReportPage;