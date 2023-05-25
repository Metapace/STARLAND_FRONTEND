import { request } from "utils";

export interface ReportGetReturnItem {
  data: string;
  impression: number;
  click: number;
  cost: number;
  ctr: number;
}
export interface ReportGetClickReturnItem {
  name: string;
  click: number;
}

export interface AlertListParams {
  page?: number;
  page_size?: number;
  start?: number;
  end?: number;
  status?: 1 | 2;
}

export interface AlertReturn {
  count: number;
  messages: Array<{
    id: number;
    content: string;
    status: number;
    create_time: number;
    read_time: number;
  }>;
}

/**
 *
 * @param email 邮箱
 * @description 邮箱发送验证码
 */
export const sendCodeRequest = (email: string) =>
  request.post("user/email/send", { email });

/**
 *
 * @param email 邮箱
 * @param code 验证码
 * @description 邮箱验证码登录
 * @returns token
 */
export const loginRequest = (params: { email: string; code: string }) =>
  request.post("user/login1", params) as Promise<{ token: string }>;

/**
 *
 * @description 获取用户信息
 */
export const userInfoRequest = () =>
  request.get("user/get", {}) as Promise<{
    email: string;
    card_id: number;
    create_time: number;
    avatar_uri: string;
  }>;

/**
 *
 * @description 获取仪表盘的资产和活动数量
 */
export const dashBoardInfoRequest = () =>
  request.get("user/dashboard/get", {}) as Promise<{
    balance: number;
    available_balance: number;
    total_activity: number;
    running_activity: number;
  }>;

/**
 *
 * @description 获取没有明细的投后数据
 * @param date_type number 10:所有的总值；4:近7日数据；
 * @returns data 时间
 * @returns impression 访问量
 * @returns click 点击量
 * @returns cost 花费成本
 *@returns ctr 点击率
 */

export const reportGet = (params: { date_type: number }) =>
  request.get("report/get", params) as Promise<Array<ReportGetReturnItem>>;

/**
 *
 * @param page： number
 * @param page_size: number
 * @param start: number
 * @param end: number
 * @param status: number 1: 未读 2: 已读
 * @returns
 * @description 根据不同的筛选条件获取所有通知列表
 */

export const getAlertLsit = (params: AlertListParams) =>
  request.post("alert/list", params) as Promise<AlertReturn>;

/**
 *
 * @description 获取没有明细的投后数据
 * @param date_type number 10:所有的总值；4:近7日数据；
 * @returns data 时间
 * @returns impression 访问量
 * @returns click 点击量
 * @returns cost 花费成本
 *@returns ctr 点击率
 */

export const reportGetClick = (params: { date_type: number }) =>
  request.get("report/click/get", params) as Promise<
    Array<ReportGetClickReturnItem>
  >;
