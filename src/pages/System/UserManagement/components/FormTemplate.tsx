// 用户管理-新建表单
import { StepsForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { useCounter } from 'ahooks'
import { App, Modal } from 'antd';
import { subtract } from 'lodash-es'
import { FC } from 'react';
import StrengthMeter from '@/components/StrengthMeter' // 密码强度校验
import { renderFormTitle } from '@/components/TableColumns'
import { createUser, updateUser } from '@/services/system/user-management'
import { formatPerfix, isSuccess } from '@/utils/tools'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/user-management'

import { PersonalInformation, SetAvatar, UserInformation } from '../steps'

const FormTemplate: FC<FormTemplateProps> = ({
	reloadTable,
	modalVisible,
	setModalVisibleFalse,
	stepFormMapRef,
}) => {
	const { formatMessage } = useIntl()
	// hooks 调用
	const { message } = App.useApp();
	// 获取表单全部字段
	const { id, username } = stepFormMapRef.current[0]?.current?.getFieldsValue(true) || {}
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.USERMANAGEMENT, id, username)

	// 提交表单
	const handlerSubmit = async (values: API.USERMANAGEMENT) => {
		// 将密码加密
		// values.password = encryptionAesPsd(values.password)
		// 提交数据
		if (id) {
			const data = await updateUser({ ...values, id })
			if (isSuccess(data.code)) {
				message.success(data.message);
				// 刷新表格
				reloadTable()
				// 关闭浮层
				setModalVisibleFalse()
			} else {
				message.error(data.message);
			}
		} else {
			const data = await createUser(values)
			if (isSuccess(data.code)) {
				message.success(data.message);
				// 刷新表格
				reloadTable()
				// 关闭浮层
				setModalVisibleFalse()
			} else {
				message.error(data.message);
			}
		}
	}

	// 分步组件对应的组件
	const StepComponents = [
		// 个人信息
		{
			title: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.personal-information'),
			component: <PersonalInformation />,
		},
		// 用户信息
		{
			title: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.user-information'),
			component: <UserInformation />,
		},
		// 设置头像
		{
			title: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.set-avatar'),
			component: <SetAvatar />,
		},
		// 设置密码
		{
			title: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.set-password'),
			component: <StrengthMeter />,
		},
	]

	// 当前表单的步骤数，从 0 开始
	const [current, { set: setCurrent, reset: resetCurrent }] = useCounter(0, { min: 0, max: subtract(StepComponents.length, 1) })

	return (
		<StepsForm
			current={current}
			formMapRef={stepFormMapRef}
			onFinish={handlerSubmit}
			onCurrentChange={(current) => setCurrent(current)}
			stepsFormRender={(dom, submitter) => {
				return (
					<Modal
						title={formTitle}
						width={800}
						onCancel={() => {
							// 重置表单
							stepFormMapRef?.current?.forEach((formInstanceRef) => {
								formInstanceRef?.current?.resetFields();
							});
							resetCurrent();
							setModalVisibleFalse();
						}}
						open={modalVisible}
						footer={submitter}
						maskClosable={false}
						forceRender
					>
						{dom}
					</Modal>
				);
			}}
		>
			{/* 遍历渲染 Step */}
			{
				StepComponents.map((step, index) => {
					return (
						<StepsForm.StepForm
							title={formatMessage({ id: step.title })}
							grid={index !== 2}
							key={step.title}
						>
							{step.component}
						</StepsForm.StepForm>
					)
				})
			}
		</StepsForm>
	);
};

export default FormTemplate