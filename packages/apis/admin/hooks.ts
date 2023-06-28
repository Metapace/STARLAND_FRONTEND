import {
  reviewFinance,
  getFinanceVerifyList,
  FinanceVerifyListParams,
  getMaterialVerifyList,
  reviewDeliverMaterial,
  reviewDesignMaterial,
  MaterialVerifyListParams,
  getAdminCountryList,
  getAdminLanguageList,
  uodateMaterialStatus,
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
 *  @description 投放部审核物料
 */
export const useMutationDeliverReviewMaterial = () =>
  useMutation({
    mutationFn: reviewDeliverMaterial,
  });

/**
 *
 *  @description 投放部审核物料
 */
export const useMutationDesignReviewMaterial = () =>
  useMutation({
    mutationFn: reviewDesignMaterial,
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

/**
 * @description 获取用户列表
 *
 */
export const useRequestUserList = (enabled = false) => {
  const query = useQuery(["User-list"], () => permission.getUserList(), {
    enabled,
  });
  return query;
};

/**
 * @description 获取用户权限列表
 *
 */
export const useRequestUserPermissionList = () => {
  const query = useQuery(["User-permission-list"], () =>
    permission.getUserPermission()
  );
  return query;
};

/**
 *
 *  @description 新增用户
 */
export const useMutationAddUser = () =>
  useMutation({
    mutationFn: permission.addUser,
  });

/**
 *
 *  @description 更改用户角色
 */
export const useMutationEditUserRole = () =>
  useMutation({
    mutationFn: permission.UpdataUserRole,
  });

/**
 *
 *  @description 更改用户状态
 */
export const useMutationEditUserStatus = () =>
  useMutation({
    mutationFn: permission.UpdataUserStatus,
  });

/**
 * @description 获取国家列表
 *
 */
export const useRequestAdminCountryList = () => {
  const query = useQuery(["country-list"], () => getAdminCountryList());
  return query;
};

/**
 * @description 获取语言列表
 *
 */
export const useRequestAdminLanuageList = () => {
  const query = useQuery(["Lanuage-list"], () => getAdminLanguageList());
  return query;
};

/**
 *
 *  @description 更改物料投放状态
 */
export const useMutationMaterialStatus = () =>
  useMutation({
    mutationFn: uodateMaterialStatus,
  });
