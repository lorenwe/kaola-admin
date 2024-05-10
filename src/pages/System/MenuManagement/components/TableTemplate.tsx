// 菜单管理-表格列表
import { SearchParams } from '@/utils/types/system/menu-management';
import { ActionType, ColumnsState, ProColumns, ProTable } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Form, Space, Tag } from 'antd';
import { drop, find, get, map, mapValues } from 'lodash-es'
import { useBoolean, useRequest } from 'ahooks'
import { useRef, type FC, useState } from 'react';
import DropdownMenu from '@/components/DropdownMenu'
import { CreateButton, columnScrollX, createTimeColumn, createTimeInSearch, operationColumn, sortColumn, statusColumn } from '@/components/TableColumns';
import { delMenu, getMenuList } from '@/services/system/menu-management';
import { useIntl, getLocale } from '@umijs/max';
import { ROUTES } from '@/utils/enums';
import { Langs } from '@/utils/types';
import { MenuTypeEnum, IconFont, LAYOUT_TYPE_OPTS, NAV_THEME_OPTS } from '@/utils/const';
import { formatPerfix, formatResponse, randomTagColor, renderColumnsStateMap } from '@/utils/tools';

import FormTemplate from './FormTemplate' // 表单组件


// 默认不显示的 column 项
const MENU_CFG = [
	'redirect',
	'hideChildrenInMenu',
	'hideInMenu',
	'hideInBreadcrumb',
	'headerRender',
	'footerRender',
	'menuRender',
	'menuHeaderRender',
	'flatMenu',
	'fixedHeader',
	'fixSiderbar',
]

const TableTemplate: FC = () => {
	// 获取当前语言
	const { formatMessage } = useIntl();
	const locale: Langs = getLocale()
  // 是否显示抽屉表单
	const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] = useBoolean(false)

  // 受控的表格设置栏
	const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>(renderColumnsStateMap(MENU_CFG));

  // 获取表格实例
	const tableRef = useRef<ActionType>();

  // 跟随主题色变化
	const PrimaryColor = useEmotionCss(({ token }) => {
		return { color: token.colorPrimary, fontSize: 16 };
	});

  // 手动触发刷新表格
	function reloadTable() {
		tableRef?.current?.reload()
	}

  // 获取菜单列表
	const { data: menuTree, runAsync: fetchMenuList } = useRequest(
		async (params) => formatResponse(await getMenuList(params)), {
		manual: true,
	})

  // 表单实例
	const [form] = Form.useForm<API.MENUMANAGEMENT>();

  // proTable columns 配置项
  const columns: ProColumns<API.MENUMANAGEMENT>[] = [
    /* 菜单名称 */
    {
			// pages.system.menu-management.name
			title: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'name') }), // "菜单名称",
			ellipsis: true,
      dataIndex: locale,
			hideInSearch: true,
			width: 180,
			fixed: 'left',
			align: 'left',
			render: (_, record) => {
				return record.redirect ?
					<Tag>{formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'redirect') })}</Tag> :
					<Space>
						{
							record.icon ?
								<Tag icon={<IconFont type={record.icon} className={PrimaryColor} />}>
									{record[locale]}
								</Tag>
								:
								<Tag>{record[locale]}</Tag>
						}

					</Space>
			},
		},
    /* 菜单类型 */
		{
			title: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'menu_type') }),
			dataIndex: 'menu_type',
			width: 120,
			align: 'center',
			filters: true,
			onFilter: true,
			valueEnum: mapValues(MenuTypeEnum, (item: string) => formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, `menu_type.${item}`) })),
			render: (_, record) => (
				<Tag
					color={randomTagColor()}>
					{formatMessage({
						id:
							formatPerfix(ROUTES.MENUMANAGEMENT, `menu_type.${MenuTypeEnum[record.menu_type]}`),
					})}
				</Tag>
			),
		},
    /* 路由地址 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.path` }),
			dataIndex: 'path',
			width: 120,
			ellipsis: true,
			align: 'center',
			hideInSearch: true,
		},
		/* 重定向 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.redirect` }),
			dataIndex: 'redirect',
			ellipsis: true,
			width: 120,
			align: 'center',
			hideInSearch: true,
		},
		/* 组件路径 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.component` }),
			dataIndex: 'component',
			width: 120,
			ellipsis: true,
			align: 'center',
			hideInSearch: true,
		},
		/* 权限标识 */
		{
			title: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission') }),
			dataIndex: 'permission',
			ellipsis: true,
			tip: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission.tooltip') }),
			hideInSearch: true,
			width: 250,
			align: 'center',
			render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
		},
    /* 状态 */
		statusColumn,
    /* 排序 */
		sortColumn,
    {
			title: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'navTheme') }),
			dataIndex: 'navTheme',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record: API.MENUMANAGEMENT) => {
        return (
          <Tag color={randomTagColor()}>
						{get(find(NAV_THEME_OPTS, {value:record['navTheme']}), 'label', '--')}
          </Tag>
        )
      },
		},
    {
			title: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'headerTheme') }),
			dataIndex: 'headerTheme',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record: API.MENUMANAGEMENT) => {
        return (
          <Tag color={randomTagColor()}>
						{get(find(NAV_THEME_OPTS, {value:record['navTheme']}), 'label', '--')}
          </Tag>
        )
      },
		},
    {
			title: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'layout') }),
			dataIndex: 'layout',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record: API.MENUMANAGEMENT) => {
        return (
          <Tag color={randomTagColor()}>
						{get(find(LAYOUT_TYPE_OPTS, {value:record['navTheme']}), 'label', '--')}
          </Tag>
        )
      },
		},
    createTimeColumn,
    /* 创建时间-搜索 */
		createTimeInSearch,
    {
      ...operationColumn,
      render: (_, record) => (
				<DropdownMenu
					pathName={ROUTES.MENUMANAGEMENT}
					addChildCallback={() => {
						form.setFieldValue('parent_id', record.id);
						setOpenDrawerTrue()
					}}
					editCallback={() => {
						/// console.log("editCallback",record)
						form.setFieldsValue(record);
						setOpenDrawerTrue()
					}}
					deleteParams={{
						request: delMenu,
						id: record.id,
					}}
					reloadTable={reloadTable}
				/>
			),
    }
  ]
  
  return (
    <>
      <ProTable<API.MENUMANAGEMENT, SearchParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params: SearchParams) => fetchMenuList(params)}
        rowKey="id"
        pagination={false}
        columnsState={{
					value: columnsStateMap,
					onChange: setColumnsStateMap,
				}}
        // 工具栏
				toolBarRender={() => [
					// 新增按钮
					<CreateButton
						key="create"
						pathName={ROUTES.MENUMANAGEMENT}
						callback={() => setOpenDrawerTrue()} />,
				]}
				scroll={{ x: columnScrollX(columns) }}
			/>
      {/* 抽屉表单 */}
			{/* treeData是用于生成选择父级层级下拉框 */}
      <Form form={form}>
        <FormTemplate
          treeData={get(menuTree, 'data', [])}
          reloadTable={reloadTable}
          open={openDrawer}
          setOpenDrawerFalse={setOpenDrawerFalse}
        />
      </Form>
    </>
  )

}


export default TableTemplate