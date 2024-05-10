import umiRequest, { httpRequest } from '@/utils/tools/umiRequest'
import { RouterTypes } from '@/utils/types';

/**
 * @description: 用户路由
 */
export const UserRouters = ():Promise<RouterTypes[]> => {
  return httpRequest.get<RouterTypes[]>('/api/v1/router', [], umiRequest).then();
};

