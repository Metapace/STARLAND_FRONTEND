import React, { useState } from 'react';
import styles from './index.module.less';
import assetsweb2logo from 'src/assets/images/usercenter-assets-web2logo.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { useRequestActivity, useRequestActivityByStatus } from 'apis';
import Item from '@arco-design/web-react/es/Breadcrumb/item';
import { AccessAnalyzer } from 'aws-sdk';
import dayjs from 'dayjs';
import { getActivityListBystatusRequestParams } from 'src/api/activity';
import RelaunchButton from 'src/components/RelaunchButton';
import { color } from 'echarts';
import { useMutationUpdateMaterial } from 'apis';

interface DataDetailBoxProps {
  startTime: number;
  endTime: number;
  channel: string;
  state: number;
  id: number;
}

const DataDetailBox: React.FC<DataDetailBoxProps> = ({ startTime, endTime, channel, state, id }) => {
  const { lang, i18n } = useI18n(locale);
  const { mutateAsync: updataMaterial, isLoading } = useMutationUpdateMaterial();

  const handleSubmit = async (activityId: number) => {
    await updataMaterial({ id: activityId, status: 10 });
  };
  return (
    <div className={styles['datadetail-content-inner']}>
      <div className={styles['datadetail-content-inner-left']}>
        <div style={{ width: '100px' }}>{dayjs.unix(startTime).format('YYYY-MM-DD')}</div>
        <div style={{ width: '100px' }}>{dayjs.unix(endTime).format('YYYY-MM-DD')}</div>
        <div style={{ width: '200px' }} className={styles['datadetail-content-inner-left-channel']}>
          {channel}
        </div>
      </div>
      <div className={styles['datadetail-content-inner-right']}>
        {state == 6 ? (
          <div className={styles['datadetail-content-inner-right-state']}>投放中</div>
        ) : (
          <div
            className={styles['datadetail-content-inner-right-state']}
            style={{ border: '1px solid #EB0F5E', color: '#EB0F5E' }}
          >
            已结束
          </div>
        )}

        {state == 6 ? (
          <div
            onClick={() => handleSubmit(id)}
            style={{ width: '140px' }}
            className={styles['datadetail-content-inner-right-btn']}
          >
            关闭投放
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
    action: '6,7',
  };
  const { data: RemandListByStatus } = useRequestActivityByStatus(ActivityListBystatusRequestParams);

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
            {RemandListByStatus?.list.length == 0 ? (
              <div>暂无数据</div>
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
                  />
                );
              })
            )}
            <div className={styles['datadetail-content-page']}>
              <button onClick={handlePrePage}>{i18n[lang]['datainfo.pre']}</button>
              <p>
                {RemandListByStatus?.num == 0 ? (
                  <> 0/0</>
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
