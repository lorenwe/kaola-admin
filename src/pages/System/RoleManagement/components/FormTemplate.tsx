// 新建表单
import { ModalForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import type { FC } from 'react';

import { renderFormTitle } from '@/components/TableColumns'
import { createRole, updateRole } from '@/services/system/role-management'
import { isSuccess } from '@/utils/tools'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/role-management'

import FormTemplateItem from './FormTemplateItem' // 表单组件 
import { useRequest } from 'ahooks';
import { get } from 'lodash-es';
import { getMenuList } from '@/services/system/menu-management';

const FormTemplate: FC<FormTemplateProps> = ({ reloadTable, open, setOpenDrawerFalse }) => {
	// hooks 调用
	const { message } = App.useApp();
	// 上下文表单实例
	const form = Form.useFormInstance()
	// 获取表单全部字段
	const { id, role_name } = form.getFieldsValue(true)
	// console.log("role FormTemplate",form.getFieldsValue(true))
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.MENUMANAGEMENT, id, role_name)
	// 获取当前菜单数据--在这里获取树形结构以解决异步获取树形结构出现的警告  
	// Warning: Tree missing follow keys: ..
	const { data: menuData } = useRequest(async (params) => get(await getMenuList(params), 'data', []), {
		defaultParams: [{ is_role: true }],
	})

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async (values: API.ROLEMANAGEMENT): Promise<void> => {
		if (id) {
			const data = await updateRole({ ...values, id})
			if (isSuccess(data.code)) {
				message.success(data.message);
				// 刷新表格
				reloadTable()
				// 关闭浮层
				handlerClose()
			}
		} else {
			const data = await createRole(values)
			if (isSuccess(data.code)) {
				message.success(data.message);
				// 刷新表格
				reloadTable()
				// 关闭浮层
				handlerClose()
			}
		}
	}
	return (
		<ModalForm<API.ROLEMANAGEMENT>
			title={formTitle}
			width={500}
			grid
			form={form}
			open={open}
			autoFocusFirstInput
			modalProps={{
				maskClosable: false,
				onCancel: () => handlerClose(),
			}}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={handlerSubmit}
		>
			<FormTemplateItem menuData={menuData} />
		</ModalForm>
	);
};

export default FormTemplate