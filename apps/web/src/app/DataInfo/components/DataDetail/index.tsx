import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.module.less';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { useRequestActivityByStatus, useMutationUpdateMaterial, getActivityListBystatusRequestParams } from 'apis';
import dayjs from 'dayjs';
import RelaunchButton from 'src/components/RelaunchButton';
import { Modal } from '@arco-design/web-react';
import nodata from 'src/assets/images/datainfo-nodata.png';
import HorizontalScroll from 'src/components/HorizontalScroll';

import { NoDataProps } from '../DataOverview';

export const DataDetailNoData: React.FC<NoDataProps> = ({ type }) => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['chart-container-nodata-box']}>
      <img src={nodata} alt="nodata" className={styles['chart-container-nodata-box-img']} />
      {type === 'nodata' ? (
        <div className={styles['chart-container-nodata-box-note']}>{i18n[lang]['datainfo.noData']}...</div>
      ) : type === 'norecord' ? (
        <div className={styles['chart-container-nodata-box-note']}>{i18n[lang]['datainfo.noRecord']}...</div>
      ) : (
        <div className={styles['chart-container-nodata-box-note']}>{i18n[lang]['datainfo.loading']}...</div>
      )}
    </div>
  );
};
interface DataDetailBoxProps {
  startTime: number;
  endTime: number;
  channel: string;
  state: number;
  id: number;
  refetch: () => Promise<unknown>;
}

const DataDetailBox: React.FC<DataDetailBoxProps> = ({ startTime, endTime, channel, state, id, refetch }) => {
  const { lang, i18n } = useI18n(locale);
  const { mutateAsync: updataMaterial } = useMutationUpdateMaterial();
  const [visible, setVisible] = React.useState(false);

  const handleSubmit = async (activityId: number) => {
    await updataMaterial({ id: activityId, status: 10 });
    refetch();
  };
  const channelarray = channel.split(',');
  console.log('channelarray', channelarray);
  return (
    <div className={styles['datadetail-content-inner']}>
      <div className={styles['datadetail-content-inner-left']}>
        <div style={{ width: '100px' }}>{dayjs.unix(startTime).format('YYYY-MM-DD')}</div>
        <div style={{ width: '100px' }}>{dayjs.unix(endTime).format('YYYY-MM-DD')}</div>
        <div style={{ width: '200px' }} className={styles['datadetail-content-inner-left-channel']}>
          {channelarray.length > 4
            ? channelarray.slice(0, 4).map((item) => <img src={item} alt={item} key={item} />)
            : channelarray.map((item) => <img src={item} alt={item} key={item} />)}
        </div>
      </div>
      <div className={styles['datadetail-content-inner-right']}>
        {state == 6 || state == 10 ? (
          <div style={{ width: '72px' }} className={styles['datadetail-content-inner-right-state']}>
            {i18n[lang]['datainfo.inProgress']}
          </div>
        ) : (
          <div
            className={styles['datadetail-content-inner-right-state']}
            style={{ border: '1px solid #EB0F5E', color: '#EB0F5E', width: '72px' }}
          >
            {i18n[lang]['datainfo.ended']}
          </div>
        )}

        {state == 6 ? (
          <div
            onClick={() => setVisible(true)}
            // onClick={()=>handleSubmit(id)}
            style={{ width: '140px' }}
            className={styles['datadetail-content-inner-right-btn']}
          >
            {i18n[lang]['datainfo.closed']}
          </div>
        ) : state == 10 ? (
          <div
            // onClick={() => setVisible(true)}
            // onClick={()=>handleSubmit(id)}
            style={{ width: '140px' }}
            className={styles['datadetail-content-inner-right-btn-active']}
          >
            {i18n[lang]['datainfo.closing']}
          </div>
        ) : (
          <RelaunchButton
            id={id}
            style={{
              color: '#a2a7b5',
              padding: '0',
              width: '140px',
              paddingInline: '20px',
              borderRadius: '5px',
              background: '#e9ecf4',
              boxShadow: '-3px -3px 5px #ffffff, 2px 4px 5px rgba(0, 0, 0, 0.14)',
            }}
          />
        )}
      </div>
      <Modal
        title={i18n[lang]['datainfo.closingConfirmation']}
        visible={visible}
        okButtonProps={{}}
        onOk={() => handleSubmit(id)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock
        maskClosable={false}
        style={{
          background: '#E9ECF4',
          border: '1px solid rgba(0, 0, 0, 0.15)',
          borderRadius: '23px',
          width: '500px',
          boxSizing: 'border-box',
          paddingInline: '42px',
          paddingTop: '10px',
        }}
        wrapClassName={styles.moadlwrap}
      >
        <div>{i18n[lang]['datainfo.note1']}</div>
        <div>{i18n[lang]['datainfo.note2']}</div>
      </Modal>
    </div>
  );
};

export const StarPagination = ({
  total,
  onChange,
  currentPage,
  pageSize,
}: {
  currentPage: number;
  total: number;
  onChange: (page: number) => void;
  pageSize: number;
}) => {
  const { lang, i18n } = useI18n(locale);
  const totalPage = useMemo(() => {
    return Math.ceil(+total / +pageSize);
  }, [total, pageSize]);
  const handlePrePage = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      onChange(currentPage + 1);
    }
  };
  return (
    <div className={styles['datadetail-content-page-component']}>
      <button onClick={handlePrePage}>{i18n[lang]['datainfo.pre']}</button>
      <p>
        <span style={{ color: '#3776F2' }}>{currentPage}</span>/{totalPage}
      </p>
      <button onClick={handleNextPage}>{i18n[lang]['datainfo.next']}</button>
    </div>
  );
};

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const pageMax = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const ActivityListBystatusRequestParams: getActivityListBystatusRequestParams = {
    page: currentPage,
    page_size: pageMax,
    action: '6,7,10',
  };

  const {
    data: RemandListByStatus,
    isLoading: isLoading_DD,
    refetch,
  } = useRequestActivityByStatus(ActivityListBystatusRequestParams);
  // console.log('RemandListByStatus', RemandListByStatus);
  const handleNextPage = () => {
    if (RemandListByStatus && currentPage >= Math.ceil(RemandListByStatus?.num / pageMax)) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  const handlePrePage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    if (RemandListByStatus) {
      // console.log('RemandListByStatus', RemandListByStatus);
      if (currentPage > Math.ceil(RemandListByStatus?.num / pageMax)) {
        setCurrentPage(currentPage - 1);
      }
    }
  }, [RemandListByStatus]);

  return (
    <div className={styles['container']}>
      <div className={styles['datadetail-top']}>{i18n[lang]['datainfo.detailedData']}</div>
      <div className={styles['datadetail-content']}>
        {/* 表头 */}
        <div className={styles['datadetail-content-header']}>
          <div className={styles['datadetail-content-header-left']}>
            <div className={styles['datadetail-content-header-left-1']}>{i18n[lang]['datainfo.placementTime']}</div>
            <div className={styles['datadetail-content-header-left-2']}>{i18n[lang]['datainfo.deadline']}</div>
            <div className={styles['datadetail-content-header-left-3']}>{i18n[lang]['datainfo.placementChannel']}</div>
          </div>
          <div className={styles['datadetail-content-header-right']}>
            <div style={{ width: '100px' }}>{i18n[lang]['datainfo.status']}</div>
            <div style={{ width: '100px' }}>{i18n[lang]['datainfo.operation']}</div>
          </div>
        </div>
        <div>
          <>
            {isLoading_DD ? (
              <DataDetailNoData type="loading" />
            ) : RemandListByStatus?.list.length == 0 ? (
              <DataDetailNoData type="nodata" />
            ) : (
              RemandListByStatus?.list.map((item) => {
                return (
                  <DataDetailBox
                    key={item.id}
                    startTime={item.start}
                    endTime={item.end}
                    channel={item.chan_list}
                    state={item.status}
                    id={item.id}
                    refetch={refetch}
                  />
                );
              })
            )}
            <div className={styles['datadetail-content-page']}>
              <button onClick={handlePrePage}>{i18n[lang]['datainfo.pre']}</button>
              <p>
                {RemandListByStatus?.num == 0 ? (
                  <>
                    {' '}
                    <span style={{ color: '#3776F2' }}>0</span>/0
                  </>
                ) : (
                  <>
                    {' '}
                    <span style={{ color: '#3776F2' }}>{currentPage}</span>/
                    {RemandListByStatus && Math.ceil(RemandListByStatus?.num / pageMax)}
                  </>
                )}
              </p>
              <button onClick={handleNextPage}>{i18n[lang]['datainfo.next']}</button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Index;
