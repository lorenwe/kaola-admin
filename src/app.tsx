// 运行时配置
import { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history, RequestConfig } from '@umijs/max';
import { assign, eq, forEach, get, isEmpty, isNil } from 'lodash-es'
import { BasiLayout } from '@/components/BasiLayout'; // 全局 layout 布局
import defaultSettings from './../config/defaultSettings';
import { getLocalStorageItem, initUserAuthority, setLocalStorageItem } from './utils/tools';
import { LOCAL_STORAGE, ROUTES } from './utils/enums';
import type { InitialStateTypes, Langs } from './utils/types';
import umiRequest from './utils/tools/umiRequest';
import TabsLayout, { TabsLayoutProps } from './components/TableLayout';
import { getAllLocalesLang } from './services/system/internationalization';
import { addLocale } from '@umijs/max';
import { ANTD_LANGS } from './utils/const';



// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
export async function getInitialState():Promise<InitialStateTypes> {
  // console.log("执行getInitialState")
  // 获取 LAYOUT 的值
  const Layout_Settings = getLocalStorageItem<LayoutSettings>(LOCAL_STORAGE.LAYOUT) || defaultSettings;
  // 获取 ACCESS_TOKEN
  const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN) || undefined;
  // 存储到 localstorage
  setLocalStorageItem(LOCAL_STORAGE.LAYOUT, Layout_Settings)
  // 初始化多语言
  const Locales = get(await getAllLocalesLang(), 'data', {})
  // 动态添加多语言
  if (!isEmpty(Locales) && !isNil(Locales)) {
    forEach(Locales, (value: Record<string, string>, key: string) => {
      addLocale(key, value, ANTD_LANGS[key as Langs]);
    })
  }

  // 初始化数据
  const initialState: InitialStateTypes = {
    access_token: ACCESS_TOKEN,
    collapsed: false,
  }
  // 判断是否登录，没有登录跳转到登录页
  if (!ACCESS_TOKEN) {
    history.push(ROUTES.LOGIN);
    return initialState
  }
  // 判断在登录页是否已登录，已登录则跳转主页
  if (eq(location.pathname, ROUTES.LOGIN) && ACCESS_TOKEN) {
    history.push('/');
  }
  // 如果不是登录页面，执行
  if (!eq(location.pathname, ROUTES.LOGIN)) {
    const result = await initUserAuthority()
    // console.log("InitialState", assign(initialState, result))
    // 初始化全局状态
    return assign(initialState, result)
  }
  return initialState
}

// 全局 lyout 布局
export const layout = BasiLayout

// export function patchRoutes({ routes, routeComponents }:any) {
//   console.log("执行patchRoutes")
//   // console.log("打印数据", window.dynamic_route)
// }

// export function patchClientRoutes({ routes }:any) {
//   console.log("执行patchClientRoutes");
//   //console.log("routes数据", routes)
//   //console.log("后端路由", window.dynamic_route)
//   //const routerIndex = routes.findIndex((item: RouteItem) => item.path === '/')
//   //const parentId = routes[routerIndex].id
//   //console.log("routes组装", routerIndex, parentId)
//   //console.log("routerIndex组装", routes[routerIndex])
//   // if (window.dynamic_route) {
//   //   routes[routerIndex]['routes'].unshift(
//   //     ...loopRouteItem(window.dynamic_route)
//   //   )
//   //   // console.log("routes组装后数据", routes)
//   // }
//   // // 添加根路径跳转到首页
//   // routes.unshift({
//   //   path: '/',
//   //   element: <Navigate to="/home" replace />,
//   // });
//   // 添加未知路由跳转到404
//   // routes.push({
//   //   path: '*',
//   //   layout: false,
//   //   element: <NoFoundPage />,
//   // });
// }

// export function render(oldRender: () => void) {
//   console.log("执行render")
//   oldRender()
// }

// request 配置，可以配置错误处理
export const request: RequestConfig = umiRequest


// 完全覆盖内置的多 Tabs 组件，需要搭配配置 hasCustomTabs:true 使用。doc https://alitajs.com/zh-CN/docs/guides/tabs#getcustomtabs
export const getCustomTabs =() => (props: TabsLayoutProps) => <TabsLayout {...props} />
