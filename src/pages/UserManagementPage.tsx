import React, { useState } from 'react';
import { Card, Form, Select, Button, Table, Space, Typography, Row, Col, Input, Tag, Popconfirm } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import LayoutComponent from '../components/common/Layout/Layout';

const { Title, Text } = Typography;
const { Option } = Select;

const UserManagementPage: React.FC = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<any[]>([
    {
      id: '1',
      username: 'admin',
      realName: '管理员',
      email: 'admin@example.com',
      phone: '13800138000',
      role: '管理员',
      status: '启用',
      createTime: '2024-01-01 10:00:00'
    },
    {
      id: '2',
      username: 'user1',
      realName: '用户1',
      email: 'user1@example.com',
      phone: '13800138001',
      role: '普通用户',
      status: '启用',
      createTime: '2024-01-02 14:20:00'
    },
    {
      id: '3',
      username: 'user2',
      realName: '用户2',
      email: 'user2@example.com',
      phone: '13800138002',
      role: '普通用户',
      status: '停用',
      createTime: '2024-01-03 09:15:00'
    }
  ]);

  const roles = [
    { value: 'admin', label: '管理员' },
    { value: 'user', label: '普通用户' },
    { value: 'auditor', label: '审计员' },
  ];

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
      width: 120
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (text: string) => {
        let color = 'default';
        if (text === '管理员') color = 'red';
        if (text === '普通用户') color = 'blue';
        if (text === '审计员') color = 'green';
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string) => (
        <Tag color={text === '启用' ? 'green' : 'red'}>{text}</Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" icon={<EditOutlined />}>编辑</Button>
          <Popconfirm
            title="确定要删除该用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="text" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <LayoutComponent>
      <div className="user-management-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <Title level={2}>用户管理</Title>
            <Text type="secondary">管理系统用户账号</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />}>
            新增用户
          </Button>
        </div>
        
        <Card className="search-card" style={{ marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="username" label="用户名">
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="role" label="角色">
                <Select placeholder="选择角色" allowClear>
                  {roles.map(role => (
                    <Option key={role.value} value={role.value}>
                      {role.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="选择状态" allowClear>
                  <Option value="启用">启用</Option>
                  <Option value="停用">停用</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Space>
                <Button type="primary" icon={<SearchOutlined />} onClick={() => form.submit()}>
                  搜索
                </Button>
                <Button onClick={() => form.resetFields()}>
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Card className="user-list-card">
          <Table
            columns={columns}
            dataSource={users}
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

export default UserManagementPage;