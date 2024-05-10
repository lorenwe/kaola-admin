import { DrawerForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import type { FC } from 'react';
import { formatResponse, isSuccess } from '@/utils/tools'
import { renderFormTitle } from '@/components/TableColumns'
import { FormTemplateProps } from '@/utils/types/system/menu-management';
import { createMenu, updateMenu } from '@/services/system/menu-management';
import { getLocale } from '@umijs/max';
import { ROUTES } from '@/utils/enums';
import FormTemplateItem from './FormTemplateItem'

const FormTemplate: FC<FormTemplateProps> = ({
	treeData,
	reloadTable,
	open,
	setOpenDrawerFalse,
}) => {
	// console.log("FormTemplate", treeData)
	// hooks 调用
	const { message } = App.useApp();
	// 上下文表单实例
	const form = Form.useFormInstance()
	// 获取表单全部字段
	const { id, ...formValue } = form.getFieldsValue(true)
	// console.log("form.getFieldsValue", id, form.getFieldsValue(true));
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.MENUMANAGEMENT, id, formValue[getLocale()])

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async (values: API.MENUMANAGEMENT): Promise<void> => {
		// console.log("handlerSubmit",values);
		// 请求接口
		if (id) {
			const data = await updateMenu({ ...values, id })
			console.log(data)
			if (isSuccess(data.code)) {
				message.success(data.message)
				// 刷新表格
				reloadTable()
				// 关闭浮层
				handlerClose()
			} else {
				message.error(data.message)
			}
		} else {
			const data = await createMenu(values)
			console.log(data)
			if (isSuccess(data.code)) {
				message.success(data.message);
				// 刷新表格
				reloadTable()
				// 关闭浮层
				handlerClose()
			} else {
				message.error(data.message)
			}
		}
	}
	return (
		<DrawerForm<API.MENUMANAGEMENT>
			title={formTitle}
			width={550}
			grid
			form={form}
			open={open}
			autoFocusFirstInput
			drawerProps={{ maskClosable: false, onClose: () => handlerClose() }}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={handlerSubmit}
		>
			<FormTemplateItem treeData={treeData} />
		</DrawerForm>
	);
};

export default FormTemplate