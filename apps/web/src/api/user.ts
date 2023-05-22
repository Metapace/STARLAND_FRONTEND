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
  request.get('user/get', {}) as Promise<{
    balance: number;
    available_balance: number;
    total_activity: number;
    running_activity: number;
  }>;
