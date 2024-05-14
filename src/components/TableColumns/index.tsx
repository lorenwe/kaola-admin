import { INTERNATION, LOCAL_STORAGE, OPERATION, STATUS } from '@/utils/enums'
import { formatPathName, formatPerfix, getLocalStorageItem, randomTagColor } from '@/utils/tools'
import { PlusOutlined } from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-components'
import { Access, FormattedMessage, useAccess } from '@umijs/max'
import { Button, Space, Tag } from 'antd'
import defaultSettings from '../../../config/defaultSettings';
import dayjs from 'dayjs'
import { get, reduce, toNumber } from 'lodash-es'
import { FC } from 'react'
import permissions from '@/utils/permission'

// 状态
export const statusColumn: ProColumns = {
  title: <FormattedMessage id={INTERNATION.STATUS} />,
  dataIndex: 'status',
  width: 100,
  filters: true,
  onFilter: true,
  align: 'center',
  valueEnum: {
    [STATUS.DISABLE]: { text: <FormattedMessage id={INTERNATION.STATUS_DISABLE} />, status: 'Default' },
    [STATUS.NORMAL]: { text: <FormattedMessage id={INTERNATION.STATUS_NORMAL} />, status: 'Processing' },
  },
}

// 排序
export const sortColumn: ProColumns = {
  title: <FormattedMessage id={INTERNATION.SORT} />,
  dataIndex: 'sort',
  ellipsis: true,
  hideInSearch: true,
  width: 100,
  sorter: true,
  align: 'center',
  render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
}

// 创建时间
export const createTimeColumn: ProColumns = {
  title: <FormattedMessage id={INTERNATION.CREATED_TIME} />,
  dataIndex: 'create_at',
  valueType: 'dateTime',
  hideInSearch: true,
  sorter: true,
  align: 'center',
  width: 160,
}

// 创建时间-搜索
export const createTimeInSearch: ProColumns = {
  title: <FormattedMessage id={INTERNATION.CREATED_TIME} />,
  dataIndex: 'created_time',
  valueType: 'dateRange',
  hideInTable: true,
  search: {
    transform: (value) => {
      // console.log(dayjs(value[0], "YYYY-MM-DD").format('YYYY-MM-DD 00:00:00'))
      return {
        start_time: dayjs(value[0]).format('YYYY-MM-DD 00:00:00'),
        end_time: dayjs(value[1]).format('YYYY-MM-DD 23:59:59'),
      };
    },
  },
}

// 描述
export const describeColumn: ProColumns = {
  title: <FormattedMessage id={INTERNATION.DESCRIBE} />,
  dataIndex: 'describe',
  ellipsis: true,
  width: 140,
  align: 'center',
  hideInSearch: true,
}

// 操作菜单
export const operationColumn: ProColumns = {
  title: <FormattedMessage id={INTERNATION.OPERATION} />,
  valueType: 'option',
  width: 100,
  align: 'center',
  fixed: 'right',
  key: 'option',
}


// 渲染表单标题
export const renderFormTitle = (pathName: string, id: string, name: string) => {
  const result = (
    <Space>
      <FormattedMessage id={`menu.${formatPathName(pathName)}.${id ? OPERATION.EDIT : OPERATION.ADD}`} />
      <FormattedMessage id={`pages.${formatPathName(pathName)}.title`} />
      {
        id && <div> : <span style={
            {color: get(getLocalStorageItem(LOCAL_STORAGE.LAYOUT), 'colorPrimary', defaultSettings.colorPrimary),}
          }>{name}</span>
        </div>
      }
    </Space>
  )
  return result
}

// 计算表格滚动长度
export const columnScrollX = (columns: ProColumns[]): number => 
  reduce(columns, (sum: number, record: ProColumns) => sum + (toNumber(record.width) || 100), 0)


// 新增按钮
type CreateButtonProps = {
  callback: () => void; // 点击按钮回调
  pathName: string;
}
export const CreateButton: FC<CreateButtonProps> = ({ callback, pathName }) => {
  // 权限定义集合
  const access = useAccess();
  return (
    <Access
      accessible={access.operationPermission(get(permissions, `${formatPathName(pathName)}.${OPERATION.ADD}`, ''),)}
      fallback={null}
      key="plus"
    >
      <Button type="primary" onClick={() => callback()}>
        <PlusOutlined />
        <FormattedMessage id={formatPerfix(pathName, OPERATION.ADD, true)} />
      </Button>
    </Access>
  )
}