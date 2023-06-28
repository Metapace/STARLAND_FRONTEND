import { useLocalStorageState, useSessionStorageState } from 'ahooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenName } from 'src/utils/localSet';

import LayoutMain from '../../Layout/Layout';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [userToken] = useLocalStorageState(TokenName);
  const [sessionToken] = useSessionStorageState(TokenName);

  useEffect(() => {
    if (!userToken && !sessionToken) {
      navigate('/login');
    }
  }, []);

  return <LayoutMain />;
};
