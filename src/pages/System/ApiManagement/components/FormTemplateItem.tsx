// 表单配置项
import { ProFormRadio, ProFormSelect, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, TreeSelect } from 'antd'
import { get, keys, map } from 'lodash-es'
import type { FC } from 'react';

import { ProFormDescribe, ProFormParent, ProFormSort, ProFormStatus } from '@/components/CommonProForm'
import { formatPerfix } from '@/utils/tools'
import { API_TYPE, INTERNATION, ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/api-management';
import { ApiMethodEnum, ApiTypeEnum } from '@/utils/const';

const FormTemplateItem: FC<Pick<FormTemplateProps, 'treeData'>> = ({treeData}) => {
	const { formatMessage } = useIntl();
	// 获取上下文表单实例
	const form = Form.useFormInstance()
	// 判断是否是添加子级，有 parent_id 并且其它字段没值
	const { parent_id, api_name } = form.getFieldsValue(true)
	// 获取当前菜单数据
	return (
		<>
			{/* 父级 */}
			<ProFormParent
				colProps={{ span: 24 }}
				fieldProps={{
					treeData,
					disabled: parent_id && !api_name,
					treeNodeFilterProp: 'name',
					fieldNames: {
						label: 'api_name',
						value: 'id',
					},
				}} 
			/>
			{/* 接口类型 */}
			<ProFormRadio.Group
				name="api_type"
				colProps={{ span: 24 }}
				label= {formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, 'api_type') })}
				radioType="button"
				initialValue={API_TYPE.API}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={keys(ApiTypeEnum).map((type: string) => ({
					value: type,
					label: formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, `api_type.${type}`) }),
				}))}
			/>
			{/* 接口名称 */}
			<ProFormText
				name="api_name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, 'api_name') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) + formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, 'api_name') })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[{ required: true }]}
			/>
			{/* 接口地址 */}
			<ProFormText
				name="api_path"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, 'api_path') })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, 'api_path') })
				}
				fieldProps={{ showCount: true, maxLength: 100 }}
			/>
			{/* 请求方式 */}
			<ProFormSelect
        name="method"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.APIMANAGEMENT, 'method') })}
				fieldProps={{
					labelInValue: true,
				}}
				options={map(ApiMethodEnum, (val, key) => ({ label: key, value: val }))}
      />
			{/* 排序 */}
			<ProFormSort colProps={{ span: 12 }} />
			{/* 状态 */}
			<ProFormStatus colProps={{ span: 12 }} />
		</>
	)
}
export default FormTemplateItem