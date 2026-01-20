import React, { useState } from 'react';
import { Card, Form, Select, Button, Table, Space, Typography, Row, Col, DatePicker, InputNumber, Tag, message } from 'antd';
import { SearchOutlined, CopyOutlined } from '@ant-design/icons';
import LayoutComponent from '../components/common/Layout/Layout';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const InquiryPage: React.FC = () => {
  const [form] = Form.useForm();
  const [inquiryHistory, setInquiryHistory] = useState<any[]>([
    {
      id: '1',
      currencyPair: 'USD/CNY',
      bidPrice: 7.2345,
      askPrice: 7.2355,
      inquiryTime: '2024-01-20 10:30:00',
      status: '已回复'
    },
    {
      id: '2',
      currencyPair: 'EUR/USD',
      bidPrice: 1.0876,
      askPrice: 1.0886,
      inquiryTime: '2024-01-20 10:25:00',
      status: '已回复'
    },
    {
      id: '3',
      currencyPair: 'GBP/USD',
      bidPrice: 1.2456,
      askPrice: 1.2466,
      inquiryTime: '2024-01-20 10:20:00',
      status: '处理中'
    }
  ]);

  const currencyPairs = [
    { value: 'USD/CNY', label: 'USD/CNY' },
    { value: 'EUR/USD', label: 'EUR/USD' },
    { value: 'GBP/USD', label: 'GBP/USD' },
    { value: 'USD/JPY', label: 'USD/JPY' },
    { value: 'AUD/USD', label: 'AUD/USD' },
    { value: 'USD/CAD', label: 'USD/CAD' },
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
      title: '买入价',
      dataIndex: 'bidPrice',
      key: 'bidPrice',
      width: 120,
      render: (text: number) => <Text strong>{text}</Text>
    },
    {
      title: '卖出价',
      dataIndex: 'askPrice',
      key: 'askPrice',
      width: 120,
      render: (text: number) => <Text strong>{text}</Text>
    },
    {
      title: '询价时间',
      dataIndex: 'inquiryTime',
      key: 'inquiryTime',
      width: 180
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string) => {
        let statusColor: 'success' | 'warning' | 'danger' | undefined;
        if (text === '已回复') statusColor = 'success';
        if (text === '处理中') statusColor = 'warning';
        if (text === '失败') statusColor = 'danger';
        return <Text type={statusColor}>{text}</Text>;
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" icon={<CopyOutlined />} onClick={() => copyPrice(record)}>
            复制价格
          </Button>
        </Space>
      )
    }
  ];

  const copyPrice = (record: any) => {
    const priceText = `货币对: ${record.currencyPair}\n买入价: ${record.bidPrice}\n卖出价: ${record.askPrice}`;
    navigator.clipboard.writeText(priceText).then(() => {
      message.success('价格已复制到剪贴板');
    });
  };

  const handleInquiry = () => {
    form.validateFields().then(values => {
      const newInquiry = {
        id: Date.now().toString(),
        ...values,
        bidPrice: parseFloat((Math.random() * 0.1 + 7.2).toFixed(4)),
        askPrice: parseFloat((Math.random() * 0.1 + 7.21).toFixed(4)),
        status: '已回复',
        inquiryTime: new Date().toLocaleString()
      };
      setInquiryHistory(prev => [newInquiry, ...prev]);
      message.success('询价成功');
    });
  };

  return (
    <LayoutComponent>
      <div className="inquiry-page">
        <Title level={2}>询价</Title>
        <Text type="secondary">获取实时汇率信息</Text>
        
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col xs={24} lg={8}>
            <Card className="inquiry-form-card" title="实时询价">
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  currencyPair: 'USD/CNY',
                  amount: 10000
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
                  name="amount"
                  label="交易金额"
                  rules={[{ required: true, message: '请输入交易金额' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1000}
                    step={1000}
                    placeholder="请输入交易金额"
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value?.replace(/\s?|(,*)/g, '') as any}
                  />
                </Form.Item>
                <Form.Item
                  name="validity"
                  label="报价有效期"
                  rules={[{ required: true, message: '请选择报价有效期' }]}
                >
                  <Select placeholder="选择报价有效期">
                    <Option value="30">30秒</Option>
                    <Option value="60">60秒</Option>
                    <Option value="120">2分钟</Option>
                    <Option value="300">5分钟</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" block size="large" icon={<SearchOutlined />} onClick={handleInquiry}>
                    提交询价
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            
            <Card className="currency-info-card" title="货币对信息" style={{ marginTop: '20px' }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {currencyPairs.map(pair => (
                  <div key={pair.value} className="currency-item">
                    <Space>
                      <Tag color="blue">{pair.value}</Tag>
                      <Text type="secondary">最新报价: {parseFloat((Math.random() * 0.1 + 7.2).toFixed(4))}</Text>
                    </Space>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} lg={16}>
            <Card className="search-card">
              <Row gutter={16}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name="searchCurrencyPair" label="货币对">
                    <Select placeholder="选择货币对">
                      {currencyPairs.map(pair => (
                        <Option key={pair.value} value={pair.value}>
                          {pair.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name="searchStatus" label="状态">
                    <Select placeholder="选择状态">
                      <Option value="已回复">已回复</Option>
                      <Option value="处理中">处理中</Option>
                      <Option value="失败">失败</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item label="询价时间">
                    <RangePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <div style={{ textAlign: 'right' }}>
                <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
              </div>
            </Card>
            
            <Card className="history-card" title="询价历史">
              <Table
                columns={columns}
                dataSource={inquiryHistory}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </LayoutComponent>
  );
};

export default InquiryPage;