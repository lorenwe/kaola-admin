// 新建表单
import { ModalForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import type { FC } from 'react';
import { renderFormTitle } from '@/components/TableColumns'
import { createApi, updateApi } from '@/services/system/api-management'
import { isSuccess } from '@/utils/tools'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/api-management'
import FormTemplateItem from './FormTemplateItem' // 表单组件 

const FormTemplate: FC<FormTemplateProps> = ({
	treeData,
	reloadTable,
	open,
	setOpenDrawerFalse,
}) => {
	// hooks 调用
	const { message } = App.useApp();
	// 上下文表单实例
	const form = Form.useFormInstance()
	// 获取表单全部字段
	const { id, api_name } = form.getFieldsValue(true)
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.APIMANAGEMENT, id, api_name)

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}

	// 提交表单
	const handlerSubmit = async (values: API.APIMANAGEMENT): Promise<void> => {
		if (id) {
			const data = await updateApi({ ...values, id})
			if (isSuccess(data.code)) {
				message.success(data.message);
				// 刷新表格
				reloadTable()
				// 关闭浮层
				handlerClose()
			}
		} else {
			const data = await createApi(values)
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
		<ModalForm<API.APIMANAGEMENT>
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
			<FormTemplateItem treeData={treeData} />
		</ModalForm>
	);
};

export default FormTemplate