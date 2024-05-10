import { MENU_TYPE, LAYOUT_TYPE, MENU_THEME, TARGET_TYPE } from "@/utils/enums";
import { EnumValues, SearchTimes } from "../index";


// 头部搜索表单 Params
export type SearchParams = {
  is_role?: boolean; // 是否是角色权限
} & SearchTimes & Partial<Pick<API.MENUMANAGEMENT, 'menu_type' | 'status'>>

// 菜单类型
export type MenuTypes = EnumValues<typeof MENU_TYPE>


// 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
export type LayoutTypes = EnumValues<typeof LAYOUT_TYPE>

// 主题风格
export type MenuTheme = EnumValues<typeof MENU_THEME>

// 窗口打开方式
export type TargetTypes = EnumValues<typeof TARGET_TYPE>

// FormTemplate Props
export type FormTemplateProps = {
  treeData: API.MENUMANAGEMENT[]; // 菜单树形数据
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void;
};