import { Login } from '@/services/logic/login';
import { LOCAL_STORAGE } from '@/utils/enums';
import { initUserAuthority, isSuccess, setLocalStorageItem } from '@/utils/tools';
import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel, history } from '@umijs/max';
import { Tabs, App, theme } from 'antd';
import { useState } from 'react';

type LoginType = 'phone' | 'account';

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const {token} = theme.useToken();
  const {message} = App.useApp();
  const { initialState, setInitialState } = useModel('@@initialState');
  const onFinish = async (values:LOGIC.LoginInput) => {
    const Params:LOGIC.LoginParams = {
      username: values.username,
      password: values.password,
      mobile: values.mobile,
      captcha: values.captcha,
      login_type: loginType
    }
    // console.log(Params)
    try {
      const response = await Login(Params); // 发送登录请求
      console.log(response)
      if (isSuccess(response.code)) {
        // 登录成功
        const token = response.data?.token // 获取登录 token
        // 将 token 保存到localstorage
        setLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN, token)
        // 加载用户信息和权限
        await initUserAuthority().then(async (result) => {
          await setInitialState((state) => ({ ...state, ...result })).then(() => {
            setTimeout(() => {
              // 路由跳转
              const urlParams = new URL(window.location.href).searchParams
              history.push(urlParams.get('redirect') || '/')
            }, 0)
          })
        })
      } else {
        message.error(response.message);
      }
    } catch (error) {
      // 异常处理
      message.error('登录过程中发生错误，请稍后再试！');
    }
  };
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="鸿海精密"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
          </div>
        }
        onFinish={onFinish}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          items={[
            {label: '账号密码登录', key: 'account'},
            {label: '手机号登录', key: 'phone'},
          ]}
        >
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};