import { ANNOUNCEMENT_TYPE, FLAG, LANGS, STATUS } from "../enums";
import type { Settings as LayoutSettings } from '@ant-design/pro-components';


//全局状态数据流
export type InitialStateTypes = {
  access_token?: string;
  current_user?: USER.UserInfo;
  permissions?: string[];
  user_menu?: UserMenuDataItem[];
  collapsed?: boolean;
  settings?: Partial<LayoutSettings>;
}


//用户休眠
export type LockSleepTypes = {
  last_time: number;
  isSleep: boolean;
}


//Response 返回体
export type Response<T = any> = {
  errno?: number;
  errmsg?: string;
  data?: T;
};

//自定义后端接口 Response 返回体
export type SysResponse<T = any> = {
  code?: number;
  message?: string;
  data?: T;
};

//自定义后端分页返回体结构
export interface IBasePagination<T> {
  list: T[],
  current_page: number,
  page_size: number,
  pages: number,
  total: number
}

export interface IBasePaginationTemp<T> {
  list: T[],
}


// 默认分页查询参数
export type PaginationParams = {
  page: number;      // 当前页码
  page_size: number; // 每页条数
}


// 状态
export type Status = EnumValues<typeof STATUS>


// 公共的类型
export type CommonTypes = {
  status: Status;    // 状态
  sort: number;      // 排序
  create_by: string; // 创建人
  update_by: string; // 更新人
  delete_at: number; // 删除时间
}

// 查询时间
export type SearchTimes = {
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}



//创建和更新时间
export type TableTimes = {
  create_at: string; // 创建时间
  update_at: string; // 最后一次更新时间
}


//路由数据结构
export type RouterTypes = {
  name?: string;
  exact?: boolean;
  component?: (string | undefined);
  layout?: (false | undefined);
  path?: (string | undefined);
  redirect?: (string | undefined);
  wrappers?: (Array<string> | undefined);
  routes?: RouterTypes[] | undefined;
  children?: RouterTypes[] | undefined;
  element?: JSX.Element;
  access?: string;
}

export type RouteItem = {
  component?: (string | undefined);
  path?: string;
  name?: string;
  icon?: string;
  id?: number | string;
  parentId?: number | string;
  element?: JSX.Element;
  children?: RouteItem[];
}

// 是否
export type Flag = EnumValues<typeof FLAG>

// 语言类型
export type Langs = EnumValues<typeof LANGS>

// 获取枚举的所有 key
export type EnumKeys<T> = keyof T;

// 获取枚举的所有可能值
export type EnumValues<T> = T[EnumKeys<T>];

// 公告类型
export type AnnouncementType = EnumValues<typeof ANNOUNCEMENT_TYPE>