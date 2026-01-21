import React, { useState } from 'react';
import { Card, Form, Select, Button, Table, Space, Typography, Row, Col, DatePicker, InputNumber, Divider } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const DealEntryPage: React.FC = () => {
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([
    {
      id: '1',
      currencyPair: 'USD/CNY',
      amount: 10000,
      price: 7.2345,
      direction: '买入',
      status: '已完成',
      tradeTime: '2024-01-20 10:30:00'
    },
    {
      id: '2',
      currencyPair: 'EUR/USD',
      amount: 5000,
      price: 1.0876,
      direction: '卖出',
      status: '已完成',
      tradeTime: '2024-01-20 10:25:00'
    },
    {
      id: '3',
      currencyPair: 'GBP/USD',
      amount: 3000,
      price: 1.2456,
      direction: '买入',
      status: '处理中',
      tradeTime: '2024-01-20 10:20:00'
    }
  ]);

  const columns = [
    {
      title: '货币对',
      dataIndex: 'currencyPair',
      key: 'currencyPair',
      width: 120
    },
    {
      title: '交易金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (text: number) => `${text.toLocaleString()} USD`
    },
    {
      title: '交易价格',
      dataIndex: 'price',
      key: 'price',
      width: 120
    },
    {
      title: '交易方向',
      dataIndex: 'direction',
      key: 'direction',
      width: 100,
      render: (text: string) => (
        <Text type={text === '买入' ? 'success' : 'danger'}>{text}</Text>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string) => {
        let statusColor: 'success' | 'warning' | 'danger' | undefined;
        if (text === '已完成') statusColor = 'success';
        if (text === '处理中') statusColor = 'warning';
        if (text === '失败') statusColor = 'danger';
        return <Text type={statusColor}>{text}</Text>;
      }
    },
    {
      title: '交易时间',
      dataIndex: 'tradeTime',
      key: 'tradeTime',
      width: 180
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
    const record = tableData.find(item => item.id === id);
    if (record) {
      form.setFieldsValue(record);
    }
  };

  const handleSave = (id: string) => {
    form.validateFields().then(values => {
      setTableData(prev => prev.map(item => 
        item.id === id ? { ...item, ...values } : item
      ));
      setEditingId(null);
      form.resetFields();
    });
  };

  const handleDelete = (id: string) => {
    setTableData(prev => prev.filter(item => item.id !== id));
  };

  const handleAdd = () => {
    form.validateFields().then(values => {
      const newRecord = {
        id: Date.now().toString(),
        ...values,
        status: '已完成',
        tradeTime: new Date().toLocaleString()
      };
      setTableData(prev => [...prev, newRecord]);
      form.resetFields();
    });
  };

  return (
      <div className="deal-entry-page">
        <Title level={2}>交易入口</Title>
        
        <Card className="search-card" style={{ marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="currencyPair" label="货币对">
                <Select placeholder="选择货币对">
                  <Option value="USD/CNY">USD/CNY</Option>
                  <Option value="EUR/USD">EUR/USD</Option>
                  <Option value="GBP/USD">GBP/USD</Option>
                  <Option value="USD/JPY">USD/JPY</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="direction" label="交易方向">
                <Select placeholder="选择交易方向">
                  <Option value="买入">买入</Option>
                  <Option value="卖出">卖出</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="选择状态">
                  <Option value="已完成">已完成</Option>
                  <Option value="处理中">处理中</Option>
                  <Option value="失败">失败</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={24} lg={6}>
              <Form.Item label="交易时间">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
              <Button icon={<PlusOutlined />} style={{ marginLeft: 8 }} onClick={() => setEditingId('new')}>
                新增交易
              </Button>
            </Col>
          </Row>
        </Card>

        <Card className="form-card" title={editingId ? (editingId === 'new' ? '新增交易' : '编辑交易') : '交易表单'}>
          <Form
            form={form}
            layout="horizontal"
            initialValues={{
              direction: '买入',
              status: '已完成'
            }}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="currencyPair"
                  label="货币对"
                  rules={[{ required: true, message: '请选择货币对' }]}
                >
                  <Select placeholder="选择货币对">
                    <Option value="USD/CNY">USD/CNY</Option>
                    <Option value="EUR/USD">EUR/USD</Option>
                    <Option value="GBP/USD">GBP/USD</Option>
                    <Option value="USD/JPY">USD/JPY</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="direction"
                  label="交易方向"
                  rules={[{ required: true, message: '请选择交易方向' }]}
                >
                  <Select placeholder="选择交易方向">
                    <Option value="买入">买入</Option>
                    <Option value="卖出">卖出</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="amount"
                  label="交易金额"
                  rules={[{ required: true, message: '请输入交易金额' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    placeholder="请输入交易金额"
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value?.replace(/\s?|(,*)/g, '') as any}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="price"
                  label="交易价格"
                  rules={[{ required: true, message: '请输入交易价格' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    step={0.0001}
                    placeholder="请输入交易价格"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} style={{ textAlign: 'right' }}>
                {editingId && (
                  <>
                    <Button type="primary" onClick={() => handleAdd()}>保存</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => setEditingId(null)}>取消</Button>
                  </>
                )}
              </Col>
            </Row>
          </Form>
        </Card>

        <Divider />

        <Card className="table-card" title="交易列表">
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
            }}
          />
        </Card>
      </div>
  );
};

export default DealEntryPage;