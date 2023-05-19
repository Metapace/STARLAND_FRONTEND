import React, { CSSProperties } from 'react';
import { Button } from '@arco-design/web-react';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import classNames from 'classnames';
import styles from './index.module.less';

interface SbuttonProps {
  loading?: boolean;
  className?: string | string[];
  style?: CSSProperties;
  text?: string;
  onClick?: UseMutateAsyncFunction<void, unknown, void, unknown> | (() => void);
}

const Sbutton: React.FC<SbuttonProps> = ({ loading, className, style, onClick, text }) => {
  return (
    <Button
      className={classNames(className, styles['common-button'])}
      style={style}
      loading={loading}
      loadingFixedWidth
      onClick={() => onClick?.()}
    >
      {text}
    </Button>
  );
};

export default Sbutton;
