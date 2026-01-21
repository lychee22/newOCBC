import React from 'react';
import { Card } from 'antd';

interface ContentWrapProps {
  title: string;
  message?: string;
  children: React.ReactNode;
}

export const ContentWrap: React.FC<ContentWrapProps> = ({ title, message, children }) => {
  return (
    <Card title={title} bordered={false} style={{ margin: '16px' }}>
      {message && <p style={{ marginBottom: '16px' }}>{message}</p>}
      {children}
    </Card>
  );
};
