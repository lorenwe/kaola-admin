import type { SearchParams } from '@/utils/types/system/menu-management'
import { httpRequest } from '@/utils/tools/umiRequest'
import { IBasePagination, SysResponse } from '@/utils/types';
import axios from "@/utils/tools/axios";

// 获取菜单列表
export const getMenuList = async (options?: SearchParams) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/menu/list', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

// 更新菜单数据
export const updateMenu = async (options: API.MENUMANAGEMENT) => {
  try {
    console.log(options)
    const { data } = await axios.post<SysResponse<any>>('/adm/menu/edit', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

// 新增菜单数据
export const createMenu = async (options: Partial<API.MENUMANAGEMENT>) => {
  try {
    console.log(options)
    const { data } = await axios.post<SysResponse<any>>('/adm/menu/add', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

// 删除菜单数据
export const delMenu = async (id: string): Promise<SysResponse<any>> => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/menu/del', { id }).then(res => res);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}
