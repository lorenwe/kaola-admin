import axios from "@/utils/tools/axios";
import { SysResponse } from '@/utils/types';

// 用户退出登录
export const Logout = async () => {
  await axios.post<any>('/adm/logout');
  try {
    const { data } = await axios.post<SysResponse>('/adm/logout');
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}

// 用户登录
export const Login = async (options:LOGIC.LoginParams) => {
  try {
    const { data } = await axios.post<SysResponse<USER.UserInfo>>('/adm/login', options);
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
};

// 用户密码验证
export const CheckPwd = async (password:string) => {
  try {
    const { data } = await axios.post<SysResponse>('/adm/check/pwd', {password});
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
};
