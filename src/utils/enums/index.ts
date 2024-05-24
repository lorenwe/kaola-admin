//存储在 localstorage 的 key
export enum LOCAL_STORAGE {
  USER_INFO = 'USER_INFO', // 用户信息
  ACCESS_TOKEN = 'ACCESS_TOKEN', // ACCESS_TOKEN
  LAYOUT = 'LAYOUT', // 布局
  LOCK_SLEEP = 'LOCK_SLEEP', // 睡眠
}

//请求状态码 HTTP状态码
export enum REQUEST_CODE {
  NOSUCCESS           = -1,     // 表示请求成功，但操作未成功
  SUCCESS             = 200,    // 表示请求成功
  BADREQUEST          = 501,    // 表示客户端发送的请求有错误
  UNAUTHORIZED        = 401,    // 表示客户端未提供身份验证凭据或身份验证凭据不正确
  NOTFOUND            = 404,    // 表示服务器无法找到请求的资源
  INTERNALSERVERERROR = 500,    // 表示服务器内部错误
}

// 请求成功后，自定义数据状态码
export enum RESPONSE_DATA_CODE {
  SUCCESS             = 200,    // 表示响应数据成功
  PARAMS_ERROR        = 3,      // 表示请求参数错误
  UNAUTHORIZED        = 401,    // 表示登录信息失效
  
}

//菜单路由
export enum ROUTES {
  LOGIN                = '/login',                       // 登录页
  MENUMANAGEMENT       = '/system/menu-management',      // 系统设置-菜单管理
  INTERNATIONALIZATION = '/system/internationalization', // 系统设置-国际化
  ROLEMANAGEMENT       = '/system/role-management',      // 系统设置-角色管理
  USERMANAGEMENT       = '/system/user-management',      // 系统设置-用户管理
  APIMANAGEMENT        = '/system/api-management',       // 系统设置-API管理
}

// 公共国际化 key
export enum INTERNATION {
  OPERATION = 'global.table.operation', // 操作
  STATUS = 'global.status', // 状态
  STATUS_DISABLE = 'global.status.disable', // 禁用
  STATUS_NORMAL = 'global.status.normal', // 正常
  SORT = 'global.table.sort', // 排序
  SORT_TIP = 'global.table.sort.tooltip', // 排序 Tip
  CREATED_TIME = 'global.table.created_time', // 创建时间
  DESCRIBE = 'global.table.describe', // 描述
  DELETE_CONTENT = 'global.message.delete.content', // 删除提示内容
  DELETE_TITLE = 'global.message.delete.title', // 删除提示标题
  PARENT_ID = 'global.form.parent_id', // 添加子级
  PARENT_ID_TIP = 'global.form.parent_id.tooltip', // 添加子级 Tip
  PLACEHOLDER = 'global.form.placeholder', // 请输入
  PLACEHOLDER_UPLOAD = 'global.form.placeholder.upload', // 请上传
  PLACEHOLDER_SELETED = 'global.form.placeholder.seleted', // 请选择
  LEADER = 'global.form.leader', // 负责人
  BUTTON_SUBMIT = 'global.button.submit', // 提交
  BUTTON_MODIFY = 'global.button.modify', // 修改
  BUTTON_CONFIRM = 'global.button.confirm', // 确认
  WARM_TIPS = 'global.warm-tips', // 温馨提示
  FLAG_YES = 'global.flag.yes', // 是
  FLAG_NO = 'global.flag.no', // 否
  POPCONFIRM_TITLE = 'global.popconfirm.title', // 确认执行此操作吗？
  BASICLAYOUT = 'components.BasicLayout', // 布局组件
  UPLOADIMAGE = 'components.UploadImage',
  API_TYPE_DIR = 'global.api_type.dir',  // 接口类型-目录
  API_TYPE_API = 'global.api_type.api',  // 接口类型-接口
  Announcement = 'global.announcement',  // 全局活动公告
}


// 消息类型
export enum ANNOUNCEMENT_TYPE {
  ANNOUNCEMENT = '1', // 公告
  ACTIVITY = '2', // 活动
  MESSAGE = '3', // 消息
  NOTIFICATION = '4', // 通知
}


// EventBus type
export enum EVENTBUS_TYPE {
  ANNOUNCEMENT = 'announcement-detail', // 查看公告详情
  UPDATEUNREADYCOUNT = 'update-unready-count', // 更新未读消息数量
}


// TabsLayout 多标签类型
export enum TABSLAYOUT {
  CLOSE   = 'close',   // 关闭当前
  REFRESH = 'refresh', // 重新加载
  RIGHT   = 'right',   // 关闭右侧
  LEFT    = 'left',    // 关闭左侧
  OTHERS  = 'others',  // 关闭其它
}

// 性别
export enum SEX {
  FEMALE  = '0', // 女
  MALE    = '1', // 男
  PRIVACY = '2', // 隐私
}

// 状态
export enum STATUS {
  DISABLE, // 禁用
  NORMAL,  // 正常
}

// 是否
export enum FLAG {
  NO,  // 否
  YES, // 是
}

// 菜单类型
export enum MENU_TYPE {
  DIR = 'dir',       // 目录
  MENU = 'menu',     // 菜单
  BUTTON = 'button', // 按钮
}

// 接口类型
export enum API_TYPE {
  DIR = 'dir',       // 目录
  API = 'api',       // 接口
}

// 接口请求方式
export enum API_METHOD_TYPE {
  POST    = 'POST',
  GET     = 'GET',
  PUT     = 'PUT',
  DELETE  = 'DELETE',
  PATCH   = 'PATCH',
  HEAD    = 'HEAD',
  OPTIONS = 'OPTIONS',
  ALL     = 'ALL',
}

// 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
export enum LAYOUT_TYPE {
  SIDE = 'side', // 侧边菜单
  TOP = 'top',   // 顶部菜单
  MIX = 'mix',   // 混合菜单
}

// 主题风格
export enum MENU_THEME {
  DARK = 'dark',   // 暗黑风格
  LIGHT = 'light', // 亮色风格
}

// 窗口打开方式
export enum TARGET_TYPE {
  BLANK = '_blank',
  SELF = '_self',
  PARENT = '_parent',
  TOP = '_top'
}


// 表格下拉操作类型
export enum OPERATION {
  ADD = 'add', // 新增
  EDIT = 'edit', // 编辑
  DELETE = 'delete', // 删除
  ADDCHILD = 'add-child', // 添加子级
}

// 国际化语言
export enum LANGS {
  CN = 'zh-CN', // 中文
  US = 'en-US', // 英文
  JP = 'ja-JP', // 日文
  TW = 'zh-TW', // 繁体中文
}