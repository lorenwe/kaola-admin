import type { IBasePagination, SysResponse } from '@/utils/types'
import type { SearchParams, ApiStatusProps } from '@/utils/types/system/api-management'
import axios from "@/utils/tools/axios";

/**
 * @description:  获取接口列表
 * @param {SearchParams} options
 */
export const getApiList = async (options?: SearchParams) => {
  try {
    const { data } = await axios.post<SysResponse<IBasePagination<API.APIMANAGEMENT>>>('/adm/admin/api/list', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 新增接口数据
 * @param {API.APIMANAGEMENT} options
 */
export const createApi = async (options: API.APIMANAGEMENT) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/admin/api/add', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 更新接口数据
 * @param {API.APIMANAGEMENT} options
 */
export const updateApi = async (options: Partial<API.APIMANAGEMENT>) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/admin/api/edit', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 删除接口数据
 * @param {string} user_id
 */
export const delApi = async (user_id: string) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/admin/api/del', {id:user_id});
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 设置接口状态
 * @param {Data} options
 */
export const setApiStatus = async ({ id, status }: ApiStatusProps) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/admin/api/state', {id, status});
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}