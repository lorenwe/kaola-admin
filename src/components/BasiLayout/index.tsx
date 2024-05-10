import { ProConfigProvider, SettingDrawer, Settings as LayoutSettings } from '@ant-design/pro-components';
import { history, InitDataType, Link, RunTimeLayoutConfig, useKeepOutlets } from '@umijs/max';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/tools'
import { useBoolean } from 'ahooks'
import { LOCAL_STORAGE, ROUTES } from '@/utils/enums'
import Footer from '@/components/Footer'; // 全局底部版权组件
import { eq, toString } from 'lodash-es'
import { IconFont } from '@/utils/const';
import { Space, Typography } from 'antd'
import { loopMenuItem } from '@/utils/dynamicRoutes';
import actionsRender from '@/components/BasiLayout/components/ActionsRender'
import avatarProps from '@/components/BasiLayout/components/AvatarProps'
import LockSleep from '@/components/BasiLayout/components/LockSleep'
import LockScreenModal from '@/components/BasiLayout/components/LockScreenModal'
import ActionButtons from '@/components/BasiLayout/components/ActionButtons'

const { Paragraph } = Typography;

export const BasiLayout: RunTimeLayoutConfig = ({ initialState, setInitialState }: InitDataType) => {
  // 获取 LAYOUT 的值
	const LAYOUT = getLocalStorageItem<LayoutSettings>(LOCAL_STORAGE.LAYOUT)
  // 获取 ACCESS_TOKEN
	const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN)
  // 是否显示锁屏弹窗
	const [openLockModal, { setTrue: setLockModalTrue, setFalse: setLockModalFalse }] = useBoolean(false)

  return {
    iconfontUrl: process.env.ICONFONT_URL,
    /* 用户头像 */
		avatarProps: avatarProps(setLockModalTrue),
    /* 底部版权 */
    footerRender: () => <Footer />,
    /* 自定义操作列表 */
		actionsRender,
    /* 页面切换时触发 */
		onPageChange: (location) => {
			// 如果没有登录，重定向到 login
			if (!ACCESS_TOKEN && !eq(location?.pathname, ROUTES.LOGIN)) {
				history.push(ROUTES.LOGIN);
			}
		},
    /* 自定义面包屑 */
		breadcrumbProps: {
      // 为面包屑添加路由跳转链接
			itemRender: (route, params, routes, paths) => {
        // console.log("自定义面包屑", route, params, routes, paths)
        const secondRoute = routes.indexOf(route) === 1
        return secondRoute ? (
            <Link to={route.linkPath as string} style={{color: '#1677ff'}}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          )
			},
		},
	
    // 自定义菜单项的 render 方法
		menuItemRender: (menuItemProps, defaultDom) => {
      // console.log("menuItemRender", menuItemProps, defaultDom)
			const renderMenuDom = () => {
				return (
					<Space>
            { menuItemProps.pro_layout_parentKeys?.length > 0 && <IconFont type={toString(menuItemProps.icon)} />}
						<Paragraph
							ellipsis={{ rows: 1, tooltip: defaultDom }}
							style={{ marginBottom: 0 }}>
							{defaultDom}
						</Paragraph>
					</Space>
				)
			}
			return (
				/* 渲染二级菜单图标 */
				// menuItemProps.isUrl ?
				// 	<a href={menuItemProps.path} target="_blank">
				// 		{renderMenuDom()}
				// 	</a> :
				// 	<Link to={menuItemProps.path || '/'} >
				// 		{renderMenuDom()}
				// 	</Link>
        <Link to={menuItemProps.path || '/'} >
          {renderMenuDom()}
        </Link>
			);
		},
    menu: {
      // 请求远程菜单
      request: async () => {
				if (initialState?.user_menu) {
          // console.log("loopMenuItem", loopMenuItem(initialState.user_menu))
					return loopMenuItem(initialState.user_menu)
				} else {
					return []
				}
      },
		},
    // 菜单的折叠收起事件
		onCollapse: (collapsed:boolean) => {
      console.log('菜单的折叠收起事件')
			// setInitialState((initState) => ({ ...initState, collapsed: collapsed }));
		},
    childrenRender: () => {
      const element = useKeepOutlets();
      return (
        <>
          <ProConfigProvider>
            {element}
            {/* 锁屏弹窗 */}
						<LockScreenModal open={openLockModal} setOpenFalse={setLockModalFalse} />
						{/* 睡眠弹窗 */}
						<LockSleep />
            {/* 全局通用按钮 */}
						<ActionButtons />
            {/* 工具栏 */}
						<SettingDrawer
							disableUrlParams
							enableDarkTheme
							settings={LAYOUT || {}}
							onSettingChange={(Settings: LayoutSettings) => {
								setLocalStorageItem(LOCAL_STORAGE.LAYOUT, { ...initialState?.settings, ...Settings })
								setInitialState((s) => ({ ...s, Settings }));
							}}
						/>
          </ProConfigProvider>
        </>
      )
    },
    ...LAYOUT,
  }
}

