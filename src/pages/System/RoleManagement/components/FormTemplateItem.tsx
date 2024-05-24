// 表单配置项
import { ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { TreeSelect } from 'antd'
import type { FC } from 'react';
import { ProFormDescribe, ProFormSort, ProFormStatus } from '@/components/CommonProForm'
import { formatPerfix } from '@/utils/tools'
import { INTERNATION, ROUTES } from '@/utils/enums'
import type { FormTemplateItemProps } from '@/utils/types/system/role-management';
import { getLocale } from '@umijs/max';

const FormTemplateItem: FC<FormTemplateItemProps> = ({menuData}) => {
	const { formatMessage } = useIntl();
	return (
		<>
			{/* 角色名称 */}
			<ProFormText
				name="role_name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_name') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_name') })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[
					{ required: true, message: '' },
					{
						validator: (_, value) => {
							if (!value) {
								return Promise.reject(new Error(formatMessage({ id: INTERNATION.PLACEHOLDER }) +
									formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_name') })))
							} else if (value.length < 2) {
								return Promise.reject(new Error(
									formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_name.validator') })))
							}
							return Promise.resolve()
						},
					},
				]}
			/>
			{/* 角色编码 */}
			<ProFormText
				name="role_code"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_code') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_code') })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[{ required: true }]}
			/>
			{/* 菜单权限 */}
			<ProFormTreeSelect
				name="role_menu"
				label={formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'menu_permission') })}
				colProps={{ span: 24 }}
				fieldProps={{
					treeNodeFilterProp: getLocale(),
					treeDefaultExpandAll: true,
					treeData: menuData,
					allowClear: true,
					fieldNames: {
						label: getLocale(),
						value: 'menu_id',
					},
					maxTagCount: 10,
					treeCheckable: true,
					showCheckedStrategy: TreeSelect.SHOW_ALL,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'menu_permission') }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'menu_permission') }),
				}]}
			/>
			{/* 排序 */}
			<ProFormSort />
			{/* 状态 */}
			<ProFormStatus />
			{/* 描述 */}
			<ProFormDescribe />
		</>
	)
}
export default FormTemplateItem