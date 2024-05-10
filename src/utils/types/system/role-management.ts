import type { PaginationParams, SearchTimes } from '@/utils/types'

// FormTemplate Props
export type FormTemplateProps = {
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void
};

// FormTemplate Props
export type FormTemplateItemProps = {
  menuData: API.MENUMANAGEMENT[]
};

// 头部搜索表单 Params
export type SearchParams = PaginationParams &
  SearchTimes & Partial<Pick<API.ROLEMANAGEMENT, 'role_name' | 'role_code' | 'status'>>

// 设置角色状态 Params
export type RoleStatusParams = Pick<API.ROLEMANAGEMENT, 'id' | 'status'>
