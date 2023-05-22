import { useQuery } from '@tanstack/react-query';
import { dashBoardInfoRequest, userInfoRequest, reportGet, ReportGetReturnItem } from 'src/api/user';

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
  const query = useQuery(['report'], () => reportGet({ date_type }));
  return query;
};

export { useRequestUserIndfo, useRequestDashboardInfo, useRequestreportGet };
