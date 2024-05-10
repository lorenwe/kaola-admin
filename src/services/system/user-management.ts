import type { IBasePagination, SysResponse } from '@/utils/types'
import type { SearchParams, UserStatusProps } from '@/utils/types/system/user-management'
import axios from "@/utils/tools/axios";

/**
 * @description:  获取用户列表
 * @param {SearchParams} options
 */
export const getUserList = async (options?: SearchParams) => {
  try {
    const { data } = await axios.post<SysResponse<IBasePagination<API.USERMANAGEMENT>>>('/adm/admin/user/list', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 新增用户数据
 * @param {API.USERMANAGEMENT} options
 */
export const createUser = async (options: API.USERMANAGEMENT) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/admin/user/add', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 更新用户数据
 * @param {API.USERMANAGEMENT} options
 */
export const updateUser = async (options: Partial<API.USERMANAGEMENT>) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/admin/user/edit', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 删除用户数据
 * @param {string} user_id
 */
export const delUser = async (user_id: string) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/admin/user/del', {id:user_id});
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 设置用户状态
 * @param {Data} options
 */
export const setUserStatus = async ({ id, status }: UserStatusProps) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/admin/user/state', {id, status});
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}