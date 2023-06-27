import { request } from "utils";

export interface AdminRole {
  id: number;
  name: string;
  createTime: number;
}

/**
 *
 * @description 获取角色列表
 * @returns
 */

export const getRoleList = () =>
  request.get("role/list") as Promise<Array<AdminRole>>;
