
import type { SearchParams, CreateInternationalParams } from '@/utils/types/system/internationalization'


import axios from "@/utils/tools/axios";
import { SysResponse } from '@/utils/types';

// 获取国际化列表
export const getInternationalList = async (options?: SearchParams) => {
  try {
    const { data } = await axios.post<SysResponse<any>>('/adm/language/list', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

// 获取国际化多语言层级对象
export const getAllLocalesLang = async () => {
  try {
    const { data } = await axios.post<SysResponse<API.LOCALESLANGAll>>('/adm/language/allLocales');
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
};


/**
 * @description: 新增国际化数据
 * @param {CreateInternationalParams} options
 */
export const createInternational = async (options: CreateInternationalParams) => {
  try {
    const { data } = await axios.post<SysResponse>('/adm/language/add', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 更新国际化数据
 * @param {API.INTERNATIONALIZATION} options
 */
export const updateInternational = async ({ id, ...options }: API.INTERNATIONALIZATION) => {
  try {
    const { data } = await axios.post<SysResponse>('/adm/language/edit', { id, ...options });
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

/**
 * @description: 删除国际化数据
 * @param {string} id
 */
export const delInternational = async (id: string) => {
  try {
    const { data } = await axios.post<SysResponse>('/adm/language/del', { id });
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}