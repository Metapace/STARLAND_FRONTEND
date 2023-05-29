import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useRequestAlertList } from 'apis';
import Logo from 'src/assets/images/starland-log.png';
import MessageIcon from 'src/assets/images/messageLin.png';
import { Button, Dropdown, Menu, Divider, Message, Avatar } from '@arco-design/web-react';
import { IconPoweroff, IconSettings, IconLanguage } from '@arco-design/web-react/icon';
import { useLocalStorageState, useInterval } from 'ahooks';
import { useTheme } from 'src/ahooks';
import { removeLocalToken } from 'src/utils/localSet';
import dayjs from 'dayjs';
import useI18n from 'src/ahooks/useI18n';
import styles from './index.module.less';

const themeStyle = {
  background: 'var(--theme-color)',
  color: '#fff',
};

const splitStyle = {
  height: '17px',
  borderLeft: '1px solid #2B3674',
};

const Header = () => {
  useTheme();
  const navigate = useNavigate();
  const { lang, i18n, setLang } = useI18n();
  const [nowTime, setNowtime] = useState(dayjs().format('YYYY-MM-DD hh:mm:ss'));
  const [, setLanguage] = useLocalStorageState('language');
  const { data } = useRequestAlertList({ page: 1, page_size: 10, status: 1 });

  const loginOut = () => {
    removeLocalToken();
    navigate('/login');
  };

  useInterval(() => {
    setNowtime(dayjs().format('YYYY-MM-DD hh:mm:ss'));
  }, 1000);

  const goHome = () => {
    navigate('/');
  };

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

  const languageList = (
    <Menu onClickMenuItem={changeLanguage} defaultSelectedKeys={[lang]}>
      <Menu.Item style={lang === 'zh-CN' ? themeStyle : {}} key="zh-CN">
        中文
      </Menu.Item>
      <Menu.Item style={lang === 'en-US' ? themeStyle : {}} key="en-US">
        English
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={goHome}>
        <img src={Logo} alt="" />
      </div>
      <ul className={styles.ul}>
        <li>
          <Dropdown trigger="click" droplist={languageList} position="bl">
            <Button shape="circle" size="default">
              <IconLanguage />
            </Button>
          </Dropdown>
        </li>
        <Divider type={'vertical'} style={splitStyle} />
        <div className={styles['message-icon-outer']} onClick={() => navigate('/message')}>
          {!!data?.count && data?.count > 0 && <div className={styles['message-red-dot']}></div>}

          <img src={MessageIcon} alt="" className={styles['message-icon']} />
        </div>

        <Divider type={'vertical'} style={splitStyle} />
        <div className={styles['now-time']}>{nowTime}</div>
        <Divider type={'vertical'} style={splitStyle} />
        <li className={styles.avatar}>
          <Dropdown
            trigger="click"
            droplist={
              <Menu>
                <Menu.Item key="1">
                  <IconSettings />
                  <span>{i18n[lang]['header.userSetting']}</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={() => loginOut()}>
                  <IconPoweroff />
                  <span>{i18n[lang]['header.logout']}</span>
                </Menu.Item>
              </Menu>
            }
          >
            <Avatar autoFixFontSize={false} size={32}>
              <img src="https://avatars.githubusercontent.com/u/42566669?v=4" alt="avatar" />
            </Avatar>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default Header;
