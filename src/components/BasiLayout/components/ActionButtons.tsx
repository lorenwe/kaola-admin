// 全局通用按钮
import { EllipsisOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { KeepAliveContext, useIntl } from '@umijs/max'
import { FloatButton } from 'antd'
import { FC, useContext, useEffect, useState } from 'react'

import { INTERNATION } from '@/utils/enums'

const ActionButtons: FC = () => {
  const { formatMessage } = useIntl();
  // 刷新当前组件
  const { refreshTab } = useContext(KeepAliveContext);
  // 受控展开，需配合 trigger 一起使用
  const [open, setOpen] = useState<boolean>(false)
  const onChange = (checked: boolean) => {
    setOpen(checked);
  };

  return (
    <FloatButton.Group
      open={open}
      icon={<EllipsisOutlined />}
      trigger="hover"
      onOpenChange={onChange}
    >
      {/* Github issues*/}
      <FloatButton
        icon={<QuestionCircleOutlined />}
        onClick={() => window.open('//github.com/lorenwe/kaola-admin/issues')}
        tooltip={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.ActionButtons.github-issues` })}
      />
      {/* 项目文档 */}
      {/* <FloatButton
        onClick={() => window.open('//docs.baiwumm.com/personal-project/xmw-admin')}
        tooltip={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.ActionButtons.document` })}
      /> */}
      {/* 刷新页面 */}
      <FloatButton
        icon={<SyncOutlined />}
        onClick={() => refreshTab(location.pathname)}
        tooltip={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.ActionButtons.refresh` })} />
      {/* 回到顶部 */}
      <FloatButton.BackTop visibilityHeight={100} />
    </FloatButton.Group>
  )
}
export default ActionButtons