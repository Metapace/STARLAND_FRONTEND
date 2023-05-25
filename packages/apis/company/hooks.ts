import { companyInfoRequest, minInAmountRequest } from "./api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

// 公司信息获取
export const useRequestCompanyInfo = () => {
  const query = useQuery(["companyinfo"], () => companyInfoRequest());
  return query;
};

export const useRequestMinInAmount = () => {
  const query = useQuery(["minInAmount"], () => minInAmountRequest());
  return query;
};
