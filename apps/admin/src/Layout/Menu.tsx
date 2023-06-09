import React, { useEffect, useState, useMemo } from 'react';
import { Menu } from '@arco-design/web-react';
import { IMenusItem, menuConfig } from '../conifg/menuConfig';
import { useRequestUserIndfo } from 'apis';
import { useLocation, Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import DashbordIcon from 'src/assets/images/menu/dashbord-menu.svg';
import AfterDataIcon from 'src/assets/images/menu/after-data-menu.svg';
import ChannelIcon from 'src/assets/images/menu/channel-menu.svg';
import InviteIcon from 'src/assets/images/menu/invite-menu.svg';
import PublishIcon from 'src/assets/images/menu/publish-menu.svg';
import UserIcon from 'src/assets/images/menu/user-menu.svg';
import styles from './menu.module.less';
import classNames from 'classnames';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface IconsPros {
  [key: string]: React.ReactElement;
}

const MenuSvgIcon = ({ src }: { src: string | React.FunctionComponent<React.SVGAttributes<SVGElement>> }) => (
  <ReactSVG src={src as string} wrapper="span" className={classNames(styles.ReactSVG)} />
);

const icons: IconsPros = {
  IconDashboard: <MenuSvgIcon src={DashbordIcon} />,
  IconAfterData: <MenuSvgIcon src={AfterDataIcon} />,
  IconChannel: <MenuSvgIcon src={ChannelIcon} />,
  IconInvite: <MenuSvgIcon src={InviteIcon} />,
  IconPublish: <MenuSvgIcon src={PublishIcon} />,
  IconUser: <MenuSvgIcon src={UserIcon} />,
};
const menu: IMenusItem[] = menuConfig.menu;

const getMenu = (menus: IMenusItem[], selectedKey: string[]) => {
  console.log(selectedKey, 'selectedKeys');
  const list = menus.map((item) => {
    if (item.children && item.children.length > 1) {
      return (
        <SubMenu
          selectable
          className={classNames(
            styles['sub-menu-container'],
            selectedKey.includes(item.key) && styles['select-subsub-menu-container'],
          )}
          title={
            <span>
              {item.icon && icons[item.icon]}
              {item.name}
            </span>
          }
          key={item.key}
        >
          {getMenu(item.children, selectedKey)}
        </SubMenu>
      );
    }
    if (item.children && item.children.length === 1) {
      return (
        <MenuItem key={item.children[0].path} className={styles['menu-item-container']}>
          <Link to={item.children[0].path} style={{ display: 'flex', flex: '1' }}>
            <span>
              {item.icon && icons[item.icon]}
              {item.name}
            </span>
          </Link>
        </MenuItem>
      );
    }
    return (
      <MenuItem key={item.path} className={styles['menu-item-container']}>
        <Link to={item.path} style={{ display: 'flex', flex: '1' }}>
          {item.name}
        </Link>
      </MenuItem>
    );
  });
  return list;
};

export const MenuComponent = () => {
  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { data } = useRequestUserIndfo();
  data?.author_rights;
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    initMenus();
  }, [location.pathname]);

  function initMenus() {
    const key = location.pathname.split('/') ? '/' + location.pathname.split('/')[1] : '';
    setOpenKeys([key]);
    setSelectedKey([location.pathname]);
  }
  const onClickMenuItem = (key: string) => {
    setSelectedKey([key]);
  };

  const showMemu = useMemo(() => {
    const authRight = data?.author_rights;
    if (!authRight) return menu;
    const returnMemu: IMenusItem[] = [];
    menu.forEach((item) => {
      if (!item.auth) {
        returnMemu.push(item);
        return;
      }
      if (item.auth.includes(authRight)) {
        returnMemu.push(item);
      }
    });
    return returnMemu;
  }, [data, menu]);

  return (
    <Menu
      onClickMenuItem={onClickMenuItem}
      selectedKeys={selectedKey}
      style={{ width: '100%' }}
      onClickSubMenu={(_, openKeys) => {
        setOpenKeys(openKeys);
      }}
      openKeys={openKeys}
      className={styles['menu-container']}
    >
      {getMenu(showMemu, selectedKey)}
    </Menu>
  );
};
