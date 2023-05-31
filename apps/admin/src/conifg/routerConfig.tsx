import React from 'react';
import Result403 from 'src/app/Exception/403';
import Result404 from 'src/app/Exception/404';
import Result500 from 'src/app/Exception/500';

const Welcome = React.lazy(() => import('../app/Welcome'));

const Finance = React.lazy(() => import('../app/Finance/index'));

const Material = React.lazy(() => import('../app/Material/index'));

export interface IRouterConfig {
  path: string;
  text: string;
  page: React.ReactElement;
}

const RouterConfig: IRouterConfig[] = [
  {
    path: '/welcome',
    text: '欢迎页',
    page: <Welcome />,
  },
  {
    path: '/exception/403',
    text: '403',
    page: <Result403 />,
  },
  {
    path: '/exception/404',
    text: '404',
    page: <Result404 />,
  },
  {
    path: '/exception/500',
    text: '500',
    page: <Result500 />,
  },
  {
    path: '/finance-verify',
    text: '财务审核',
    page: <Finance />,
  },
  {
    path: '/material-verify',
    text: '物料审核审核',
    page: <Material />,
  },
];

export default RouterConfig;
