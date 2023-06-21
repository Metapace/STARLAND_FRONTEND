import React, { Suspense, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import { queryClient, QueryClientProviders } from 'apis';
import { useColor, useTheme } from 'src/ahooks';
import { useLocalStorageState } from 'ahooks';
import Loading from './components/Loading/Loading';
import { GlobalContext, ILang } from './utils/GlobalContext';
import './index.less';
import 'src/assets/css/reset-arco.less';
const Login = React.lazy(
  () =>
    import(
      /* webpackChunkName: "login-page" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      './app/Login'
    ),
);
const Home = React.lazy(
  () =>
    import(
      /* webpackChunkName: "home-page" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      './app/Home'
    ),
);
const Homepage = React.lazy(() => import('./app/Homepage'));

const App = () => {
  useTheme();
  useColor();
  const [language] = useLocalStorageState<ILang>('language');
  const [lang, setLang] = useState<ILang>(language ?? 'zh-CN');
  const contextValue = {
    lang,
    setLang,
  };
  const locale = useMemo(() => {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }, [lang]);
  return (
    <div className="app-land">
      <QueryClientProviders client={queryClient}>
        <ConfigProvider locale={locale}>
          <GlobalContext.Provider value={contextValue}>
            <BrowserRouter>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/*" element={<Home />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </GlobalContext.Provider>
        </ConfigProvider>
      </QueryClientProviders>
    </div>
  );
};
export default App;
