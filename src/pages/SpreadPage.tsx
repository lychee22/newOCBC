import React, { useState } from 'react';
import { Card, Form, Select, Button, Table, Space, Typography, Row, Col, InputNumber, Divider, Tag } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import LayoutComponent from '../components/common/Layout/Layout';

const { Title, Text } = Typography;
const { Option } = Select;

const SpreadPage: React.FC = () => {
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const currencyPairs = [
    { value: 'USD/CNY', label: 'USD/CNY' },
    { value: 'EUR/USD', label: 'EUR/USD' },
    { value: 'GBP/USD', label: 'GBP/USD' },
    { value: 'USD/JPY', label: 'USD/JPY' },
  ];

  const spreadData = [
    {
      id: '1',
      currencyPair: 'USD/CNY',
      bidSpread: 0.0015,
      askSpread: 0.0015,
      minAmount: 1000,
      maxAmount: 1000000,
      status: '生效中'
    },
    {
      id: '2',
      currencyPair: 'EUR/USD',
      bidSpread: 0.0008,
      askSpread: 0.0008,
      minAmount: 1000,
      maxAmount: 500000,
      status: '生效中'
    },
    {
      id: '3',
      currencyPair: 'GBP/USD',
      bidSpread: 0.0012,
      askSpread: 0.0012,
      minAmount: 1000,
      maxAmount: 500000,
      status: '生效中'
    },
    {
      id: '4',
      currencyPair: 'USD/JPY',
      bidSpread: 0.15,
      askSpread: 0.15,
      minAmount: 10000,
      maxAmount: 10000000,
      status: '生效中'
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
      title: '买入点差',
      dataIndex: 'bidSpread',
      key: 'bidSpread',
      width: 120
    },
    {
      title: '卖出点差',
      dataIndex: 'askSpread',
      key: 'askSpread',
      width: 120
    },
    {
      title: '最小交易金额',
      dataIndex: 'minAmount',
      key: 'minAmount',
      width: 120,
      render: (text: number) => `${text.toLocaleString()}`
    },
    {
      title: '最大交易金额',
      dataIndex: 'maxAmount',
      key: 'maxAmount',
      width: 120,
      render: (text: number) => `${text.toLocaleString()}`
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string) => (
        <Text type={text === '生效中' ? 'success' : 'warning'}>{text}</Text>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => (
        <Space size="small">
          {editingId === record.id ? (
            <>
              <Button type="text" icon={<SaveOutlined />} onClick={() => handleSave(record.id)}>
                保存
              </Button>
              <Button type="text" danger icon={<CloseOutlined />} onClick={() => setEditingId(null)}>
                取消
              </Button>
            </>
          ) : (
            <>
              <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
                编辑
              </Button>
              <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
                删除
              </Button>
            </>
          )}
        </Space>
      )
    }
  ];

  const handleEdit = (id: string) => {
    setEditingId(id);
    const record = spreadData.find(item => item.id === id);
    if (record) {
      form.setFieldsValue(record);
    }
  };

  const handleSave = (id: string) => {
    form.validateFields().then(values => {
      console.log('Save spread with id:', id, 'values:', values);
      setEditingId(null);
      form.resetFields();
    });
  };

  const handleDelete = (id: string) => {
    console.log('Delete spread with id:', id);
  };

  const handleSearch = () => {
    form.validateFields().then(values => {
      console.log('Search spread with values:', values);
    });
  };

  return (
    <LayoutComponent>
      <div className="spread-page">
        <Title level={2}>Spread管理</Title>
        <Text type="secondary">查看和管理汇率差价</Text>
        
        <Card className="search-card" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="currencyPair" label="货币对">
                <Select placeholder="选择货币对" allowClear>
                  {currencyPairs.map(pair => (
                    <Option key={pair.value} value={pair.value}>
                      {pair.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="选择状态" allowClear>
                  <Option value="生效中">生效中</Option>
                  <Option value="已停用">已停用</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={16} lg={12} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                搜索
              </Button>
            </Col>
          </Row>
        </Card>

        <Card className="spread-form-card" title={editingId ? '编辑Spread' : '新增Spread'}>
          <Form
            form={form}
            layout="horizontal"
            initialValues={{
              currencyPair: 'USD/CNY',
              bidSpread: 0.0015,
              askSpread: 0.0015,
              minAmount: 1000,
              maxAmount: 1000000
            }}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8}>
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
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="bidSpread"
                  label="买入点差"
                  rules={[{ required: true, message: '请输入买入点差' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    step={0.0001}
                    placeholder="请输入买入点差"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="askSpread"
                  label="卖出点差"
                  rules={[{ required: true, message: '请输入卖出点差' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    step={0.0001}
                    placeholder="请输入卖出点差"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="minAmount"
                  label="最小交易金额"
                  rules={[{ required: true, message: '请输入最小交易金额' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1000}
                    step={1000}
                    placeholder="请输入最小交易金额"
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value?.replace(/\s?|(,*)/g, '') as any}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="maxAmount"
                  label="最大交易金额"
                  rules={[{ required: true, message: '请输入最大交易金额' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={10000}
                    step={10000}
                    placeholder="请输入最大交易金额"
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value?.replace(/\s?|(,*)/g, '') as any}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} style={{ textAlign: 'right' }}>
                {editingId ? (
                  <Space>
                    <Button type="primary" onClick={() => handleSave(editingId)}>
                      保存
                    </Button>
                    <Button onClick={() => setEditingId(null)}>
                      取消
                    </Button>
                  </Space>
                ) : (
                  <Button type="primary">
                    新增
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Card>

        <Divider />

        <Card className="spread-list-card" title="Spread列表">
          <Table
            columns={columns}
            dataSource={spreadData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
            }}
          />
        </Card>
      </div>
    </LayoutComponent>
  );
};

export default SpreadPage;