import { SearchTimes } from "..";

// FormTemplate Props
export type FormTemplateProps = {
  treeData: API.INTERNATIONALIZATION[]; // 国际化树形数据
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void
};

type orderBy = [
  string[],
]

// 头部搜索表单 Params
export type SearchParams = SearchTimes & Partial<Pick<any, 'name'> & {
  order_by?: orderBy;
  is_menu?: boolean; // 是否是菜单数据
}>

// 新增国际化字段 Params
export type CreateInternationalParams = Pick<any, 'parent_id' | 'name' | 'sort'>
  & Partial<API.LOCALESLANGAll>

