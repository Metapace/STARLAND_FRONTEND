import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";
import {
  getCountryList,
  getLanguageList,
  getChanList,
  createMaterial,
  getActivityList,
  updateActivity,
  getActivityById,
  reLaunchActivity,
  getActivityListBystatus,
  getActivityListBystatusRequestParams,
} from "./api";

/**
 *
 * @description 获取国家
 */
const useRequestCountry = (ty: 1 | 2) =>
  useQuery([`country${ty}`], () => getCountryList({ ty }));

/**
 *
 * @description 获取语言
 */
const useRequestLanguage = (ty: 1 | 2) =>
  useQuery([`language${ty}`], () => getLanguageList({ ty }));

/**
 *
 * @description  获取渠道列表
 */
const useRequestChanne = () => useQuery(["Chan"], () => getChanList());

/**
 *
 *  @description 创建物料接口
 */
const useMutationCreateMaterial = () =>
  useMutation({
    mutationFn: createMaterial,
  });

/**
 *
 * @description  获取需求列表
 */
const useRequestActivity = () =>
  useQuery(["activity"], () => getActivityList());

/**
 *
 *  @description 更新物料接口
 */
const useMutationUpdateMaterial = () =>
  useMutation({
    mutationFn: updateActivity,
  });

/**
 *
 *  @description 更新物料接口
 */
/**
 *
 * @description  根据Id获取需求信息
 */
const useRequestActivityById = (id: number) =>
  useQuery([`activityById${id}`], () => getActivityById(id));

/**
 * @description 重新发布
 */

const useMutationRelaunch = () =>
  useMutation({
    mutationFn: reLaunchActivity,
  });

const useRequestActivityByStatus = (
  params: getActivityListBystatusRequestParams
) =>
  useQuery(
    [
      `getActivityListBystatus${params.page}${params.page_size}${params.action}`,
    ],
    () => getActivityListBystatus(params),
    {
      staleTime: 0,
    }
  );

export {
  useRequestCountry,
  useRequestLanguage,
  useRequestChanne,
  useMutationCreateMaterial,
  useRequestActivity,
  useMutationUpdateMaterial,
  useRequestActivityById,
  useMutationRelaunch,
  useRequestActivityByStatus,
};
