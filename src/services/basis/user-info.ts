import type { IBasePagination, SysResponse } from '@/utils/types'
import axios from "@/utils/tools/axios";

// 获取当前登录用户信息
export const getUserInfo = async () => {
  try {
    const { data } = await axios.post<SysResponse<API.USERINFO>>('/adm/admin/user/info');
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

// 获取当前登录用户菜单
export const getUserMenu = async () => {
  try {
    const { data } = await axios.post<SysResponse<UserMenuDataItem[]>>('/adm/admin/user/menu');
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}


// 获取当前用户前端按钮权限表标识列表
export const getPermissions = async () => {
  try {
    const { data } = await axios.post<SysResponse<UserMenuDataItem[]>>('/adm/admin/user/permissions');
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}


// 获取用户列表
export const UserList = async () => {
  try {
    const { data } = await axios.get<SysResponse<IBasePagination<USER.UserInfo>>>('/api/v1/user/list');
    // console.log(data.data)
    return data.data?.list;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
};