import React, { CSSProperties } from 'react';
import styles from './index.module.less';
import Sbutton from '../Sbutton';
import PayModal from 'src/components/PayModal';
import useI18n from 'src/ahooks/useI18n';
import locale from './locales';
import { useToggle } from 'ahooks';
import { useMutationRelaunch } from 'apis';
import { useRequestDashboardInfo } from 'apis';
import classNames from 'classnames';

interface RelaunchButtonProps {
  id: number;
  onFinish?: () => void;
  className?: string | string[];
  style?: CSSProperties;
}

const amount = 2000;

/**
 *
 * @param id : 活动id
 * @params onFinish: 非必传， 成功时的回调
 * @params classname: 类名覆盖
 * @params style: 样式覆盖
 *
 */
const Index: React.FC<RelaunchButtonProps> = ({ id, onFinish, className, style }) => {
  const { lang, i18n } = useI18n(locale);
  const [open, { toggle }] = useToggle(false);
  const { data } = useRequestDashboardInfo();
  const { mutateAsync, isLoading } = useMutationRelaunch();
  const handleRelaunch = async () => {
    if (data?.balance && data?.balance >= amount) {
      await mutateAsync({ act_id: id, status: 3 });
      onFinish?.();
    } else {
      await mutateAsync({ act_id: id, status: 1 });
      toggle();
      onFinish?.();
    }
  };
  return (
    <>
      <PayModal open={open} handleCloseModal={toggle} activityId={id} />
      <Sbutton
        text={i18n[lang]['re.placement']}
        className={classNames(styles['re-launch-button'], className)}
        loading={isLoading}
        style={style}
        onClick={handleRelaunch}
      ></Sbutton>
    </>
  );
};

export default Index;
