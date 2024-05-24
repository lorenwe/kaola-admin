
import { compact, eq, get, join, sample, startsWith } from 'lodash-es';
import { LOCAL_STORAGE, RESPONSE_DATA_CODE, ROUTES } from '../enums';
import { history } from '@umijs/max';
import { stringify } from 'querystring';
import { InitialStateTypes, LockSleepTypes, IBasePagination, SysResponse } from '../types';
import { ColumnsState, RequestData } from '@ant-design/pro-components';
import CryptoJS from 'crypto-js'; // AES/DES加密
import { getPermissions, getUserInfo, getUserMenu } from '@/services/basis/user-info';

// 判断图片文件类型
export const isImageFile = (fileType: string, allowedTypes: string[]): boolean => {
  for (let type of allowedTypes) {
    if (type === 'image/*') {
      return fileType.indexOf('image/') === 0
    }
  }
  return allowedTypes.includes(fileType);
}

export const isArrayEmpty = (arr:Array<any>):boolean => {
  return arr.length === 0;
}

//获取用户信息、菜单和权限
export const initUserAuthority = async (): Promise<InitialStateTypes> => {
  try {
    // 获取用户信息和菜单按钮权限
    const [
      userInfo, 
      userMenus, 
      permissions
    ] =
      await Promise.all([
        getUserInfo(), 
        getUserMenu(), 
        getPermissions()
      ])
    // 初始化全局状态
    return {
      current_user: get(userInfo, 'data', undefined),
      user_menu: get(userMenus, 'data', []),
      permissions: get(permissions, 'data', []),
    }
  } catch (error) {
    history.push(ROUTES.LOGIN);
    return {}
  }
}

//获取 localstorage 的值
export const getLocalStorageItem = <T>(key: string): T | null => {
  // 获取 值
  const item = localStorage.getItem(key);
  // 判断是否为空 
  if (item === null) {
    return null;
  }
  // 不为空返回解析后的值
  const result: T = JSON.parse(item);
  return result
}

//存储 localstorage 的值
export const setLocalStorageItem = <T>(key: string, value: T) => {
  const result = JSON.stringify(value);
  localStorage.setItem(key, result);
}

// 移除 localstorage 的值
export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
}


// 判断请求是否成功
export const isSuccess = (code?: number): boolean => eq(code, RESPONSE_DATA_CODE.SUCCESS)


// 退出登录返回到登录页
export const logoutToLogin = () => {
  const { search, pathname } = window.location;
  // 获取 LOCK_SLEEP 信息
  const LOCK_SLEEP = getLocalStorageItem<LockSleepTypes>(LOCAL_STORAGE.LOCK_SLEEP)
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // 移除 token
  removeLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN)
  // 取消睡眠弹窗
  if (LOCK_SLEEP) {
    setLocalStorageItem(LOCAL_STORAGE.LOCK_SLEEP, { ...LOCK_SLEEP, isSleep: false })
  }
  // 重定向地址
  if (window.location.pathname !== ROUTES.LOGIN && !redirect) {
    history.replace({
      pathname: ROUTES.LOGIN,
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
}


export const toAsyncAwait = <T>(promise: Promise<T>) => {
  return promise.then((res) => ({ error: null, result: res })).catch((err) => ({ error: err, result: undefined }));
}


// 将 pathname 转成国际化对应的 key，如：/administrative/jobs-management => administrative.jobs-management
export const formatPathName = (pathname: string): string => {
  return join(compact(pathname.split('/')), '.')
}

// 统一国际化前缀
export const formatPerfix = (route: string, suffix = '', isMenu = false): string => {
  // 国际化字符串
  const field = `${isMenu ? 'menu' : 'pages'}.${formatPathName(route)}${suffix ? '.' + suffix : ''}`
  return startsWith(route, 'global') ? route : field
}

// Tag 标签随机颜色
export const randomTagColor = () => {
  const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  return sample(colors)
}

// 默认不显示的 column 项
export const renderColumnsStateMap = (MENU_CFG: string[] = []) => {
  const result: Record<string, ColumnsState> = {}
  MENU_CFG.forEach((ele) => {
    result[ele] = {
      show: false,
    }
  })
  return result
}

// 格式化请求数据
export const formatResponse = <T extends any[]>(response: SysResponse<T> | SysResponse<IBasePagination<T[number]>>): RequestData<T[number]> => {
  // 解构响应值
  const { code, data } = response
  return {
    data: (data as IBasePagination<T[number]>).list || (response as SysResponse<T>).data,
    // get(data as IBasePagination<T>, 'list') || get(response as SysResponse<T>, 'data') || [],
    // success 请返回 true，不然 table 会停止解析数据，即使有数据
    success: isSuccess(code),
    total: get(data as IBasePagination<T[number]>, 'total', 0),
  }
}

// 数字转布尔值
export const yesOrNoToBoolean = (value : number) :boolean => {
  if (value === 1) {
    return true
  } else {
    return false
  }
}

// AES/DES密钥
const CRYPTO_KEY = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); // 十六位十六进制数作为密钥
const CRYPTO_IV = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); // 十六位十六进制数作为密钥偏移量

// AES/DES加密
export const encryptionAesPsd = (password: string): string => {
  const encrypted = CryptoJS.AES.encrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); // 返回的是base64格式的密文
};

// AES/DES解密
export const decryptionAesPsd = (password: string): string => {
  const decrypted = CryptoJS.AES.decrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8); // 返回的是解密后的字符串
};


// 判断是否是HTTP或HTTPS链接
export const isHttpLink = (link: string): boolean => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol  
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name  
    '((\\d{1,3}\\.){3}\\\d{1,3}))' + // OR ip (v4) address  
    '(\\:\\d+)?' + // port  
    '(\\/[-a-z\\d%_.~+]*)*' + // path  
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string  
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator  
  return pattern.test(link);
}