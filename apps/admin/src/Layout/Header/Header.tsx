import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Logo from 'src/assets/images/starland-log.png';
import { Button, Dropdown, Menu, Divider, Message, Avatar } from '@arco-design/web-react';
import { IconPoweroff, IconSettings, IconLanguage } from '@arco-design/web-react/icon';
import { useInterval } from 'ahooks';
import { useTheme } from 'src/ahooks';
import { removeLocalToken } from 'src/utils/localSet';
import dayjs from 'dayjs';
import useI18n from 'src/ahooks/useI18n';
import styles from './index.module.less';

const splitStyle = {
  height: '17px',
  borderLeft: '1px solid #2B3674',
};

const Header = () => {
  useTheme();
  const navigate = useNavigate();
  const { lang, i18n, setLang } = useI18n();
  const [nowTime, setNowtime] = useState(dayjs().format('YYYY-MM-DD hh:mm:ss'));

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

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={goHome}>
        <img src={Logo} alt="" />
      </div>
      <ul className={styles.ul}>
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
