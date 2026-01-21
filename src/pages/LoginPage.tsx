import React, { useState } from 'react';
import { Card, Form, Input, Button, Checkbox, Typography, Divider, Space, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockLogin } from '../mock/users';
import { useUserStore } from '../store/modules/user';
import { usePermissionStore } from '../store/modules/permission';
import './LoginPage.css';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserInfo, setToken } = useUserStore();
  const { generateRoutes } = usePermissionStore();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 使用模拟数据登录
      const user = await mockLogin(values.username, values.password);
      
      if (user) {
        console.log('Login success:', user);
        
        // 设置用户状态
        setUserInfo({
          loginID: user.username,
          name: user.name,
          role: user.role,
          env: 'dev'
        });
        setToken('mock-token');
        
        // 保存登录状态到localStorage（兼容性）
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // 生成基于角色的路由和菜单
        try {
          await generateRoutes(user.role);
          console.log('Routes generated successfully for user:', user.username);
        } catch (error) {
          console.error('Failed to generate routes:', error);
          message.warning('菜单加载失败，部分功能可能不可用');
        }
        
        message.success('登录成功！');
        navigate('/');
      } else {
        message.error('用户名或密码错误');
      }
    } catch (error) {
      console.error('Login failed:', error);
      message.error('登录失败，请稍后重试');
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
          <div className="login-hint">
            <Text type="secondary">测试账号：admin/admin123 或 user/user123</Text>
          </div>
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