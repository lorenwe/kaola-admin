import axios, { AxiosResponse } from 'axios'
import { debounce } from 'lodash-es'; // lodash 工具函数
import { message, Modal } from 'antd'
import { getLocalStorageItem, isSuccess, logoutToLogin } from '@/utils/tools' // 全局工具函数
import 'nprogress/nprogress.css';
import Nprogress from 'nprogress';
import { LOCAL_STORAGE, RESPONSE_DATA_CODE } from '../enums';
import { SysResponse } from '../types';

// 防抖函数统一处理异常错误
const debounceError = debounce((content: string, duration = 3) => {
  message.error(content, duration);
}, 300);

axios.interceptors.response.use((response: AxiosResponse<SysResponse<any>>) => {
    //console.log(response)
    const { status, data } = response;
    //console.log("data数据",data)
    // 根据返回状态码，统一处理，需要前端和后端沟通确认
    switch (data.code) {
      // 成功发起请求并成功处理，一般用于数据库字段校验
      case RESPONSE_DATA_CODE.PARAMS_ERROR:
        debounceError("请求参数错误");
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
  (error) => {
    // 进度条结束
    Nprogress.done();
    debounceError("请求发生错误");
    return Promise.reject(error.message)
  }
)

axios.interceptors.request.use((config) => {
  if (config.headers) {
    // 获取 ACCESS_TOKEN
    const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN)
    // 判断是否登录存在token，有就请求头携带token
    if (ACCESS_TOKEN && config?.headers) {
      config.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`
      config.headers['token'] = `${ACCESS_TOKEN}`
    }
  }
  Nprogress.start();
  return config
})

export default axios