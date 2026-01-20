import React, { useState } from 'react';
import { Card, Form, Select, Button, Table, Space, Typography, Row, Col, Upload, message, Input } from 'antd';
import { SearchOutlined, UploadOutlined, DownloadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import LayoutComponent from '../components/common/Layout/Layout';

const { Title, Text } = Typography;
const { Option } = Select;

const FileMaintenancePage: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([
    {
      id: '1',
      fileName: '货币对配置.xlsx',
      fileType: 'excel',
      fileSize: '2.5 MB',
      uploadTime: '2024-01-20 10:30:00',
      uploadUser: 'admin',
      status: '已生效'
    },
    {
      id: '2',
      fileName: '汇率配置.json',
      fileType: 'json',
      fileSize: '1.2 MB',
      uploadTime: '2024-01-19 14:20:00',
      uploadUser: 'admin',
      status: '已生效'
    },
    {
      id: '3',
      fileName: '用户权限配置.xlsx',
      fileType: 'excel',
      fileSize: '3.1 MB',
      uploadTime: '2024-01-18 09:15:00',
      uploadUser: 'admin',
      status: '已生效'
    }
  ]);

  const fileTypes = [
    { value: 'excel', label: 'Excel文件' },
    { value: 'json', label: 'JSON文件' },
    { value: 'csv', label: 'CSV文件' },
    { value: 'xml', label: 'XML文件' },
  ];

  const columns = [
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
      width: 200
    },
    {
      title: '文件类型',
      dataIndex: 'fileType',
      key: 'fileType',
      width: 120,
      render: (text: string) => {
        const typeMap: any = {
          excel: 'Excel文件',
          json: 'JSON文件',
          csv: 'CSV文件',
          xml: 'XML文件'
        };
        return typeMap[text] || text;
      }
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: 100
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      width: 180
    },
    {
      title: '上传用户',
      dataIndex: 'uploadUser',
      key: 'uploadUser',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string) => (
        <Text type={text === '已生效' ? 'success' : 'warning'}>{text}</Text>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" icon={<DownloadOutlined />}>下载</Button>
          <Button type="text" icon={<EditOutlined />}>编辑</Button>
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      )
    }
  ];

  const handleDelete = (id: string) => {
    setFileList(prev => prev.filter(item => item.id !== id));
    message.success('文件已删除');
  };

  const handleSearch = () => {
    form.validateFields().then(values => {
      console.log('Search files with values:', values);
    });
  };

  const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
        // 模拟添加到文件列表
        const newFile = {
          id: Date.now().toString(),
          fileName: info.file.name,
          fileType: 'excel', // 简化处理，实际应根据文件扩展名判断
          fileSize: `${((info.file.size || 0) / 1024 / 1024).toFixed(1)} MB`,
          uploadTime: new Date().toLocaleString(),
          uploadUser: 'admin',
          status: '已生效'
        };
        setFileList(prev => [newFile, ...prev]);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <LayoutComponent>
      <div className="file-maintenance-page">
        <Title level={2}>文件维护</Title>
        <Text type="secondary">管理系统配置文件</Text>
        
        <Row gutter={16} style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Col xs={24} lg={8}>
            <Card className="upload-card" title="文件上传">
              <Form
                form={form}
                layout="vertical"
              >
                <Form.Item
                  name="fileType"
                  label="文件类型"
                  rules={[{ required: true, message: '请选择文件类型' }]}
                >
                  <Select placeholder="选择文件类型">
                    {fileTypes.map(type => (
                      <Option key={type.value} value={type.value}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="fileDescription"
                  label="文件描述"
                >
                  <Input.TextArea rows={3} placeholder="请输入文件描述" />
                </Form.Item>
                <Form.Item label="上传文件">
                  <Upload {...props} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>点击上传</Button>
                  </Upload>
                  <Text type="secondary" style={{ marginLeft: '10px' }}>
                    支持 Excel、JSON、CSV、XML 格式文件
                  </Text>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" block>上传并生效</Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          
          <Col xs={24} lg={16}>
            <Card className="search-card">
              <Row gutter={16}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name="searchFileName" label="文件名">
                    <Input placeholder="请输入文件名" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item name="searchFileType" label="文件类型">
                    <Select placeholder="选择文件类型" allowClear>
                      {fileTypes.map(type => (
                        <Option key={type.value} value={type.value}>
                          {type.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                    搜索
                  </Button>
                </Col>
              </Row>
            </Card>
            
            <Card className="file-list-card" title="文件列表" style={{ marginTop: '20px' }}>
              <Table
                columns={columns}
                dataSource={fileList}
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

export default FileMaintenancePage;