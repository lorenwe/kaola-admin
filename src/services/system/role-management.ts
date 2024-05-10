// 系统设置-角色管理-API
import { ROUTES } from '@/utils/enums'
import type { SysResponse, IBasePagination } from '@/utils/types'
import type { RoleStatusParams, SearchParams } from '@/utils/types/system/role-management'
import axios from "@/utils/tools/axios";

const baseURL = ROUTES.ROLEMANAGEMENT

/**
 * @description:  获取角色列表
 * @param {SearchParams} options
 */
export const getRoleList = async (options?: SearchParams) => {
  try {
    const { data } = await axios.post<SysResponse<IBasePagination<API.ROLEMANAGEMENT>>>('/adm/role/list', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 新增角色数据
 * @param {API.ROLEMANAGEMENT} options
 */
export const createRole = async (options: API.ROLEMANAGEMENT) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/role/add', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 更新角色数据
 * @param {API.ROLEMANAGEMENT} options
 */
export const updateRole = async (options: API.ROLEMANAGEMENT) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/role/edit', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 删除角色数据
 * @param {string} role_id
 */
export const delRole = async (role_id: string) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/role/del', {id:role_id});
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 设置角色状态
 * @param {Data} options
 */
export const setRoleStatus = async ({ id, status }: RoleStatusParams) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/role/state', {id, status});
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}
