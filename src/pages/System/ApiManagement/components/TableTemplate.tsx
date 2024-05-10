// 角色管理-表格列表
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks';
import { App, Form, Popconfirm, Space, Switch, Tag } from 'antd'
import { get, map, toNumber } from 'lodash-es'
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
import { delApi, getApiList, setApiStatus } from '@/services/system/api-management' // 角色管理接口
import { formatPerfix, formatResponse, isSuccess, randomTagColor } from '@/utils/tools'
import { ApiMethodEnum, ApiTypeEnum, IconFont } from '@/utils/const'
import { API_METHOD_TYPE, API_TYPE, INTERNATION, ROUTES, STATUS } from '@/utils/enums'
import type { ApiStatusProps, SearchParams } from '@/utils/types/system/api-management'

import FormTemplate from './FormTemplate' // 表单组件

const TableTemplate: FC = () => {
	const { formatMessage } = useIntl();
	// hooks 调用
	const { message } = App.useApp();
	// 表单实例
	const [form] = Form.useForm<API.APIMANAGEMENT>();
	// 获取表格实例
	const tableRef = useRef<ActionType>();
	const [apiLoading, { setTrue: setApiLoadingTrue, setFalse: setApiLoadingFalse }] = useBoolean(false);
	const [id, setId] = useState<string>('')
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

	// 获取接口列表
	const {data: apiList, runAsync: fetchApiList } = useRequest(
		async (params) => formatResponse(await getApiList(params)), {
			manual: true,
		},
	)

	// 修改角色状态
	const changeApiStatus = async ({ id, status }: ApiStatusProps) => {
		const data = await setApiStatus({
			id,
			status: status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE,
		})
		if (isSuccess(data.code)) {
			message.success(data.message)
			reloadTable()
		}
		// 关闭确认框
		setApiLoadingFalse()
	}

	// 渲染设置角色状态
	const renderRoleStatus = (record: API.APIMANAGEMENT) => (
		<Popconfirm
			title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
			open={id === record.id && apiLoading}
			onConfirm={() => changeApiStatus(record)}
			onCancel={() => setApiLoadingFalse()}
			key="popconfirm"
		><Switch
				checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
				unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
				checked={record.status === STATUS.NORMAL}
				loading={id === record.id && apiLoading}
				onChange={() => { setApiLoadingTrue(); setId(record.id) }}
			/>
		</Popconfirm>
	);
	// proTable columns 配置项
	const columns: ProColumns<API.APIMANAGEMENT>[] = [
		{
			title: formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, 'api_name') }),
			dataIndex: 'api_name',
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
			title: formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, 'api_type') }),
			dataIndex: 'api_type',
			width: 120,
			filters: true,
			onFilter: true,
			align: 'center',
			valueEnum: {
				[API_TYPE.DIR]: { text: formatMessage({id: INTERNATION.API_TYPE_DIR}), status: 'Default' },
				[API_TYPE.API]: { text: formatMessage({id: INTERNATION.API_TYPE_API}), status: 'Processing' },
			},
		},
		/* 请求方式 */
		{
			title: formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, 'method') }),
			dataIndex: 'method',
			width: 120,
			align: 'center',
			filters: true,
			onFilter: true,
			valueEnum: {
				[API_METHOD_TYPE.POST]: { text: API_METHOD_TYPE.POST, status: 'Default' },
				[API_METHOD_TYPE.GET]: { text: API_METHOD_TYPE.GET, status: 'Processing' },
				[API_METHOD_TYPE.PUT]: { text: API_METHOD_TYPE.PUT, status: 'Processing' },
				[API_METHOD_TYPE.DELETE]: { text: API_METHOD_TYPE.DELETE, status: 'Processing' },
				[API_METHOD_TYPE.PATCH]: { text: API_METHOD_TYPE.PATCH, status: 'Processing' },
				[API_METHOD_TYPE.HEAD]: { text: API_METHOD_TYPE.HEAD, status: 'Processing' },
				[API_METHOD_TYPE.OPTIONS]: { text: API_METHOD_TYPE.OPTIONS, status: 'Processing' },
				[API_METHOD_TYPE.ALL]: { text: API_METHOD_TYPE.ALL, status: 'Processing' },
			},
			render: (_, record) => {
				if (record.method) {
					return <Tag color={randomTagColor()}>{ApiMethodEnum[record.method]}</Tag>
				}
			},
		},
		/* 接口地址 */
		{
			title: formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, 'api_path') }),
			dataIndex: 'api_path',
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
					pathName={ROUTES.APIMANAGEMENT}
					addChildCallback={
						() => {
							form.setFieldValue('parent_id', record.id);
							setOpenDrawerTrue();
						}
					}
					editCallback={() => {
						form.setFieldsValue(record);
						setOpenDrawerTrue()
					}}
					deleteParams={{
						request: delApi,
						id: record.id,
					}}
					reloadTable={reloadTable}
				/>
			),
		},
	]

	return (
		<>
			<ProTable<API.APIMANAGEMENT, SearchParams>
				actionRef={tableRef}
				columns={columns}
				request={async (params) => {
					return fetchApiList(params)
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
						pathName={ROUTES.APIMANAGEMENT}
						callback={() => setOpenDrawerTrue()} />,
				]}
				scroll={{ x: columnScrollX(columns) }}
			/>
			{/* 抽屉表单 */}
			<Form form={form}>
				<FormTemplate
					treeData={get(apiList, 'data', [])}
					reloadTable={reloadTable}
					open={openDrawer}
					setOpenDrawerFalse={setOpenDrawerFalse} 
				/>
			</Form>
		</>
	)
}
export default TableTemplate