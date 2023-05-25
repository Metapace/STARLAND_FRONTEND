import { transactionInfoRequest, updateVoucher } from "./api";
import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";

// 充值记录
export const useRequestTransactionsInfo = () => {
  const query = useQuery(["transactionsinfo"], () => transactionInfoRequest());
  return query;
};

/**
 *
 *  @description 更新物料接口
 */
export const useMutationUploadVoucher = () =>
  useMutation({
    mutationFn: updateVoucher,
  });
