// 表单配置项
import { ProFormDependency, ProFormRadio, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { getLocale, useIntl } from '@umijs/max';
import { useRequest } from 'ahooks'
import { Divider, Form, TreeSelect, Typography } from 'antd';
import { get, keys } from 'lodash-es';
import type { FC } from 'react';
import { ProFormParent, ProFormSort, ProFormStatus } from '@/components/CommonProForm'
import { getInternationalList } from '@/services/system/internationalization'
import { MenuTypeEnum } from '@/utils/const'
import { INTERNATION, MENU_TYPE, ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/menu-management';
import MenuFormRender from './MenuFormRender';
import { formatPerfix } from '@/utils/tools';
import { getApiList } from '@/services/system/api-management';

const { Title } = Typography;

const FormTemplateItem: FC<Pick<FormTemplateProps, 'treeData'>> = ({ treeData }) => {
	const { formatMessage } = useIntl();
	// 获取上下文表单实例
	const form = Form.useFormInstance()
	// 判断是否是添加子级，有 parent_id 并且其它字段没值
	const { parent_id, name } = form.getFieldsValue(true)
	// 获取国际化列表
	const {data: internationalData } = useRequest(async () => get(await getInternationalList({ is_menu: true }), 'data', []))

	// 获取接口列表
	const {data: apiData } = useRequest(async () => get(await getApiList({status: 1}), 'data', []))

	// 是按钮就显示
	const isMenuRender = (
		<>
			{/* 组件路径 */}
			<ProFormText
				name="component"
				colProps={{ span: 12 }}
				label= {formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'component') })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'component') })
				}
				fieldProps={{ showCount: true, maxLength: 200 }}
			/>
			{/* 重定向 */}
			<ProFormText
				name="redirect"
				colProps={{ span: 12 }}
				label= {formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'redirect') })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'redirect') })
				}
				fieldProps={{ showCount: true, maxLength: 100 }}
			/>
		</>
	);
	// 不是按钮就隐藏这些选项
	const unButtonRender = (
		<>
			{/* 路由地址 */}
			<ProFormText
				name="path"
				colProps={{ span: 12 }}
				label= {formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'path') })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'path') })
				}
				fieldProps={{ showCount: true, maxLength: 100 }}
				rules={[{ required: true }]}
			/>
			{/* 图标 */}
			<ProFormText
				name="icon"
				colProps={{ span: 12 }}
				label= {formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'icon') })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'icon') })
				}
				tooltip={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'icon.tooltip') })}
				fieldProps={{ showCount: true, maxLength: 50 }}
			/>
		</>
	);
	return (
		<>
			{/* 菜单类型 */}
			<ProFormRadio.Group
				name="menu_type"
				colProps={{ span: 10 }}
				label= {formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'menu_type') })}
				radioType="button"
				initialValue={MENU_TYPE.DIR}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={keys(MenuTypeEnum).map((type: string) => ({
					value: type,
					label: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, `menu_type.${type}`) }),
				}))}
			/>
			{/* 父级 */}
			<ProFormParent
				colProps={{ span: 14 }}
				fieldProps={{
					treeData,
					disabled: parent_id && !name,
					treeNodeFilterProp: getLocale(),
					fieldNames: {
						label: getLocale(),
						value: 'id',
					},
				}}
			/>
			{/* 基本信息横线 */}
			<Divider orientation="left" style={{ marginTop: 0, marginBottom: '24px' }}>
				<Title level={4} style={{ marginBottom: 0 }}>
					{formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'basic-info') })}
				</Title>
			</Divider>
			{/* 菜单名称 */}
			<ProFormTreeSelect
				name="language_id"
				label={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'name') })}
				colProps={{ span: 12 }}
				tooltip={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'name.tooltip') })}
				fieldProps={{
					treeData: internationalData,
					fieldNames: {
						label: getLocale(),
						value: 'id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder:
						formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'name') }),
				}}
				rules={[{ required: true }]}
			/>
			<ProFormDependency name={['menu_type']}>
				{({ menu_type }) => {
					return menu_type === MENU_TYPE.MENU ? isMenuRender : null;
				}}
			</ProFormDependency>
			<ProFormDependency name={['menu_type']}>
				{({ menu_type }) => {
					return menu_type !== MENU_TYPE.BUTTON ? unButtonRender : null;
				}}
			</ProFormDependency>

			{/* 权限标识 */}
			<ProFormText
				name="permission"
				colProps={{ span: 12 }}
				label={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission') })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission') })
				}
				tooltip={formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission.tooltip') })}
				fieldProps={{ showCount: true, maxLength: 100 }}
			/>
			{/* 排序 */}
			<ProFormSort colProps={{ span: 8 }} />
			{/* 状态 */}
			<ProFormStatus colProps={{ span: 8 }} />
			{/* 依赖接口配置横线 */}
			<Divider orientation="left" style={{ marginTop: 0, marginBottom: 24 }}>
				<Title level={4} style={{ marginBottom: 0 }}>
					{formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.route-config` })}
				</Title>
			</Divider>
			{/* 菜单权限 */}
			<ProFormTreeSelect
				name="menu_api"
				label={formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'menu_permission') })}
				colProps={{ span: 24 }}
				fieldProps={{
					treeNodeFilterProp: 'api_name',
					treeDefaultExpandAll: true,
					treeData: apiData,
					allowClear: true,
					fieldNames: {
						label: 'api_name',
						value: 'id',
					},
					maxTagCount: 10,
					treeCheckable: true,
					showCheckedStrategy: TreeSelect.SHOW_ALL,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) + formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'menu_permission') }),
				}}
			/>
			<ProFormDependency name={['menu_type']}>
				{({ menu_type }) => {
					return menu_type === MENU_TYPE.MENU ? <MenuFormRender /> : null;
				}}
			</ProFormDependency>
		</>
	);
};
export default FormTemplateItem;
