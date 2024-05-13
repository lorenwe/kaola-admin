// 用户管理-表格列表
import { ManOutlined, UnlockOutlined, UserOutlined, WomanOutlined } from '@ant-design/icons'
import { ActionType, ColumnsState, ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks'
import { App, Popconfirm, Space, Switch, Tag } from 'antd'
import { cloneDeep } from 'lodash-es'
import { FC, MutableRefObject, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu' // 表格操作下拉菜单
import {
	columnScrollX,
	CreateButton,
	createTimeColumn,
	createTimeInSearch,
	operationColumn,
	sortColumn,
	statusColumn,
} from '@/components/TableColumns'
import { delUser, getUserList, setUserStatus } from '@/services/system/user-management' // 用户管理接口
import { decryptionAesPsd, formatPerfix, formatResponse, isSuccess, renderColumnsStateMap } from '@/utils/tools'
import { IconFont } from '@/utils/const'
import { INTERNATION, ROUTES, SEX, STATUS } from '@/utils/enums'
import type { SearchParams } from '@/utils/types/system/user-management'

import FormTemplate from './FormTemplate' // 表单组件

const TableTemplate: FC = () => {
	const { formatMessage } = useIntl();
	// hooks 调用
	const { message } = App.useApp();
	// 分步表单实例
	const stepFormMapRef = useRef<MutableRefObject<ProFormInstance>[]>([]);
	// 获取表格实例
	const tableRef = useRef<ActionType>();
	// 设置用户状态
	const [userLoading, { setTrue: setUserLoadingTrue, setFalse: setUserLoadingFalse }] = useBoolean(false);
	const [userId, setUserId] = useState<string>('')
	// Modal 框显隐
	const [modalVisible, { setTrue: setModalVisibleTrue, setFalse: setModalVisibleFalse }] = useBoolean(false);
	// 受控的表格设置栏
	const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>(renderColumnsStateMap([
		'sort',
		'age',
	]));
	// 跟随主题色变化
	const PrimaryColor = useEmotionCss(({ token }) => {
		return { color: token.colorPrimary, fontSize: 16 };
	});
	// 手动触发刷新表格
	function reloadTable() {
		tableRef?.current?.reload()
	}

	// 获取用户管理列表
	const { runAsync: fetchUserList } = useRequest(
		async (params) => formatResponse(await getUserList(params)), {
		manual: true,
	})

	// 设置用户状态
	const changeUserStatus = async ({ id, status }: API.USERMANAGEMENT) => {
		const data = await setUserStatus({
			id,
			status: status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE,
		})
		if (isSuccess(data.code)) {
			message.success(data.message)
			reloadTable()
		}
		// 关闭确认框
		setUserLoadingFalse()
	}

	// 渲染设置角色状态
	const renderRoleStatus = (record: API.USERMANAGEMENT) => (
		<Popconfirm
			title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
			open={userId === record.id as string && userLoading}
			onConfirm={() => changeUserStatus(record)}
			onCancel={() => setUserLoadingFalse()}
			key="popconfirm"
		><Switch
				checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
				unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
				checked={record.status === STATUS.NORMAL}
				loading={userId === record.id as string && userLoading}
				onChange={() => { setUserLoadingTrue(); setUserId(record.id as string) }}
			/>
		</Popconfirm>
	);

	// proTable columns 配置项
	const columns: ProColumns<API.USERMANAGEMENT>[] = [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 48,
			align: 'center',
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'username') }),
			dataIndex: 'username',
			ellipsis: true,
			width: 100,
			align: 'center',
			render: (text) => <Space>
				<Tag
					icon={<UserOutlined className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'nickname') }),
			dataIndex: 'nickname',
			hideInSearch: true,
			ellipsis: true,
			align: 'center',
			width: 80,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'avatar') }),
			dataIndex: 'avatar',
			key: 'avatar',
			valueType: 'image',
			width: 80,
			hideInSearch: true,
			align: 'center',
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'sex') }),
			dataIndex: 'sex',
			ellipsis: true,
			align: 'center',
			width: 60,
			filters: true,
			onFilter: true,
			valueEnum: {
				[SEX.FEMALE]: {
					text: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'sex.female') }),
					status: 'Default',
				},
				[SEX.MALE]: {
					text: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'sex.male') }),
					status: 'Processing',
				},
				[SEX.PRIVACY]: {
					text: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'sex.secret') }),
					status: 'Processing',
				},
			},
			render: (_, record) => {
				const colors: Record<string, string> = { 0: '#ff45cb', 1: '#0091ff' }
				const styles = { fontSize: 20 }
				switch(record.sex) { 
					case SEX.FEMALE: { 
						return <WomanOutlined style={{ color: colors[record.sex], ...styles }} />
					} 
					case SEX.MALE: { 
						return <ManOutlined style={{ color: colors[record.sex], ...styles }} />
					} 
					case SEX.PRIVACY: {
						return <UnlockOutlined style={styles} className={PrimaryColor} />    
					}
				}
			},
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'role_id') }),
			dataIndex: 'role_name',
			hideInSearch: true,
			ellipsis: true,
			width: 120,
			align: 'center',
			render: (text) => <Space>
				<Tag
					icon={<IconFont type="icon-user" className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'age') }),
			dataIndex: 'age',
			hideInSearch: true,
			ellipsis: true,
			align: 'center',
			width: 60,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'phone') }),
			dataIndex: 'phone',
			hideInSearch: true,
			width: 100,
			ellipsis: true,
			align: 'center',
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
		{
			...operationColumn,
			render: (_, record) => (
				<DropdownMenu
					pathName={ROUTES.USERMANAGEMENT}
					editCallback={() => {
						const result = cloneDeep(record)
						// console.log("editCallback", record)
						// 表单数据回显处理,密码解密
						// result.password = result.confirmPassword = decryptionAesPsd(record.password)
						// 编辑场景下需要使用formMapRef循环设置formData
						stepFormMapRef?.current?.forEach((formInstanceRef) => {
							formInstanceRef?.current?.setFieldsValue(result);
						});
						setModalVisibleTrue()
					}}
					deleteParams={{
						request: delUser,
						id: record.id as string,
					}}
					reloadTable={reloadTable}
				/>
			),
		},
	]

	return (
		<>
			<ProTable<API.USERMANAGEMENT, SearchParams>
				actionRef={tableRef}
				columns={columns}
				request={async (params) => {
					let {current, pageSize, ...newParams} = params;
					newParams.page      = current?current:1;
					newParams.page_size = pageSize?pageSize:10;
					return fetchUserList(newParams)
				}}
				rowKey="id"
				pagination={{ pageSize: 5 }}
				columnsState={{
					value: columnsStateMap,
					onChange: setColumnsStateMap,
				}}
				// 工具栏
				toolBarRender={() => [
					// 新增按钮
					<CreateButton
						key="create"
						pathName={ROUTES.USERMANAGEMENT}
						callback={() => setModalVisibleTrue()} />,
				]}
				scroll={{ x: columnScrollX(columns) }}
			/>
			{/* 分步表单 */}
			<FormTemplate
				reloadTable={reloadTable}
				modalVisible={modalVisible}
				setModalVisibleFalse={setModalVisibleFalse}
				stepFormMapRef={stepFormMapRef}
			/>
		</>
	)
}
export default TableTemplate