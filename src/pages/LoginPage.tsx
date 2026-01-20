import React, { useState } from 'react';
import { Card, Form, Input, Button, Checkbox, Typography, Divider, Space } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login success:', values);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-logo">
          <Title level={2}>FXOL</Title>
          <Text type="secondary">外汇交易系统</Text>
        </div>
        <Card className="login-card">
          <Title level={3} className="login-title">登录</Title>
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
              label="用户名"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
              label="密码"
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              initialValue={true}
            >
              <Space>
                <Checkbox>记住我</Checkbox>
                <a href="#" className="login-forgot">忘记密码？</a>
              </Space>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block size="large">
                登录
              </Button>
            </Form.Item>
          </Form>
          <Divider>其他登录方式</Divider>
          <div className="login-other">
            <Button icon={<UserOutlined />} block>管理员登录</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;