import { useLocalStorageState } from 'ahooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenName } from 'src/utils/localSet';

import LayoutMain from '../../Layout/Layout';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [userToken] = useLocalStorageState(TokenName);
  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  }, []);

  return <LayoutMain />;
};
