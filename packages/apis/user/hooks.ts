import { useQuery } from "@tanstack/react-query";
import {
  dashBoardInfoRequest,
  userInfoRequest,
  reportGet,
  AlertListParams,
  getAlertLsit,
  reportGetClick,
} from "./api";

const useRequestUserIndfo = () => {
  const query = useQuery(["userinfo"], userInfoRequest);
  return query;
};

const useRequestDashboardInfo = () => {
  const query = useQuery(["dashbord"], dashBoardInfoRequest);
  return query;
};

/**
 *
 *  @params date_type number 10.所有的总值；4.近7日数据；
 * @returns
 */
const useRequestreportGet = (date_type: 10 | 4) => {
  const query = useQuery([`report${date_type}`], () =>
    reportGet({ date_type })
  );
  return query;
};

/**
 *
 *  @params date_type number 10.所有的总值；4.近7日数据；
 * @returns
 */
const useRequestreportGetClick = (date_type: number) => {
  const query = useQuery([`reportclick${date_type}`], () =>
    reportGetClick({ date_type })
  );
  return query;
};

const useRequestAlertList = (params: AlertListParams) => {
  const query = useQuery([`alertList${JSON.stringify(params)}`], () =>
    getAlertLsit(params)
  );
  return query;
};

export {
  useRequestUserIndfo,
  useRequestDashboardInfo,
  useRequestreportGet,
  useRequestAlertList,
  useRequestreportGetClick,
};
