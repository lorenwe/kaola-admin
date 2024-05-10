import axios from "@/utils/tools/axios";
import { httpRequest } from "@/utils/tools/umiRequest";
import { IBasePaginationTemp, SysResponse } from "@/utils/types";

// 获取当前用户信息
export const UserInfo = () => httpRequest.get<USER.UserInfo>('/api/v1/user/info');


// 获取当前用户权限表
export const Permissions = () => httpRequest.get<USER.Permissions>('/api/v1/user/permissions');


// 获取用户列表
export const UserList = async () => {
  try {
    const { data } = await axios.get<SysResponse<IBasePaginationTemp<USER.UserInfo>>>('/api/v1/user/list');
    // console.log(data.data)
    return data.data?.list;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
};
