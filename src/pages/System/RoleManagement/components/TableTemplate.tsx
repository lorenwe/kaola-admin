// 角色管理-表格列表
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks';
import { App, Form, Popconfirm, Space, Switch, Tag } from 'antd'
import { map, toNumber } from 'lodash-es'
import { FC, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu' // 表格操作下拉菜单
import {
	columnScrollX,
	CreateButton,
	createTimeColumn,
	createTimeInSearch,
	describeColumn,
	operationColumn,
	sortColumn,
	statusColumn,
} from '@/components/TableColumns'
import { delRole, getRoleList, setRoleStatus } from '@/services/system/role-management' // 角色管理接口
import { formatPerfix, formatResponse, isSuccess } from '@/utils/tools'
import { IconFont } from '@/utils/const'
import { INTERNATION, ROUTES, STATUS } from '@/utils/enums'
import type { RoleStatusParams, SearchParams } from '@/utils/types/system/role-management'

import FormTemplate from './FormTemplate' // 表单组件

const TableTemplate: FC = () => {
	const { formatMessage } = useIntl();
	// hooks 调用
	const { message } = App.useApp();
	// 表单实例
	const [form] = Form.useForm<API.ROLEMANAGEMENT>();
	// 获取表格实例
	const tableRef = useRef<ActionType>();
	const [roleLoading, { setTrue: setRoleLoadingTrue, setFalse: setRoleLoadingFalse }] = useBoolean(false);
	const [roleId, setRoleId] = useState<string>('')
	// 是否显示抽屉表单
	const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] = useBoolean(false)
	// 跟随主题色变化
	const PrimaryColor = useEmotionCss(({ token }) => {
		return { color: token.colorPrimary, fontSize: 16 };
	});
	// 手动触发刷新表格
	function reloadTable() {
		tableRef?.current?.reload()
	}

	// 获取角色管理列表
	const { runAsync: fetchRoleList } = useRequest(
		async (params) => formatResponse(await getRoleList(params)), {
		manual: true,
	},
	)

	// 修改角色状态
	const changeRoleStatus = async ({ id, status }: RoleStatusParams) => {
		const data = await setRoleStatus({
			id,
			status: status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE,
		})
		if (isSuccess(data.code)) {
			message.success(data.message)
			reloadTable()
		}
		// 关闭确认框
		setRoleLoadingFalse()
	}

	// 渲染设置角色状态
	const renderRoleStatus = (record: API.ROLEMANAGEMENT) => (
		<Popconfirm
			title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
			open={roleId === record.id && roleLoading}
			onConfirm={() => changeRoleStatus(record)}
			onCancel={() => setRoleLoadingFalse()}
			key="popconfirm"
		><Switch
				checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
				unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
				checked={record.status === STATUS.NORMAL}
				loading={roleId === record.id && roleLoading}
				onChange={() => { setRoleLoadingTrue(); setRoleId(record.id) }}
			/>
		</Popconfirm>
	);
	// proTable columns 配置项
	const columns: ProColumns<API.ROLEMANAGEMENT>[] = [
		{
			title: formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_name') }),
			dataIndex: 'role_name',
			ellipsis: true,
			width: 160,
			render: (text) => <Space>
				<Tag
					icon={<IconFont type="icon-user" className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_code') }),
			dataIndex: 'role_code',
			width: 140,
			ellipsis: true,
		},
		/* 状态 */
		{
			...statusColumn,
			render: (_, record) => renderRoleStatus(record),
		},
		/* 排序 */
		sortColumn,
		/* 创建时间 */
		createTimeColumn,
		/* 创建时间-搜索 */
		createTimeInSearch,
		/* 描述 */
		describeColumn,
		{
			...operationColumn,
			render: (_, record) => (
				<DropdownMenu
					pathName={ROUTES.ROLEMANAGEMENT}
					editCallback={() => {
						// console.log("DropdownMenu", map(record.role_menu, n => n.menu_id))
						form.setFieldsValue({
							...record,
							//role_menu: record.role_menu,// map(record.role_menu, 'menu_id'),
							//role_menus: map(record.role_menu, n => toNumber(n.menu_id)),
							role_menu: map(record.role_menu, n => toNumber(n)),
						});
						setOpenDrawerTrue()
					}}
					deleteParams={{
						request: delRole,
						id: record.id,
					}}
					reloadTable={reloadTable}
				/>
			),
		},
	]

	return (
		<>
			<ProTable<API.ROLEMANAGEMENT, SearchParams>
				actionRef={tableRef}
				columns={columns}
				request={async (params) => {
					let {current, pageSize, ...newParams} = params;
					newParams.page      = current?current:1;
					newParams.page_size = pageSize?pageSize:10;
					return fetchRoleList(newParams)
				}}
				rowKey="id"
				pagination={{
					pageSize: 10,
				}}
				// 工具栏
				toolBarRender={() => [
					// 新增按钮
					<CreateButton
						key="create"
						pathName={ROUTES.ROLEMANAGEMENT}
						callback={() => setOpenDrawerTrue()} />,
				]}
				scroll={{ x: columnScrollX(columns) }}
			/>
			{/* 抽屉表单 */}
			<Form form={form}>
				<FormTemplate reloadTable={reloadTable} open={openDrawer} setOpenDrawerFalse={setOpenDrawerFalse} />
			</Form>
		</>
	)
}
export default TableTemplate