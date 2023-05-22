import { useQuery } from '@tanstack/react-query';
import {
  dashBoardInfoRequest,
  userInfoRequest,
  reportGet,
  ReportGetReturnItem,
  AlertListParams,
  getAlertLsit,
} from 'src/api/user';
import { companyInfoRequest } from 'src/api/company';
import { transactionInfoRequest } from 'src/api/assets';

const useRequestUserIndfo = () => {
  const query = useQuery(['userinfo'], userInfoRequest);
  return query;
};

const useRequestDashboardInfo = () => {
  const query = useQuery(['dashbord'], dashBoardInfoRequest);
  return query;
};

/**
 *
 *  @params date_type number 10.所有的总值；4.近7日数据；
 * @returns
 */
const useRequestreportGet = (date_type: 10 | 4) => {
  const query = useQuery([`report${date_type}`], () => reportGet({ date_type }));
  return query;
};

const useRequestAlertList = (params: AlertListParams) => {
  const query = useQuery([`alertList${JSON.stringify(params)}`], () => getAlertLsit(params));
  return query;
};

// 公司信息获取
const useRequestCompanyInfo = () => {
  const query = useQuery(['companyinfo'], () => companyInfoRequest());
  return query;
};

// 充值记录
const useRequestTransactionsInfo = () => {
  const query = useQuery(['transactionsinfo'], () => transactionInfoRequest());
  return query;
};

export {
  useRequestUserIndfo,
  useRequestDashboardInfo,
  useRequestreportGet,
  useRequestAlertList,
  useRequestCompanyInfo,
  useRequestTransactionsInfo,
};
