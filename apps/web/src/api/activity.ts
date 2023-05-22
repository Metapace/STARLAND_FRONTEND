import { request } from 'src/utils/request';

interface ChanItem {
  image_url: string;
  chan: 1 | 2;
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
  crowd: number;
  age: number;
  price: number;
  materials_url: string;
  days: number;
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
export const createMaterial = (params: MaterialItem) => request.post('activity/create', params);
