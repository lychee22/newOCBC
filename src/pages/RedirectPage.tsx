import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spin, Typography } from 'antd';

const { Title, Text } = Typography;

const RedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const targetUrl = searchParams.get('to') || '/';
    // 延迟1秒后重定向，给用户一个过渡效果
    const timer = setTimeout(() => {
      navigate(targetUrl);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <Spin size="large" />
      <Title level={3}>正在重定向...</Title>
      <Text>请稍候，正在为您跳转到目标页面</Text>
    </div>
  );
};

export default RedirectPage;