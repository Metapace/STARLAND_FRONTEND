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

export interface FinanceVerifyListParams {
  date_type?: FinanceDataEnum;
  status?: FinanceVerifyStatusEnum;
  page_no?: number;
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
}

export interface FinanceVerifyListReturn {
  num: number;
  list: Array<FinanceVerifyListReturnItem>;
}

export interface FinanceVerifyPostParams {
  recharge_id: number;
  amount: number;
  status: "success" | "failure";
  remark: string;
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
