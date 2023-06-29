import { request } from "utils";

// 1:订单通过审核 2:订单未通过审核 3:订单进入投放 4:充值成功 5:充值未成功 6:订单审结束投放
export enum AlertReturnType {
  PassReview = 1,
  FailReview = 2,
  Going = 3,
  DepositSuccess = 4,
  DepositFail = 5,
  ActivityEnd = 6,
}

export enum AuthRightEnum {
  Finance = 1,
  Delivery = 2,
  Design = 3,
  Other = 4,
}

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
  status?: number;
}

export interface AlertReturnItem {
  id: number;
  content: string;
  status: number;
  create_time: number;
  read_time: number;
  reason: string;
  msg_type: AlertReturnType;
  info_type: number;
  action_id: number;
}

export interface AlertReturn {
  count: number;
  messages: Array<AlertReturnItem>;
}

export interface UpdateParams {
  project_name: string;
  avatar_uri?: string;
}

/**
 *
 * @param email 邮箱
 * @params ty 1- 中文 2-英文
 * @description 邮箱发送验证码
 */
export const sendCodeRequest = (email: string, ty: 1 | 2) =>
  request.post("user/email/send", { email, ty });

/**
 *
 * @param email 邮箱
 * @param message 签名信息
 * @description 钱包登录
 * @returns token
 */
export const loginRequest = (params: { email: string; code: string }) =>
  request.post("user/login", params) as Promise<{ token: string }>;

/**
 *
 * @param address 钱包地址
 * @param code 验证码
 * @param sign 签名
 * @description 邮箱验证码登录
 * @returns token
 */
export const loginRequestByWallet = (params: {
  address: string;
  message: string;
  sign: string;
}) => request.post("user/wallet/login", params) as Promise<{ token: string }>;

/**
 *
 * @description 获取用户信息
 * @returns author_rights 1:财务 2:投放部 3: 设计部 4:其他
 */
export const userInfoRequest = () => {
  return request.get("user/get", {}) as Promise<{
    email: string;
    name?: string;
    card_id: number;
    create_time: number;
    avatar_uri: string;
    author_rights: AuthRightEnum;
    role_id: string;
  }>;
};

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

/**
 *
 * @param id: 消息id
 * @description 更新消息状态， 把已读改为未读
 */

export const updateAlterStatus = (id: number) =>
  request.post("alert/update", { id, status: 2 }) as Promise<unknown>;

/**
 *
 * @description 更新用户信息
 */

export const updateUser = (params: UpdateParams) =>
  request.post("user/update", params) as Promise<unknown>;
