import umiRequest, { httpRequest } from '@/utils/tools/umiRequest'
import { MenuDataItem } from '@ant-design/pro-components';
import type { Response, SysResponse } from '@/utils/types'

import axios from "@/utils/tools/axios";


// 用户菜单
// export const UserMenus = ():Promise<USER.MenuInfo> => {
//   return httpRequest.get<MenuDataItem[]>('/api/v1/menus', [], umiRequest).then();
// };

// 用户菜单
export const UserMenus = async () => {
  try {
    const { data } = await axios.post<SysResponse<UserMenuDataItem[]>>('/adm/menu');
    return data;
  } catch (err) {
    console.error('错误拦截', err);
    throw err;
  }
}
