import { request } from "utils";

export enum UserStatus {
  Normal = 0,
  Forbidden = 1,
}

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

export interface UserListItem {
  user_id: number;
  account: string;
  name: string;
  role_name: Array<string>;
  role_id: Array<number>;
  status: UserStatus;
  create_time: string;
}

export interface AddUser {
  account: string;
  name: string;
  password: string;
  password_confirm: string;
  role_id: string;
}

export interface UpdataUserRole {
  user_id: number;
  role_id: string;
}

export interface UpdataUserStatus {
  user_id: number;
  status: UserStatus;
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

/**
 *
 * @description 获取所有用户
 * @returns
 */

export const getUserList = () =>
  request.get("user/list").then((res: any) => res?.list) as Promise<
    Array<UserListItem>
  >;

/**
 *
 *
 * @description 新增用户
 */
export const addUser = (params: AddUser) =>
  request.post("user/regist", params) as Promise<unknown>;

/**
 *
 *
 * @description 更改用户角色
 */
export const UpdataUserRole = (params: UpdataUserRole) =>
  request.post("user/update_role", params) as Promise<unknown>;

/**
 *
 *
 * @description 更改用户状态
 */
export const UpdataUserStatus = (params: UpdataUserStatus) =>
  request.post("user/update_status", params) as Promise<unknown>;

/**
 *
 * @description 获取用户菜单权限
 * @returns
 */

export const getUserPermission = () =>
  request.get("user/menu_list") as Promise<Array<UserListItem>>;
