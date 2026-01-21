import React, { useState } from 'react';
import { Card, Form, Select, Button, Table, Space, Typography, Row, Col, Input, Tag, Popconfirm, Tree } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined, KeyOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;
const { Option } = Select;

const GroupManagementPage: React.FC = () => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState<any[]>([
    {
      id: '1',
      roleName: '管理员',
      roleCode: 'admin',
      description: '系统管理员，拥有所有权限',
      status: '启用',
      createTime: '2024-01-01 10:00:00'
    },
    {
      id: '2',
      roleName: '普通用户',
      roleCode: 'user',
      description: '普通用户，拥有基本操作权限',
      status: '启用',
      createTime: '2024-01-02 14:20:00'
    },
    {
      id: '3',
      roleName: '审计员',
      roleCode: 'auditor',
      description: '审计员，拥有查看和审计权限',
      status: '停用',
      createTime: '2024-01-03 09:15:00'
    }
  ]);

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 150
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      key: 'roleCode',
      width: 150
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200
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
      width: 200,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" icon={<EditOutlined />}>编辑</Button>
          <Button type="text" icon={<KeyOutlined />}>权限设置</Button>
          <Popconfirm
            title="确定要删除该角色吗？"
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

  // 权限树数据示例
  const permissionTreeData = [
    {
      title: '系统管理',
      key: 'system',
      children: [
        {
          title: '用户管理',
          key: 'system:user',
          children: [
            { title: '查看用户', key: 'system:user:view' },
            { title: '新增用户', key: 'system:user:add' },
            { title: '编辑用户', key: 'system:user:edit' },
            { title: '删除用户', key: 'system:user:delete' },
          ],
        },
        {
          title: '角色管理',
          key: 'system:role',
          children: [
            { title: '查看角色', key: 'system:role:view' },
            { title: '新增角色', key: 'system:role:add' },
            { title: '编辑角色', key: 'system:role:edit' },
            { title: '删除角色', key: 'system:role:delete' },
          ],
        },
      ],
    },
    {
      title: '交易管理',
      key: 'trade',
      children: [
        { title: '交易入口', key: 'trade:entry' },
        { title: '询价', key: 'trade:inquiry' },
        { title: '成交记录', key: 'trade:record' },
      ],
    },
  ];

  const handleDelete = (id: string) => {
    setRoles(prev => prev.filter(role => role.id !== id));
  };

  const handleSearch = () => {
    form.validateFields().then(values => {
      console.log('Search roles with values:', values);
    });
  };

  return (
      <div className="group-management-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <Title level={2}>角色管理</Title>
            <Text type="secondary">管理用户角色和权限</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />}>
            新增角色
          </Button>
        </div>
        
        <Card className="search-card" style={{ marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="roleName" label="角色名称">
                <Input placeholder="请输入角色名称" />
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
            <Col xs={24} sm={24} md={16} lg={12} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                搜索
              </Button>
            </Col>
          </Row>
        </Card>

        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Card title="角色列表">
              <Table
                columns={columns}
                dataSource={roles}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                }}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="权限设置">
              <div style={{ marginBottom: '20px' }}>
                <Form.Item label="选择角色">
                  <Select placeholder="选择角色">
                    {roles.map(role => (
                      <Option key={role.id} value={role.id}>
                        {role.roleName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div style={{ maxHeight: '500px', overflow: 'auto' }}>
                <Tree
                  checkable
                  defaultExpandedKeys={['system', 'trade']}
                  treeData={permissionTreeData}
                />
              </div>
              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <Space>
                  <Button>取消</Button>
                  <Button type="primary">保存</Button>
                </Space>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
  );
};

export default GroupManagementPage;