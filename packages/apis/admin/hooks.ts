import {
  reviewFinance,
  getFinanceVerifyList,
  FinanceVerifyListParams,
  getMaterialVerifyList,
  reviewMaterial,
  MaterialVerifyListParams,
} from "./api";
import * as permission from "./permission";
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

/**
 * @description 获取角色列表
 *
 */
export const useRequestRoleList = () => {
  const query = useQuery(["role-list"], () => permission.getRoleList());
  return query;
};

/**
 *
 *  @description 新增角色
 */
export const useMutationAddRole = () =>
  useMutation({
    mutationFn: permission.addRole,
  });

/**
 * @description 获取角色权限
 *
 */
export const useRequestRolePermission = (params: { id: number }) => {
  const query = useQuery([`role-permission${params.id}`], () =>
    permission.getRolePermission(params)
  );
  return query;
};

/**
 *
 *  @description 编辑角色
 */
export const useMutationEditRole = () =>
  useMutation({
    mutationFn: permission.editRole,
  });
