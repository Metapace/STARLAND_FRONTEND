import React, { useState } from 'react';

import styles from './index.module.less';
import UserInfo from './components/UserInfo';
import Property from './components/Property';
import Transations from './components/Transactions';
import VoucherModal from './components/VoucherModal';

const Index = () => {
  const [openVoucherModal, setOpenVoucherModal] = useState(false);
  const handleOpenVoucherModal = () => setOpenVoucherModal(true);
  const handleCloseVoucherModal = () => setOpenVoucherModal(false);
  return (
    <div className={styles['container']}>
      <UserInfo />
      <Property handleOpenVoucherModal={handleOpenVoucherModal} handleCloseVoucherModal={handleCloseVoucherModal} />
      <Transations />
      <VoucherModal open={openVoucherModal} handleCloseVoucherModal={handleCloseVoucherModal} />
    </div>
  );
};

export default Index;
