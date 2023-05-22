import { request } from 'src/utils/request';

/**
 *
 * @param email 邮箱
 * @description 邮箱发送验证码
 */
export const sendCodeRequest = (email: string) => request.post('user/email/send', { email });

/**
 *
 * @param email 邮箱
 * @param code 验证码
 * @description 邮箱验证码登录
 * @returns token
 */
export const loginRequest = (params: { email: string; code: string }) =>
  request.post('user/login1', params) as Promise<{ token: string }>;

/**
 *
 * @description 获取用户信息
 */
export const userInfoRequest = () => request.get('user/get', {}) as Promise<{ email: string }>;

/**
 *
 * @description 获取仪表盘的资产和活动数量
 */
export const dashBoardInfoRequest = () =>
  request.get('/user/dashboard/get', {}) as Promise<{
    balance: number;
    available_balance: number;
    total_activity: number;
    running_activity: number;
  }>;

/**
 *
 * @description 获取没有明细的投后数据
 * @params date_type number 10.所有的总值；4.近7日数据；
 * @returns data 时间
 * @returns impression 访问量
 * @returns click 点击量
 * @returns cost 花费成本
 *@returns ctr 点击率
 */
export const reportGet = (params: { date_type: number }) =>
  request.get('/report/get', params) as Promise<
    Array<{ data: string; impression: number; click: number; cost: number; ctr: number }>
  >;
