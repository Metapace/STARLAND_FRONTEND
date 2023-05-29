import {
  reviewFinance,
  getFinanceVerifyList,
  FinanceVerifyListParams,
} from "./api";
import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";

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
