import { transactionInfoRequest } from "./api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

// 充值记录
export const useRequestTransactionsInfo = () => {
  const query = useQuery(["transactionsinfo"], () => transactionInfoRequest());
  return query;
};
