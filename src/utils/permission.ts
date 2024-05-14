// 组件按钮操作权限集合

export default {
  'system': {
    // 用户管理
    'user-management': {
      'add': 'system:user-management:add', // 新建
      'edit': 'system:user-management:edit', // 编辑
      'delete': 'system:user-management:delete', // 删除
    },
    // 菜单管理
    'menu-management': {
      'add': 'system:menu-management:add', // 新建
      'add-child': 'system:menu-management:add-child', // 添加子级
      'edit': 'system:menu-management:edit', // 编辑
      'delete': 'system:menu-management:delete', // 删除
    },
    // 角色管理
    'role-management': {
      'add': 'system:role-management:add', // 新建
      'edit': 'system:role-management:edit', // 编辑
      'delete': 'system:role-management:delete', // 删除
    },
    // 国际化
    'internationalization': {
      'add': 'system:internationalization:add', // 新建
      'add-child': 'system:internationalization:add-child', // 添加子级
      'edit': 'system:internationalization:edit', // 编辑
      'delete': 'system:internationalization:delete', // 删除
    },
    // 接口管理
    'api-management': {
      'add': 'system:api-management:add', // 新建
      'add-child': 'system:api-management:add-child', // 添加子级
      'edit': 'system:api-management:edit', // 编辑
      'delete': 'system:api-management:delete', // 删除
    },
  },
}
