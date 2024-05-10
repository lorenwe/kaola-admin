// 表格操作下拉菜单
import { ClusterOutlined, DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons' // antd 图标库
import { Access, useAccess } from '@umijs/max'
import { App, Button, Dropdown, MenuProps } from 'antd'
import { filter, get } from 'lodash-es'
import { FC } from 'react'

import { formatPathName, isSuccess } from '@/utils/tools'
import { INTERNATION, OPERATION } from '@/utils/enums'
// import permissions from '@/utils/permission'
import type { SysResponse } from '@/utils/types'
import { useIntl } from '@umijs/max'

type DeleteParams = {
  request: (id: string) => Promise<SysResponse> //Promise<Response>; // 删除接口 
  id: string; // 删除 id 字段
}

export type DropdownMenuProps = {
  pathName: string; // 路由字段
  addChildCallback?: () => void; // 添加子级回调
  editCallback?: () => void; // 编辑回调
  deleteParams: DeleteParams;
  reloadTable: () => void; // 刷新表格
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  pathName,
  addChildCallback,
  editCallback,
  deleteParams,
  reloadTable,
}) => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // 权限定义集合
  const access = useAccess();
  // hooks 调用
  const { modal, message } = App.useApp();
  // 国际化前缀
  const formatPerfix = formatPathName(pathName)
  // 下拉菜单
  const menuItems: MenuProps['items'] = [
    // 添加子级
    {
      label: <span>{addChildCallback ? formatMessage({ id: `menu.${formatPerfix}.${OPERATION.ADDCHILD}` }) : null}</span>,
      icon: <ClusterOutlined />,
      key: OPERATION.ADDCHILD,
      disabled: !addChildCallback,
    },
    // 编辑
    {
      label: <span>{formatMessage({ id: `menu.${formatPerfix}.${OPERATION.EDIT}` })}</span>,
      icon: <EditOutlined />,
      key: OPERATION.EDIT,
      disabled: !editCallback,
    },
    // 删除
    {
      label: <span>{formatMessage({ id: `menu.${formatPerfix}.${OPERATION.DELETE}` })}</span>,
      icon: <DeleteOutlined />,
      key: OPERATION.DELETE,
      disabled: !deleteParams,
    },
  ]

  // 点击菜单回调
  const onClickMenuItem: MenuProps['onClick'] = ({ key }) => {
    // 删除参数
    const { request, id } = deleteParams
    // 判断操作类型
    switch (key) {
      // 添加子级
      case OPERATION.ADDCHILD:
        addChildCallback?.();
        break;
      // 编辑
      case OPERATION.EDIT:
        editCallback?.();
        break;
      // 删除
      case OPERATION.DELETE:
        modal.confirm({
          title: formatMessage({ id: INTERNATION.DELETE_TITLE }),
          content: formatMessage({ id: INTERNATION.DELETE_CONTENT }),
          onOk: async () => {
            // console.log("onClickMenuItem", id)
            const data = await request(id)
            if (isSuccess(data.code)) {
              message.success(data.message)
              // 刷新表格
              reloadTable()
            }
          },
        })
        break;
    }
  };
  return (
    <Dropdown menu={{ items: filter(menuItems, ['disabled', false]), onClick: onClickMenuItem }}>
      <Button size="small">
        {formatMessage({ id: INTERNATION.OPERATION })}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}
export default DropdownMenu