// import React, { useState } from 'react';
// import styles from './index.module.less';
// import assetsweb2logo from 'src/assets/images/usercenter-assets-web2logo.png';
// import useI18n from 'src/ahooks/useI18n';
// import locale from '../../locales';
// import { useRequestActivity } from 'src/api/activityHooks';
// import Item from '@arco-design/web-react/es/Breadcrumb/item';
// import { AccessAnalyzer } from 'aws-sdk';
// import dayjs from 'dayjs';

// interface DataDetailBoxProps {
//   startTime: number;
//   endTime: number;
//   channel: string;
//   state: number;
//   id: number;
// }

// const DataDetailBox: React.FC<DataDetailBoxProps> = ({ startTime, endTime, channel, state, id }) => {
//   const { lang, i18n } = useI18n(locale);
//   return (
//     <div className={styles['datadetail-content-inner']}>
//       <div className={styles['datadetail-content-inner-left']}>
//         <div>{dayjs.unix(startTime).format('YYYY-MM-DD')}</div>
//         <div>{dayjs.unix(endTime).format('YYYY-MM-DD')}</div>
//         <div className={styles['datadetail-content-inner-left-channel']}>{channel}</div>
//       </div>
//       <div className={styles['datadetail-content-inner-right']}>
//         <div className={styles['datadetail-content-inner-right-state']}>
//           {state == 1 ? '待充值' : state == 2 ? '待支付' : state == 3 ? '待审核 ' : state == 4 ? '审核失败 ' :state == 5 ? '渠道分发 ' : ''}
//         </div>
//         <div className={styles['datadetail-content-inner-right-btn']}>"aaa"</div>
//       </div>
//     </div>
//   );
// };

// const Index = () => {
//   const { lang, i18n } = useI18n(locale);
//   const { data: RemandList } = useRequestActivity();
//   const pageMax = 4;
//   const [currentPage, setCurrentPage] = useState(1);
//   const handleNextPage = () => {
//     if (RemandList && currentPage >= Math.ceil(RemandList.length / pageMax)) {
//       return;
//     }
//     setCurrentPage(currentPage + 1);
//   };
//   const handlePrePage = () => {
//     if (currentPage === 1) {
//       return;
//     }
//     setCurrentPage(currentPage - 1);
//   };
//   console.log('RemandList', RemandList);
//   return (
//     <div className={styles['container']}>
//       <div className={styles['datadetail-top']}>{i18n[lang]['datainfo.detailedData']}</div>
//       <div className={styles['datadetail-content']}>
//         {/* 表头 */}
//         <div className={styles['datadetail-content-header']}>
//           <div className={styles['datadetail-content-header-left']}>
//             <p>{i18n[lang]['datainfo.placementTime']}</p>
//             <p>{i18n[lang]['datainfo.deadline']}</p>
//             <p>{i18n[lang]['datainfo.placementChannel']}</p>
//           </div>
//           <div className={styles['datadetail-content-header-right']}>
//             <p>{i18n[lang]['datainfo.status']}</p>
//             <p>{i18n[lang]['datainfo.operation']}</p>
//           </div>
//         </div>
//         <div>
//           <>
//             {RemandList?.length == 0 ? (
//               <div>暂无数据</div>
//             ) : (
//               RemandList?.slice((currentPage - 1) * pageMax, currentPage * pageMax).map((item) => {
//                 return (
//                   <DataDetailBox
//                     key={item.id}
//                     startTime={item.start}
//                     endTime={item.end}
//                     channel={item.chan_list}
//                     state={item.status}
//                     id={item.id}
//                   />
//                 );
//               })
//             )}
//             <div className={styles['datadetail-content-page']}>
//               <button onClick={handlePrePage}>{i18n[lang]['datainfo.pre']}</button>
//               <p>
//                 {currentPage}/{RemandList && Math.ceil(RemandList?.length / pageMax)}
//               </p>
//               <button onClick={handleNextPage}>{i18n[lang]['datainfo.next']}</button>
//             </div>
//           </>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;
import React, { useState } from 'react';
import styles from './index.module.less';
import assetsweb2logo from 'src/assets/images/usercenter-assets-web2logo.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { useRequestActivity, useRequestActivityByStatus } from 'src/api/activityHooks';
import Item from '@arco-design/web-react/es/Breadcrumb/item';
import { AccessAnalyzer } from 'aws-sdk';
import dayjs from 'dayjs';
import { getActivityListBystatusRequestParams } from 'src/api/activity';

interface DataDetailBoxProps {
  startTime: number;
  endTime: number;
  channel: string;
  state: number;
  id: number;
}

const DataDetailBox: React.FC<DataDetailBoxProps> = ({ startTime, endTime, channel, state, id }) => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['datadetail-content-inner']}>
      <div className={styles['datadetail-content-inner-left']}>
        <div>{dayjs.unix(startTime).format('YYYY-MM-DD')}</div>
        <div>{dayjs.unix(endTime).format('YYYY-MM-DD')}</div>
        <div className={styles['datadetail-content-inner-left-channel']}>{channel}</div>
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
          <div className={styles['datadetail-content-inner-right-btn']}>关闭投放</div>
        ) : (
          <div className={styles['datadetail-content-inner-right-btn']}>开启投放</div>
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
            <p>{i18n[lang]['datainfo.placementTime']}</p>
            <p>{i18n[lang]['datainfo.deadline']}</p>
            <p>{i18n[lang]['datainfo.placementChannel']}</p>
          </div>
          <div className={styles['datadetail-content-header-right']}>
            <p>{i18n[lang]['datainfo.status']}</p>
            <p>{i18n[lang]['datainfo.operation']}</p>
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
