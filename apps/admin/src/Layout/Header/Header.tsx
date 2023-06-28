import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Logo from 'src/assets/images/starland-log.png';
import { Dropdown, Menu, Divider, Avatar } from '@arco-design/web-react';
import { IconPoweroff, IconSettings } from '@arco-design/web-react/icon';
import { useRequestUserIndfo } from 'apis';
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
  const { lang, i18n } = useI18n();
  const { data } = useRequestUserIndfo();
  const [nowTime, setNowtime] = useState(dayjs().format('YYYY-MM-DD hh:mm:ss'));

  const loginOut = () => {
    removeLocalToken();
    navigate('/login');
  };

  useInterval(() => {
    setNowtime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  }, 1000);

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={goHome}>
        <img src={Logo} alt="" />
        <div className={styles['log-title']}>管理后台</div>
      </div>
      <ul className={styles.ul}>
        <div className={styles['now-time']}>{nowTime}</div>
        <Divider type={'vertical'} style={splitStyle} />
        <li className={styles.avatar}>
          <Dropdown
            trigger="click"
            droplist={
              <Menu>
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
            <span style={{ marginLeft: '8px' }}>{data?.name}</span>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default Header;
