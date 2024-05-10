// 分步 表单配置项
import {
	ProFormCascader,
	ProFormSelect,
	ProFormTextArea,
	ProFormTreeSelect,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, TreeSelect } from 'antd'
import { regionData } from 'element-china-area-data'
import { get, map } from 'lodash-es'
import type { FC } from 'react';

import FigureLabels from '@/components/FigureLabels'
//import { getJobsList } from '@/services/administrative/jobs-management' // 岗位管理接口
//import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import { getRoleList } from '@/services/system/role-management' // 角色管理接口
import { formatPerfix } from '@/utils/tools'
import { INTERNATION, ROUTES } from '@/utils/enums'
import type { UserInformationProps } from '@/utils/types/system/user-management'

const UserInformation: FC<UserInformationProps> = ({
	showLabel = true,
	disabledField = false,
}) => {
	const { formatMessage } = useIntl();

	// 获取角色列表
	const { data: roleList } = useRequest(async (params) => get(await getRoleList(
		{page:params.current?params.current:1,page_size:params.pageSize?params.pageSize:10}
	), 'data.list', []), {
		defaultParams: [{ current: 1, pageSize: 100 }],
	})

	return (
		<>
			{/* 所属角色 */}
			<ProFormSelect
				name="role_id"
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'role_id') })}
				colProps={{ span: 12 }}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'role_id') })}
				options={map(roleList, (r: API.ROLEMANAGEMENT) => ({ label: r.role_name, value: r.role_id }))}
				disabled={disabledField}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) + formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'role_id') }),
				}]}
			/>
			{/* 所属城市 */}
			<ProFormCascader
				name="city"
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'city') })}
				colProps={{ span: 12 }}
				fieldProps={{
					options: regionData,
					variant: "outlined"
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'city') }),
				}]}
			/>
			{/* 详细地址 */}
			<ProFormTextArea
				name="address"
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'address') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'address') })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
					rows: 4,
				}}
				rules={[{ required: true }]}
			/>
			{/* 人物标签 */}
			{
				showLabel ? <Form.Item
					label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'tags') })}
					name="tags"
				>
					<FigureLabels />
				</Form.Item> : null
			}
		</>
	)
}
export default UserInformation