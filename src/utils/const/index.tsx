import { createFromIconfontCN } from '@ant-design/icons'
import { ANNOUNCEMENT_TYPE, API_METHOD_TYPE, API_TYPE, FLAG, INTERNATION, LANGS, LAYOUT_TYPE, MENU_THEME, MENU_TYPE, ROUTES, SEX, STATUS, TARGET_TYPE } from '@/utils/enums'
import { AnnouncementType, EnumKeys, Langs } from '../types';
import { MenuTypes } from '../types/system/menu-management';
import { LabeledValue } from 'antd/es/select'
import { keys, toLower } from 'lodash-es';
import { Locale } from 'antd/es/locale';
import enus from 'antd/es/locale/en_US';
import jajp from 'antd/es/locale/ja_JP';
import zhcn from 'antd/es/locale/zh_CN';
import zhtw from 'antd/es/locale/zh_TW';
import { FormattedMessage } from '@umijs/max';
import { formatPerfix } from '../tools';
import { ApiMethodTypes, ApiTypes } from '../types/system/api-management';

//使用 iconfont.cn 资源
export const IconFont = createFromIconfontCN({
  // scriptUrl: process.env.ICONFONT_URL,
  scriptUrl: '//at.alicdn.com/t/c/font_4492427_autdx52uwxm.js',
});


// 消息类型
export const AnnouncementTypeEnum: Record<AnnouncementType, string> = {
  [ANNOUNCEMENT_TYPE.ANNOUNCEMENT]: 'announcement',
  [ANNOUNCEMENT_TYPE.ACTIVITY]: 'activity',
  [ANNOUNCEMENT_TYPE.MESSAGE]: 'message',
  [ANNOUNCEMENT_TYPE.NOTIFICATION]: 'notification',
}

// 菜单类型配置项
export const MenuTypeEnum: Record<MenuTypes, string> = {
  [MENU_TYPE.DIR]: 'dir',
  [MENU_TYPE.MENU]: 'menu',
  [MENU_TYPE.BUTTON]: 'button',
};

// 接口类型配置项
export const ApiTypeEnum: Record<ApiTypes, string> = {
  [API_TYPE.DIR]: 'dir',
  [API_TYPE.API]: 'api',
};

// 接口请求方式配置项
export const ApiMethodEnum: Record<ApiMethodTypes, string> = {
  [API_METHOD_TYPE.POST]: 'POST',
  [API_METHOD_TYPE.GET]: 'GET',
  [API_METHOD_TYPE.PUT]: 'PUT',
  [API_METHOD_TYPE.DELETE]: 'DELETE',
  [API_METHOD_TYPE.PATCH]: 'PATCH',
  [API_METHOD_TYPE.HEAD]: 'HEAD',
  [API_METHOD_TYPE.OPTIONS]: 'OPTIONS',
  [API_METHOD_TYPE.ALL]: 'ALL',
};

// 状态
export const STATUS_OPTS: LabeledValue[] = [
  {
    label: <FormattedMessage id={INTERNATION.STATUS_NORMAL} />,
    value: STATUS.NORMAL,
  },
  {
    label: <FormattedMessage id={INTERNATION.STATUS_DISABLE} />,
    value: STATUS.DISABLE,
  },
];

// 是否
export const FLAG_OPTS: LabeledValue[] = [
  {
    label: <FormattedMessage id={INTERNATION.FLAG_YES} />,
    value: FLAG.YES,
  },
  {
    label: <FormattedMessage id={INTERNATION.FLAG_NO} />,
    value: FLAG.NO,
  },
];


// 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
// @ts-ignore
export const LAYOUT_TYPE_OPTS: LabeledValue[] = keys(LAYOUT_TYPE).map((key: EnumKeys<typeof LAYOUT_TYPE>) => (
  {
    value: LAYOUT_TYPE[key],
    label: <FormattedMessage id={formatPerfix(ROUTES.MENUMANAGEMENT, `layout.${LAYOUT_TYPE[key]}`)} />,
  }
))


// 导航菜单的主题
// @ts-ignore
export const NAV_THEME_OPTS: LabeledValue[] = keys(MENU_THEME).map((key: EnumKeys<typeof MENU_THEME>) => (
  {
    value: MENU_THEME[key],
    label: <FormattedMessage id={formatPerfix(ROUTES.MENUMANAGEMENT, `navTheme.${MENU_THEME[key]}`)} />,
  }
))


// 窗口打开方式
// @ts-ignore
export const TARGET_TYPE_OPTS: LabeledValue[] = keys(TARGET_TYPE).map((key: EnumKeys<typeof TARGET_TYPE>) => (
  { value: TARGET_TYPE[key], label: TARGET_TYPE[key] }
))


// antd 多语言配置项
export const ANTD_LANGS: Record<Langs, { momentLocale: string, antd: Locale }> = {
  [LANGS.CN]: {
    momentLocale: toLower(LANGS.CN),
    antd: zhcn,
  },
  [LANGS.JP]: {
    momentLocale: toLower(LANGS.JP),
    antd: jajp,
  },
  [LANGS.US]: {
    momentLocale: toLower(LANGS.US),
    antd: enus,
  },
  [LANGS.TW]: {
    momentLocale: toLower(LANGS.TW),
    antd: zhtw,
  },
}

// 性别
export const SEX_OPTS: LabeledValue[] = [
  {
    label: <FormattedMessage id={formatPerfix(ROUTES.USERMANAGEMENT, 'sex.female')} />,
    value: SEX.FEMALE,
  },
  {
    label: <FormattedMessage id={formatPerfix(ROUTES.USERMANAGEMENT, 'sex.male')} />,
    value: SEX.MALE,
  },
  {
    label: <FormattedMessage id={formatPerfix(ROUTES.USERMANAGEMENT, 'sex.secret')} />,
    value: SEX.PRIVACY,
  },
];