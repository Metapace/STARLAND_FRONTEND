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
  color?: string;
  onClick?: UseMutateAsyncFunction<void, unknown, void, unknown> | (() => void);
}

const Sbutton: React.FC<SbuttonProps> = ({ loading, className, style, onClick, text }) => {
  return (
    <span className={styles['button-outer']}>
      <Button
        className={classNames(className, styles['common-button'])}
        style={style}
        loading={loading}
        onClick={() => onClick?.()}
      >
        {text}
      </Button>
    </span>
  );
};

export default Sbutton;
