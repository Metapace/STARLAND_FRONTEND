import React from 'react';
import { Spin } from '@arco-design/web-react';

const Index = () => {
  return (
    <div>
      <Spin
        style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      ></Spin>
    </div>
  );
};

export default Index;
