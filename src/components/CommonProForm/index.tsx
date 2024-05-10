// 表单公告项
import {
  ProFormDigit,
  ProFormDigitProps,
  ProFormRadio,
  ProFormRadioGroupProps,
  ProFormSelect,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks'
import { TreeSelect } from 'antd'
import { get } from 'lodash-es'
import { FC } from 'react'

import { getUserList } from '@/services/system/user-management'
import { STATUS_OPTS } from '@/utils/const'
import { INTERNATION, STATUS } from '@/utils/enums'
import { useIntl } from '@umijs/max';

// 父级
export const ProFormParent: typeof ProFormTreeSelect = ({ fieldProps, ...props }) => {
  const { formatMessage } = useIntl();
  return (
    <ProFormTreeSelect
      name="parent_id"
      label= {formatMessage({ id: INTERNATION.PARENT_ID })} // "添加子级"
      colProps={{ span: 24 }}
      tooltip= {formatMessage({ id: INTERNATION.PARENT_ID_TIP })} // "添加子级 Tip"
      fieldProps={{
        showSearch: true,
        allowClear: true,
        treeDefaultExpandAll: true,
        showCheckedStrategy: TreeSelect.SHOW_PARENT,
        placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
          formatMessage({ id: INTERNATION.PARENT_ID }), // "添加子级 Tip"
        ...fieldProps,
      }}
      {...props}
    />
  )
}

// 状态
export const ProFormStatus: FC<ProFormRadioGroupProps> = (props) => {
  const { formatMessage } = useIntl();
  return (
    <ProFormRadio.Group
      name="status"
      colProps={{ span: 8 }}
      initialValue={STATUS.NORMAL}
      fieldProps={{
        buttonStyle: 'solid',
      }}
      label= {formatMessage({ id: INTERNATION.STATUS })} // "状态"
      options={STATUS_OPTS}
      {...props}
    />
  )
}

// 负责人
// export const ProFormLeader: FC = () => {
//   // const { formatMessage } = useIntl();
//   // 获取用户列表
//   const { data: userList } = useRequest(async (params) => get(await getUserList(params), 'data.list', []), {
//     defaultParams: [{ current: 1, pageSize: 9999 }],
//   });
//   return (
//     <ProFormSelect
//       name="leader"
//       label= "负责人"//{formatMessage({ id: INTERNATION.LEADER })}
//       colProps={{ span: 24 }}
//       placeholder="负责人" //{formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) + formatMessage({ id: INTERNATION.LEADER })}
//       options={userList?.map((u: API.USERMANAGEMENT) => ({ label: u.cn_name, value: u.user_id })) || []}
//       fieldProps={{
//         showSearch: true,
//       }}
//       rules={[{
//         required: true, message: "请选择 负责人" //formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) + formatMessage({ id: INTERNATION.LEADER }),
//       }]}
//     />
//   )
// }

// 排序
export const ProFormSort: FC<ProFormDigitProps> = (props) => {
  const { formatMessage } = useIntl();
  return (
    (
      <ProFormDigit
        label= {formatMessage({ id: INTERNATION.SORT })} // "排序" 
        name="sort"
        colProps={{ span: 24 }}
        min={1}
        max={99}
        initialValue={1}
        tooltip= {formatMessage({ id: INTERNATION.SORT_TIP })} // "排序 tooltip"
        fieldProps={{ precision: 0 }}
        {...props}
      />
    )
  )
}

// 描述
export const ProFormDescribe: FC = () => {
  const { formatMessage } = useIntl();
  return (
    <ProFormTextArea
      name="describe"
      label= {formatMessage({ id: INTERNATION.DESCRIBE })} // "描述" 
      placeholder= {formatMessage({ id: INTERNATION.PLACEHOLDER }) + formatMessage({ id: INTERNATION.DESCRIBE })} // "请输入 描述"
      colProps={{ span: 24 }}
      fieldProps={{
        showCount: true,
        maxLength: 200,
      }}
      rules={[{
        required: true,
      }]}
    />
  )
}