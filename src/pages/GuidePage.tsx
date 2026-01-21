import React from 'react';
import { Button } from 'antd';
import { ContentWrap } from '../components/common/ContentWrap/ContentWrap';

const GuidePage: React.FC = () => {
  // 模拟引导功能
  const guideStart = () => {
    console.log('引导开始');
    // 这里可以实现具体的引导逻辑
  };

  return (
    <ContentWrap title="引导页面" message="欢迎使用FXOL系统">
      <Button type="primary" onClick={guideStart}>
        开始引导
      </Button>
    </ContentWrap>
  );
};

export default GuidePage;
