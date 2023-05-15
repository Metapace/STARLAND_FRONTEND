import React from 'react';
import Result403 from 'src/app/Exception/403';
import Result404 from 'src/app/Exception/404';
import Result500 from 'src/app/Exception/500';

const Welcome = React.lazy(() => import('../app/Welcome'));
const Workplace = React.lazy(() => import('../app/Dashboard/WorkPlace/WorkPlace'));
const Datainfo = React.lazy(() => import('../app/DataInfo/index'));

const UserCenter = React.lazy(() => import('../app/User/index'));

const ChannelMarket = React.lazy(() => import('../app/Market/index'));

const ShoppingCart = React.lazy(() => import('../app/ShopCart/index'));

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
    path: '/dashboard/workplace',
    text: '工作台',
    page: <Workplace />,
  },
  {
    path: '/datainfo',
    text: '投后数据',
    page: <Datainfo/>,
  },
  {
    path: '/channel-market',
    text: '渠道市场',
    page: <ChannelMarket />,
  },

  {
    path: '/usercenter',
    text: 'usercenter',
    page: <UserCenter></UserCenter>,
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
    path: '/shopping-cart',
    text: '购物车',
    page: <ShoppingCart />,
  },
];

export default RouterConfig;
