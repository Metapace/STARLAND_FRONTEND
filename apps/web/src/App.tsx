import React, { Suspense, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';

import { useColor, useTheme } from 'src/ahooks';
import { useLocalStorageState } from 'ahooks';
import { Login } from './app/Login';
import { Home } from './app/Home';
import Introduction from './app/Introduction';
import Loading from './components/Loading/Loading';
import { GlobalContext, ILang } from './utils/GlobalContext';
import './index.less';
import 'src/assets/css/reset-arco.less';

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
      <ConfigProvider locale={locale}>
        <GlobalContext.Provider value={contextValue}>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Introduction />} />
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Home />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </GlobalContext.Provider>
      </ConfigProvider>
    </div>
  );
};
export default App;
