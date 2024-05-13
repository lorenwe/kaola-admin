import { isSuccess, logoutToLogin, removeLocalStorageItem } from '@/utils/tools';
import { history, useModel, useIntl } from '@umijs/max'
import { App, Dropdown, MenuProps } from 'antd'
import { LockOutlined, PoweroffOutlined } from '@ant-design/icons';
import { HeaderProps } from '@ant-design/pro-components'
import { INTERNATION, LOCAL_STORAGE } from '@/utils/enums'
import { useRequest } from 'ahooks'
import { IconFont } from '@/utils/const';
import { Logout } from '@/services/logic/login'

export default function AvatarProps(openLockScreen: () => void):HeaderProps['avatarProps'] {
  // 国际化方法
  const { formatMessage } = useIntl();
  // hooks 调用
  const { modal } = App.useApp();
  // 获取全局状态
  const { initialState, setInitialState } = useModel('@@initialState');

  console.log('AvatarProps', initialState)

  // 退出登录，并且将当前的 url 保存
	const { run: loginOut } = useRequest(Logout, {
    manual: true,
    onSuccess: async (data) => {
      if (isSuccess(data.code)) {
        setInitialState((s) => ({ ...s, current_user: undefined, access_token: undefined }))
        removeLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN)
        // 退出登录返回登录页
        logoutToLogin()
      }
    },
  })

  // 退出登录 
  const logOutClick = () => {
    modal.confirm({
      title: formatMessage({ id: INTERNATION.WARM_TIPS }),
      content: formatMessage({ id: `${INTERNATION.BASICLAYOUT}.Logout` }),
      onOk: async () => {
        loginOut()
      },
    })
  }

  // 点击下拉菜单回调
  const onMenuClick = (event: any) => {
    switch (event.key) {
      // 跳转至个人中心
      case 'personalCenter':
        history.push('/')
        break
      // 锁定屏幕
      case 'lockScreen':
        openLockScreen()
        break;
      // 退出登录
      case 'logout':
        logOutClick()
        break;
    }
  }

  //用户下拉菜单
  const menuItems: MenuProps['items'] = [
    {
      key: 'personalCenter',
      icon: <IconFont style={{ fontSize: 16 }} type="icon-user" />,
      label: formatMessage({ id: `${INTERNATION.BASICLAYOUT}.PersonalCenter` }),
    },
    {
      key: 'lockScreen',
      icon: <LockOutlined style={{ fontSize: 16 }} />,
      label: formatMessage({ id: `${INTERNATION.BASICLAYOUT}.LockScreen` }),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <PoweroffOutlined style={{ fontSize: 14 }} />,
      label: formatMessage({ id: `${INTERNATION.BASICLAYOUT}.Logout` }),
    },
  ];

  return {
    src:  initialState?.current_user?.avatar,
    size: 'small',
    title: initialState?.current_user?.username,
    render: (_, dom) => {
      return (
        <Dropdown menu={{ onClick: onMenuClick, items: menuItems }}>
          {dom}
        </Dropdown>
      );
    },
  }
}