import {
  reviewFinance,
  getFinanceVerifyList,
  FinanceVerifyListParams,
  getMaterialVerifyList,
  reviewMaterial,
  MaterialVerifyListParams,
} from "./api";
import { useQuery, useMutation } from "@tanstack/react-query";

/**
 *
 *
 * @description 获取审核列表
 */
export const useRequestFinanceVerifyList = (
  params: FinanceVerifyListParams
) => {
  const query = useQuery([`${JSON.stringify(params)}financeVerifyList`], () =>
    getFinanceVerifyList(params)
  );
  return query;
};

/**
 *
 *  @description 审核财务
 */
export const useMutationReviewFinance = () =>
  useMutation({
    mutationFn: reviewFinance,
  });

/**
 *
 *
 * @description 获取物料审核列表
 */
export const useRequestMaterialVerifyList = (
  params: MaterialVerifyListParams
) => {
  const query = useQuery([`${JSON.stringify(params)}MaterialVerifyList`], () =>
    getMaterialVerifyList(params)
  );
  return query;
};

/**
 *
 *  @description 审核物料
 */
export const useMutationReviewMaterial = () =>
  useMutation({
    mutationFn: reviewMaterial,
  });
