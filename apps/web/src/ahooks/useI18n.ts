import { useContext } from 'react';
import i18n, { II18n } from 'src/locales';
import { GlobalContext } from 'src/utils/GlobalContext';
import { Message } from '@arco-design/web-react';
import { useLocalStorageState } from 'ahooks';

function useI18n(locale: II18n = i18n) {
  const { lang, setLang } = useContext(GlobalContext);
  const [, setLanguage] = useLocalStorageState('language');
  const changeLanguage = (lang: string) => {
    if (lang === 'zh-CN') {
      Message.info('语言切换至 zh-CN');
      setLang('zh-CN');
      setLanguage('zh-CN');
    } else {
      Message.info('Language switch to en-US');
      setLang('en-US');
      setLanguage('en-US');
    }
  };
  return {
    lang,
    i18n: locale,
    setLang,
    changeLanguage,
  };
}

export default useI18n;
