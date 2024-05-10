
const routes = [
  {
    name: '404',
    path: '*',
    layout: false,
    component: './404',
  },
  {
    name: 'Login',
    path: '/login',
    component: './Login',
    layout: false,
    exact: true,
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: './Dashboard',
    icon: 'icon-home-fill',
    exact: true,
  },
  // {
  //   name: '权限演示',
  //   path: '/access',
  //   component: './Access',
  //   exact: true,
  //   access: 'adminRouteFilter',
  // },
  // {
  //   name: 'CRUD示例',
  //   path: '/table',
  //   component: './Table',
  //   exact: true,
  //   access: 'adminRouteFilter',
  // },
  // {
  //   name: '用户列表',
  //   path: '/users',
  //   component: './Users',
  //   exact: true,
  //   access: 'adminRouteFilter',
  // },
  // {
  //   name: '客户管理',
  //   path: '/customer-manage',
  //   component: './CustomerManage',
  //   exact: true,
  //   access: 'adminRouteFilter',
  //   routes: [
  //     {
  //       name: '客户列表',
  //       path: '/customer-manage/customer-list',
  //       component: './CustomerManage/CustomerList',
  //       exact: true,
  //       access: 'adminRouteFilter',
  //       // routes: [
  //       //   {
  //       //     name: '客户编辑',
  //       //     path: '/customer-manage/customer-list/edit/:id',
  //       //     component: './CustomerManage/CustomerList/edit.tsx',
  //       //     exact: true,
  //       //   }
  //       // ]
  //     },
  //     {
  //       name: '客户编辑',
  //       path: '/customer-manage/customer-list/edit/:id',
  //       component: './CustomerManage/CustomerList/edit.tsx',
  //       exact: true,
  //       access: 'adminRouteFilter',
  //     },
  //     {
  //       name: '客户认证',
  //       path: '/customer-manage/authentication',
  //       component: './CustomerManage/ClientAuthentication',
  //       exact: true,
  //       access: 'adminRouteFilter',
  //     },
  //   ],
  // },
  {
    path: '/system',
    name: 'system',
    access: 'adminRouteFilter',
    icon: 'icon-setting',  // 这里的icon是用于“多tabs”显示icon
    exact: true,
    routes: [
      {
        path: '/system',
        redirect: '/system/menu-management',
      },
      {
        path: '/system/menu-management',
        name: 'menu-management',
        component: './System/MenuManagement',
        access: 'adminRouteFilter',
        icon: 'icon-setting',
        exact: true,
      },
      {
        path: '/system/internationalization',
        name: 'internationalization',
        component: './System/Internationalization',
        access: 'adminRouteFilter',
        icon: 'icon-setting',
        exact: true,
      },
      {
        path: '/system/role-management',
        name: 'role-management',
        component: './System/RoleManagement',
        access: 'adminRouteFilter',
        icon: 'icon-user',
        exact: true,
      },
      {
        path: '/system/user-management',
        name: 'user-management',
        component: './System/UserManagement',
        access: 'adminRouteFilter',
        icon: 'icon-user',
        exact: true,
      },
      {
        path: '/system/api-management',
        name: 'api-management',
        component: './System/ApiManagement',
        access: 'adminRouteFilter',
        icon: 'icon-api',
        exact: true,
      },
    ]
  }
];
export default routes;