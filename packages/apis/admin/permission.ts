import { request } from "utils";

export interface AdminRole {
  id: number;
  name: string;
  createTime: number;
}

export interface AddrRole {
  name: string;
}

export interface EditRoleParams {
  id: number;
  menu_id: string;
}

export interface RolePermission {
  id: number;
  role_name: string;
  menu_id: string;
}

/**
 *
 * @description 获取角色列表
 * @returns
 */

export const getRoleList = () =>
  request.get("role/list") as Promise<Array<AdminRole>>;

/**
 *
 *
 * @description 新增角色
 */
export const addRole = (params: AddrRole) =>
  request.post("role/add", params) as Promise<unknown>;

/**
 *
 * @description 获取角色菜单列表
 * @returns
 */

export const getRolePermission = (params: { id: number }) =>
  request.get("role/menu_list", params) as Promise<RolePermission>;

/**
 *
 *
 * @description 编辑角色
 */
export const editRole = (params: EditRoleParams) =>
  request.post("role/menu_update", params) as Promise<unknown>;
