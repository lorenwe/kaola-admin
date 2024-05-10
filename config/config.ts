import { defineConfig } from '@umijs/max';
import routes from './router';
import defaultSettings from './defaultSettings'

export default defineConfig({
  favicons: ['/favicon.ico'],
  // 多tab标签页支持
  plugins: [
    require.resolve('@alita/plugins/dist/keepalive'),
    require.resolve('@alita/plugins/dist/tabs-layout'),
  ],
  //keepalive: [/./],
  keepalive: [
    '/system/menu-management', 
    '/system/internationalization', 
    '/system/role-management',
    '/system/user-management',
    '/system/api-management',
  ],
  tabsLayout: {
    // 是否使用自定义的 tabs 组件，需要搭配运行时配置 getCustomTabs 使用
    hasCustomTabs: true,
    // 是否开启右侧的 tabs 管理器，可以实现“关闭左侧”，“关闭右侧”，“关闭其他”和“刷新”等功能。
    hasDropdown: true,
    // hasFixedHeader: false,
  },
  hash: true,
  antd: {
    configProvider: {},
    appConfig: {},
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  reactQuery: {
    devtool: false,
  },
  layout: {
    locale: true,  // 菜单国际化
    ...defaultSettings,
  },
  routes: routes,
  npmClient: 'pnpm',
  define: {
    'process.env.ICONFONT_URL': '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    //at.alicdn.com/t/font_8d5l8fzk5b87iudi.js
    // 'process.env': {
    //   ICONFONT_URL: '//at.alicdn.com/t/c/font_3629707_x0dxkt3btrg.js',
    // },
  },
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/scripts/loading.js', async: true },
  ],
  proxy: {
    '/adm': {
      'target': 'http://127.0.0.1:8000/',
      'changeOrigin': true,
      // 'pathRewrite': { '^/adm' : '' },
    },
  },
});
