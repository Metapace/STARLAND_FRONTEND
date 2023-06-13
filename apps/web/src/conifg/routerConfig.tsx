import React from 'react';
import Result403 from 'src/app/Exception/403';
import Result404 from 'src/app/Exception/404';
import Result500 from 'src/app/Exception/500';

const Welcome = React.lazy(
  /* webpackChunkName: "welcome-page" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */ () => import('../app/Welcome'),
);
const Workplace = React.lazy(
  /* webpackChunkName: "Workplace-page" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  () => import('../app/Dashboard/WorkPlace/WorkPlace'),
);
const Datainfo = React.lazy(
  () =>
    import(
      /* webpackChunkName: "DataInfo-page" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '../app/DataInfo/index'
    ),
);

const UserCenter = React.lazy(
  () =>
    import(
      /* webpackChunkName: "UserCenter-page" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '../app/User/index'
    ),
);

const ChannelMarket = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ChannelMarket-page" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '../app/Market/index'
    ),
);

const ShoppingCart = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ShoppingCart-page" */
      '../app/ShopCart/index'
    ),
);

const PublishDemand = React.lazy(
  () =>
    import(
      /* webpackChunkName: "PublishDemand-page" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '../app/PublishDemand/index'
    ),
);

const CreateDemand = React.lazy(
  () =>
    import(
      /* webpackChunkName: "CreateDemand-page" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '../app/CreateDemand/index'
    ),
);

const VerifyError = React.lazy(() => import('../app/VerifyError/index'));

const CreateSuccess = React.lazy(() => import('../app/CreateSuccess/index'));

const UpdateDemand = React.lazy(
  () =>
    import(
      /* webpackChunkName: "UpdateDemand-page" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '../app/EditDemand/index'
    ),
);

const Message = React.lazy(
  () =>
    import(
      /* webpackChunkName: "Message-page" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '../app/Message'
    ),
);
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
    page: <Datainfo />,
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
  {
    path: '/publish-demand',
    text: '发布需求',
    page: <PublishDemand />,
  },
  {
    path: '/create-demand',
    text: '创建需求',
    page: <CreateDemand />,
  },
  {
    path: '/verify-fail',
    text: '审核失败',
    page: <VerifyError />,
  },
  {
    path: '/create-success',
    text: '创建成功',
    page: <CreateSuccess />,
  },
  {
    path: '/edit-demand',
    text: '修改需求',
    page: <UpdateDemand />,
  },
  {
    path: '/message',
    text: '消息中心',
    page: <Message />,
  },
];

export default RouterConfig;
