import React, { useState } from 'react';

import styles from './index.module.less';
import UserInfo from './components/UserInfo';
import Property from './components/Property';
import Transations from './components/Transactions';
import VoucherModal from './components/VoucherModal';
import EditModal from './components/EditModal';

const Index = () => {
  const [openVoucherModal, setOpenVoucherModal] = useState(false);
  const [openEditModal, setopenEditModal] = useState<boolean>(false);

  const handleOpenVoucherModal = () => setOpenVoucherModal(true);
  const handleCloseVoucherModal = () => setOpenVoucherModal(false);

  const handleCloseEditModal = () => {
    setopenEditModal(false);
  };

  const handleOpenEditModal = () => {
    setopenEditModal(true);
  };

  const [refresh, setRefresh] = useState(false);

  return (
    <div className={styles['container']}>
      <UserInfo handleOpenEditModal={handleOpenEditModal} />
      <Property handleOpenVoucherModal={handleOpenVoucherModal} handleCloseVoucherModal={handleCloseVoucherModal} />
      <Transations refresh={refresh} />
      <VoucherModal
        open={openVoucherModal}
        handleCloseVoucherModal={handleCloseVoucherModal}
        refresh={refresh}
        setrefresh={setRefresh}
      />
      {openEditModal && <EditModal open={openEditModal} handleCloseEditModal={handleCloseEditModal}></EditModal>}
    </div>
  );
};

export default Index;
