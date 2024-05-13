import type { TableTimes, CommonTypes, Langs, Flag } from '@/utils/types'
import { ANNOUNCEMENT_TYPE } from '@/utils/enums'
import type { LayoutTypes, MenuTheme, MenuTypes, TargetTypes } from '@/utils/types/system/menu-management'
import type { ApiTypes, ApiMethodTypes } from '@/utils/types/system/api-management'
import { MenuDataItem } from '@ant-design/pro-components';

declare global {
  interface Window {
    dynamic_route: any;
    dynamicRoutes: DynamicRoutes.RouteRaw[];
  }

  type UserMenuDataItem = {
    id: string; // 菜单id
    menu_id: string; // 菜单id
    name: string; // 国际化对应的name
    path: string; // 路由url
    icon?: string; // 菜单图标
    component?: string; // 菜单对应的文件路径
    redirect?: string; // 路由重定向地址
    target?: TargetTypes; // 当path是一个url，点击新窗口打开
    permission?: string; // 菜单标识(页面按钮权限控制)
    layout?: LayoutTypes; // 是否显示layout布局
    navTheme?: MenuTheme; // 导航菜单的主题
    headerTheme?: MenuTheme; // 顶部导航的主题，mix 模式生效
    hideChildrenInMenu: Flag; // 是否隐藏子路由
    hideInMenu: Flag; // 是否隐藏菜单，包括子路由
    hideInBreadcrumb: Flag; // 是否在面包屑中隐藏
    headerRender: Flag; // 是否显示顶栏
    footerRender: Flag; // 是否显示页脚
    menuRender: Flag; // 当前路由是否展示菜单
    menuHeaderRender: Flag; // 当前路由是否展示菜单顶栏
    flatMenu: Flag; // 子项往上提，只是不展示父菜单
    fixedHeader: Flag; // 固定顶栏
    fixSiderbar: Flag; // 固定菜单
    routes?: UserMenuDataItem[];
    children?: UserMenuDataItem[];
  } & TableTimes & LOCALESLANGAll & CommonTypes;

  namespace API {
    // 国际化多语言层级对象
    type LOCALESLANGAll = Record<Langs, string>
    
    // 系统设置-用户管理
    type USERMANAGEMENT = {
      id?: string; // 用户id
      user_id: string; // 用户id
      username: string; // 用户名称
      nickname: string; // 用户昵称
      age: number; // 年龄
      phone: string; // 电话号码
      avatar: string; // 头像地址
      sex: string; // 用户性别
      motto: string; // 座右铭
      tags: string[]; // 人物标签
      city?: string[]; // 所属城市
      address?: string; // 详细地址
      login_num?: number; // 登录次数
      login_last_ip?: string; // 最后一次登录ip
      login_last_time?: Date; // 最后一次登录时间
    } & TableTimes & Omit<CommonTypes, 'status', 'sort'>;

    // 系统设置-菜单管理
    type MENUMANAGEMENT = {
      parent_id?: string; // 父级id
      id: string; // 菜单id
      menu_id: string; // 菜单id
      name: string; // 国际化对应的name
      language_id: string; // 国际化对应的id
      menu_type: MenuTypes; // 菜单类型
      menu_api: string; // 菜单依赖接口
      path?: string; // 路由url
      icon?: string; // 菜单图标
      component?: string; // 菜单对应的文件路径
      redirect?: string; // 路由重定向地址
      target?: TargetTypes; // 当path是一个url，点击新窗口打开
      permission?: string; // 菜单标识(页面按钮权限控制)
      layout?: LayoutTypes; // 是否显示layout布局
      navTheme?: MenuTheme; // 导航菜单的主题
      headerTheme?: MenuTheme; // 顶部导航的主题，mix 模式生效
      hideChildrenInMenu: Flag; // 是否隐藏子路由
      hideInMenu: Flag; // 是否隐藏菜单，包括子路由
      hideInBreadcrumb: Flag; // 是否在面包屑中隐藏
      headerRender: Flag; // 是否显示顶栏
      footerRender: Flag; // 是否显示页脚
      menuRender: Flag; // 当前路由是否展示菜单
      menuHeaderRender: Flag; // 当前路由是否展示菜单顶栏
      flatMenu: Flag; // 子项往上提，只是不展示父菜单
      fixedHeader: Flag; // 固定顶栏
      fixSiderbar: Flag; // 固定菜单
      routes?: MENUMANAGEMENT[];
      children?: MENUMANAGEMENT[];
    } & TableTimes & LOCALESLANGAll & CommonTypes;

    // 系统设置-角色管理
    type ROLEMANAGEMENT = {
      id: string; // 角色id
      role_id?: string; // 角色id
      role_name: string; // 角色名称
      role_code: string; // 角色编码
      role_menu: number[]; // 菜单权限
    } & TableTimes & CommonTypes;

    // 系统设置-国际化
    type INTERNATIONALIZATION = TableTimes & {
      id: string;
      name: string;
      children?: INTERNATIONALIZATION[];
    } & LOCALESLANGAll & Pick<CommonTypes, 'parent_id' | 'sort'>;

    // 系统设置-接口管理
    type APIMANAGEMENT = {
      id: string; //id
      parent_id: string; // 父级id
      api_name: string; // 接口名称
      api_type: ApiTypes; // 类型(目录 dir 接口 api)
      api_path: string; // 接口路径
      method: ApiMethodTypes; // 接口请求方式
    } & TableTimes & CommonTypes;




    
    // 智能行政-活动公告
    type ANNOUNCEMENT = TableTimes & {
      announcement_id: string; // id 主键
      title: string; // 标题
      content: string; // 正文内容
      type: AnnouncementType; // 类型
      pinned: Flag; // 是否置顶
      read_counts: number; // 阅读次数
      already: Flag; // 是否已读
    } & Pick<USERMANAGEMENT, 'user_id' | 'avatar_url' | 'cn_name'> & Pick<CommonTypes, 'status'>

    // 公告类型
    type AnnouncementType = EnumValues<typeof ANNOUNCEMENT_TYPE>

  }
}