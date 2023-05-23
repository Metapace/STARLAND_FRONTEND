import { request } from 'src/utils/request';

export enum ChannelType {
  WEB2 = 1,
  WEB3 = 2,
}
interface ChanItem {
  image_url: string;
  chan: ChannelType;
  price: string;
  amount: number;
  id: number;
}

export interface MaterialItem {
  chan: number;
  billing: number;
  pay: number;
  country: string;
  lauguage: string;
  crowd: string;
  age: number;
  price: number;
  materials_url: string;
  days: number;
}
export enum DemandType {
  All = 0,
  NeedDeposite = 1,
  NeedPay = 2,
  NeedVerify = 3,
  VerifyFail = 4,
  Channel = 5,
  Going = 6,
  Finished = 7,
}

/**
 * @description status 0:全部 1:待充值 2:待授权 3:待审核 4:审核失败 5:渠道分发 6:投放中 7:已结束
 */
export interface AllMaterialItem extends Partial<MaterialItem> {
  id: number;
  status?: DemandType;
  pay_time?: number;
  reason?: string;
}

export interface ReturnRemandItem {
  id: number;
  user_id: number;
  chan: ChannelType;
  chan_list: string;
  billing_method: number;
  pay_method: number;
  country: string;
  lauguage: string;
  crowd: string;
  age: number;
  start: number;
  end: number;
  price: string;
  status: DemandType;
  deliver: number;
  deliver_reason: string;
  deliver_time: number;
  design: number;
  design_reason: string;
  design_time: number;
  materials_url: string;
  pay_time: number;
  create_time: number;
  end_time: number;
  update_time: number;
}

/**
 *
 * @description 获取所有国家和地区
 * @param ty number 1: 中文；2.英文；
 */

export const getCountryList = (params: { ty: 1 | 2 }) => request.post('country', params) as Promise<Array<string>>;

/**
 *
 * @description 获取语言列表
 * @param ty number 1: 中文；2.英文；
 */

export const getLanguageList = (params: { ty: 1 | 2 }) => request.post('language', params) as Promise<Array<string>>;

/**
 *
 * @description 获取渠道列表
 *
 */

export const getChanList = () => request.get('chan/list', {}) as Promise<Array<ChanItem>>;

/**
 *
 * @param MaterialItem
 * @description 创建物料
 */
export const createMaterial = (params: MaterialItem) => request.post('activity/create', params) as Promise<number>;

/**
 *
 * @description 获取投放列表
 *
 */

export const getActivityList = () => request.get('activity/list', {}) as Promise<Array<ReturnRemandItem>>;

/**
 *
 * @param AllMaterialItem
 * @description 更新需求信息
 */
export const updateActivity = (params: AllMaterialItem) => request.post('activity/update', params) as Promise<unknown>;

/**
 *
 * @description 根据id获取投放
 *
 */

export const getActivityById = (id: number) => request.get('activity/get', { id }) as Promise<ReturnRemandItem>;
