// 分步 表单配置项
import { ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import type { FC } from 'react';
import { ProFormSort, ProFormStatus } from '@/components/CommonProForm'
import { formatPerfix } from '@/utils/tools'
import { SEX_OPTS } from '@/utils/const'
import { INTERNATION, ROUTES, SEX } from '@/utils/enums'

const PersonalInformation: FC<{ disabledField?: boolean }> = ({ disabledField = false }) => {
	const { formatMessage } = useIntl();
	return (
		<>
			{/* 用户名称 */}
			<ProFormText
				name="username"
				colProps={{ span: 12 }}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'username') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'username') })}
				disabled={disabledField}
				fieldProps={{
					showCount: true,
					maxLength: 20,
				}}
				rules={[
					{ required: true, whitespace: true },
					{
						pattern: /^[a-zA-Z0-9_-]{4,16}$/,
						message: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'username.rules') }),
					},
				]}
			/>
			{/* 年龄 */}
			<ProFormDigit
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'age') })}
				name="age"
				colProps={{ span: 12 }}
				min={1}
				max={120}
				initialValue={18}
				fieldProps={{ precision: 0 }}
			/>
			{/* 性别 */}
			<ProFormRadio.Group
				name="sex"
				colProps={{ span: 12 }}
				initialValue={SEX.MALE}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'sex') })}
				options={SEX_OPTS}
			/>
			{/* 手机号码 */}
			<ProFormText
				name="phone"
				colProps={{ span: 12 }}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'phone') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'phone') })}
				fieldProps={{
					showCount: true,
					maxLength: 11,
				}}
				rules={[
					{ required: true, whitespace: true },
					{
						pattern: /^1\d{10}$/,
						message: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'phone.rules') }),
					},
				]}
			/>
			{/* 排序 */}
			<ProFormSort colProps={{ span: 12 }} />
			{/* 状态 */}
			<ProFormStatus colProps={{ span: 12 }} />
			{/* 用户名称 */}
			<ProFormText
				name="motto"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'motto') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'motto') })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
			/>
		</>
	)
}
export default PersonalInformation