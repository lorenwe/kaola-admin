
import type { PaginationParams, SearchTimes } from '@/utils/types'
import { FormInstance } from '@ant-design/pro-components';
import { MutableRefObject } from 'react';

// 头部搜索表单 Params
export type SearchParams = PaginationParams & SearchTimes & Partial<Pick<API.USERMANAGEMENT, 'username' | 'sex' | 'status'>>



// 设置用户状态 Props
export type UserStatusProps = Pick<API.USERMANAGEMENT, 'id' | 'status'>


// FormTemplate Props
export type FormTemplateProps = {
  reloadTable: () => void;
  setModalVisibleFalse: () => void;
  modalVisible: boolean;
  stepFormMapRef: MutableRefObject<MutableRefObject<FormInstance<any> | undefined>[]>;
};


// UserInformation Props
export type UserInformationProps = {
  showLabel?: boolean;
  disabledField?: boolean
};