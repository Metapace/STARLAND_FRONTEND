import { request } from "utils";

export enum FinanceDataEnum {
  Today = 1,
  Yesterday = 2,
  LastThreeDay = 3,
  LastWeek = 4,
  LastMonth = 5,
  LastHalfYear = 6,
}

export enum FinanceVerifyStatusEnum {
  PendingReview = 1,
  Passed = 2,
  Failed = 3,
  All = 4,
}

export enum MaterialItemVerifyStatusEnum {
  Pending = 0,
  Failed = 1,
  Passed = 2,
}
export enum GenderEnum {
  Male = "1",
  Female = "2",
  NotLimited = "3",
}

export enum AgeEnum {
  Ten = 1,
  Tweenty = 2,
  Thirty = 3,
  Fourty = 4,
  Fifty = 5,
  PlusFifty = 6,
  NotLimited = 7,
}

export interface FinanceVerifyListParams {
  date_type?: FinanceDataEnum;
  status?: FinanceVerifyStatusEnum;
  page_no?: number;
  page_size?: number;
}

export interface MaterialVerifyListParams {
  date_type?: FinanceDataEnum;
  page?: number;
  page_size?: number;
}

/**
 * user_type 1.个人；2.公司
 */
export interface FinanceVerifyListReturnItem {
  id: number;
  date: string;
  user_name: string;
  user_type: 1 | 2;
  amount: number;
  status: number;
  image_url: string;
  address: string;
  email: string;
  reg_number: string;
  license: string;
  remark: string;
}

export interface FinanceVerifyListReturn {
  num: number;
  list: Array<FinanceVerifyListReturnItem>;
}

export interface FinanceVerifyPostParams {
  recharge_id: number;
  amount?: number;
  status: "success" | "failure";
  remark?: string;
}

export interface MaterialVerifyPostParams {
  id: number;
  status: 1 | 2;
  reason?: string;
}

export const FinanceDataEnumMap: Record<FinanceDataEnum, string> = {
  [FinanceDataEnum.Today]: "今日",
  [FinanceDataEnum.Yesterday]: "昨天",
  [FinanceDataEnum.LastThreeDay]: "近三天",
  [FinanceDataEnum.LastWeek]: "近一周",
  [FinanceDataEnum.LastMonth]: "近一月",
  [FinanceDataEnum.LastHalfYear]: "近半年",
};

export const FinanceVerifyStatusEnumMap: Record<
  FinanceVerifyStatusEnum,
  string
> = {
  [FinanceVerifyStatusEnum.All]: "全部",
  [FinanceVerifyStatusEnum.Passed]: "审核通过",
  [FinanceVerifyStatusEnum.Failed]: "审核失败",
  [FinanceVerifyStatusEnum.PendingReview]: "待审核",
};

export interface MaterialListItem {
  id: number;
  user_id: number;
  chan: number;
  chan_list: string;
  billing_method: number;
  pay_method: number;
  country: string;
  lauguage: string;
  crowd: GenderEnum;
  age: string;
  start: number;
  end: number;
  days: number;
  price: string;
  status: number;
  deliver: MaterialItemVerifyStatusEnum;
  deliver_reason: string;
  deliver_time: number;
  design: MaterialItemVerifyStatusEnum;
  design_reason: string;
  design_time: number;
  materials_url: string;
  pay_time: number;
  create_time: number;
  end_time: number;
  update_time: number;
  email: string;
}

export interface MaterialVerifyListReturn {
  num: number;
  list: Array<MaterialListItem>;
}
/**
 *
 * @param 管理后台获取财务审核列表
 * @returns
 */

export const getFinanceVerifyList = (params: FinanceVerifyListParams) =>
  request.get(
    "admin/recharge/list",
    params
  ) as Promise<FinanceVerifyListReturn>;

/**
 *
 *
 * @description 管理后台获取财务审核
 */
export const reviewFinance = (params: FinanceVerifyPostParams) =>
  request.post("admin/recharge/verify", params) as Promise<unknown>;

/**
 *
 *
 * @description 管理后台获取物料审核列表
 */
export const getMaterialVerifyList = (params: MaterialVerifyListParams) =>
  request.post("admin/act/list", params) as Promise<MaterialVerifyListReturn>;

/**
 *
 *
 * @description 管理后台获取物料审核
 */
export const reviewMaterial = (params: MaterialVerifyPostParams) =>
  request.post("admin/activity/update", params) as Promise<unknown>;
