import { API_METHOD_TYPE, API_TYPE } from "@/utils/enums";
import { EnumValues, SearchTimes } from "../index";

type orderBy = [
  string[],
]

// 头部搜索表单 Params
export type SearchParams = {
  order_by?: orderBy;
} & SearchTimes & Partial<Pick<API.APIMANAGEMENT, 'api_name'| 'api_type' | 'api_path' | 'method' | 'status'>>

// 设置接口状态 Props
export type ApiStatusProps = Pick<API.APIMANAGEMENT, 'id' | 'status'>

// 接口类型
export type ApiTypes = EnumValues<typeof API_TYPE>

// 请求方式
export type ApiMethodTypes = EnumValues<typeof API_METHOD_TYPE>

// FormTemplate Props
export type FormTemplateProps = {
  treeData: API.APIMANAGEMENT[]; // 菜单树形数据
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void;
};