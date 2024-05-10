import { forEach } from 'lodash-es'
import type { InitialStateTypes } from '@/utils/types'

export default function access(initialState: InitialStateTypes | undefined) {
  // 获取按钮权限集合
  const { permissions, user_menu } = initialState ?? {};
  console.log("access", user_menu)
  //获取当前所有路由
  const getRouteNames = (tree = user_menu): string[] => {
    // 收集当前层级的所有 name 属性 
    let result: string[] = []
    // 遍历收集
    forEach(tree, (node: UserMenuDataItem) => {
      result.push(node.name as string);
      // console.log(typeof node.children)
      // console.log(typeof node.children)
      if (node.children) {
        result = result.concat(getRouteNames(node.children));
      }
    });
    return result
  }
  return {
    // 判断是否有按钮操作权限
    operationPermission: (data: string) => permissions ? permissions.includes(data) : false,
    // 判断是否有权限访问菜单
    adminRouteFilter: (route: any) => {
      const allRouteNames = getRouteNames()
      // console.log("access权限判断",route.name, allRouteNames)
      return allRouteNames.includes(route.name)
    },
  };
}

