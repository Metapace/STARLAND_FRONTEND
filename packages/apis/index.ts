export * from "./user/api";
export * from "./user/hooks";
export * from "./activity/api";
export * from "./activity/hooks";
export * from "./company/api";
export * from "./company/hooks";
export * from "./asset/api";
export * from "./asset/hooks";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //  1 分钟内相同的接口不会重新请求
      staleTime: 1 * 60 * 1000,
      retry: 0,
    },
  },
});
export const QueryClientProviders = QueryClientProvider;
export const useConsoel = () => {
  useEffect(() => console.log(111111), []);
};
