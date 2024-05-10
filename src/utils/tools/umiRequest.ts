import { AxiosRequestConfig, request, RequestConfig, RequestError, RequestOptions } from '@umijs/max';
import { debounce } from 'lodash-es'; // lodash 工具函数
import { message, Modal } from 'antd'

import { getLocalStorageItem, isSuccess, logoutToLogin } from '@/utils/tools' // 全局工具函数
import type { Response, SysResponse } from '@/utils/types'
import { LOCAL_STORAGE, REQUEST_CODE, RESPONSE_DATA_CODE } from '../enums';
import 'nprogress/nprogress.css';
import Nprogress from 'nprogress';


// 防抖函数统一处理异常错误
const debounceError = debounce((content: string, duration = 3) => {
  message.error(content, duration);
}, 300);

// 运行时配置，封装统一请求
const umiRequest: RequestConfig = {
  baseURL: "", // 请求前缀
  timeout: 1 * 1000, // 超时时间，默认 30 s
  validateStatus: function (status:number) {
    // return status >= 100 && status < 600; // 所有的请求状态码都正常返回
    return status >= 200 && status < 300;
  },
  errorConfig: {
    errorHandler(error: RequestError, opts: RequestOptions){
      // console.log("errorHandler", error)
      // 获取报错的响应和请求信息
      const { response, request } = error as any;
      // console.log(response, request, opts)
      // 配置 skipErrorHandler 会跳过默认的错误处理，用于项目中部分特殊的接口
      if (opts?.skipErrorHandler) throw error;
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      if (response) {
        //console.log("响应内容", response)
        const { status, data } = response
        //console.log("响应数据", data)
        switch (status) {
          // token令牌校验，如果出现这个返回码则退出登录到登录页面
          case REQUEST_CODE.UNAUTHORIZED:
            // 这里加一个防抖
            Modal.success({
              title: '登录已失效,请重新登录!',
              content: "点击确认跳转到登录页",
              onOk: () => {
                // 退出登录返回到登录页
                logoutToLogin()
                Modal.destroyAll();
              },
            });
            break;
          default:
            debounceError(response.data.msg || '服务器内部发生错误！');
        }
      }
    },
    errorThrower(res: any){
      const { code, msg } = res;
      console.log("errorThrower", res)
      if (!isSuccess(code)) {
        throw new Error(msg); // 抛出自制的错误
      }
    }
  },
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 获取 ACCESS_TOKEN
      const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN)
      // 判断是否登录存在token，有就请求头携带token
      if (ACCESS_TOKEN && config?.headers) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`
      }
      // console.log("请求拦截器")
      // 进度条开始
      Nprogress.start();
      return { ...config };
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    [
      (response:any) => {
        //console.log("响应拦截器", response)
        // console.log("响应拦截")
        // 拦截响应数据，进行个性化处理
        const { status } = response;
        //console.log(status)
        const { data } = response as Response<any>;
        // console.log(data)
        // console.log("响应拦截", response, data)
        // 根据返回状态码，统一处理，需要前端和后端沟通确认
        switch (data.errno) {
          // 成功发起请求并成功处理，一般用于数据库字段校验
          case RESPONSE_DATA_CODE.PARAMS_ERROR:
            debounceError(JSON.stringify(data.msg));
            break;
          // 登录信息失效
          case RESPONSE_DATA_CODE.UNAUTHORIZED:
            // 退出登录返回到登录页
            logoutToLogin()
            Modal.destroyAll();
            break;
        }
        // 进度条结束
        Nprogress.done();
        return response
      }, 
      (error:any) => {
        // 进度条结束
        Nprogress.done();
        return Promise.reject(error)
      }
    ],
  ]
}

// 导出封装的请求方法
export const httpRequest = {
  get<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return request(url, { method: 'GET', params: data, ...config });
  },

  get2<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<SysResponse<T>> {
    return request(url, { method: 'GET', params: data, ...config });
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return request(url, { method: 'POST', data, ...config });
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return request(url, { method: 'PUT', data, ...config });
  },

  delete<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return request(url, { method: 'DELETE', data, ...config });
  },

  patch<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return request(url, { method: 'PATCH', data, ...config });
  },
}

export default umiRequest