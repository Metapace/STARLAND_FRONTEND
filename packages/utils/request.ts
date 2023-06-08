/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { Message } from "@arco-design/web-react";
import { getLocalToken, removeLocalToken } from "./localStorage";

const baseURL = process.env.VITE_base_url;

const timeout = 30000;
const service = axios.create({
  timeout,
  baseURL,
  withCredentials: false,
});

// 统一请求拦截 可配置自定义headers 例如 language、token等
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 配置自定义请求头
    const token = getLocalToken() || "";
    let customHeaders: AxiosRequestHeaders = {
      token: token ? JSON.parse(token) : "",
    };
    config.headers = customHeaders;
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// axios返回格式
interface axiosTypes<T> {
  data: T;
  status: number;
  statusText: string;
}

interface responseTypes<T> {
  code: number;
  msg: string;
  data: T;
}

// 核心处理代码 将返回一个promise 调用then将可获取响应的业务数据
const requestHandler = <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  params: object = {},
  config: AxiosRequestConfig = {}
): Promise<T> => {
  let response: Promise<axiosTypes<responseTypes<T>>>;
  switch (method) {
    case "get":
      response = service.get(url, { params: { ...params }, ...config });
      break;
    case "post":
      response = service.post(url, { ...params }, { ...config });
      break;
    case "put":
      response = service.put(url, { ...params }, { ...config });
      break;
    case "delete":
      response = service.delete(url, { params: { ...params }, ...config });
      break;
  }

  return new Promise<T>((resolve, reject) => {
    response
      .then((res) => {
        const data = res.data;
        if (data.code !== 200) {
          if (data.code == 10004) {
            removeLocalToken();
            Message.warning("您的账号已登出或超时，即将登出...");
            window.location.reload();
          }
          const token = getLocalToken() || "";
          let e = JSON.stringify(data);
          if (method === "post" && token) {
            Message.error(data.msg);
          }
          console.log(`请求错误：${e}`);
          // 数据请求错误 使用reject将错误返回
          reject(data);
        } else {
          // 数据请求正确 使用resolve将结果返回
          resolve(data.data);
        }
      })
      .catch((error) => {
        if (method === "post") {
          Message.warning(`network is busy, please try again later!`);
        }
        reject(error);
      });
  });
};

// 使用 request 统一调用，包括封装的get、post方法
const request = {
  get: <T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ) => requestHandler<T>("get", url, params, config),
  post: <T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ) => requestHandler<T>("post", url, params, config),
};

export { request };
