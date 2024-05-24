// SSE 事件推送
import { useIntl } from '@umijs/max'
import { App, Avatar, Button } from 'antd'
import { isEmpty } from 'lodash-es'
import { FC, useEffect } from 'react'
import { AnnouncementTypeEnum } from '@/utils/const'
import { EVENTBUS_TYPE, INTERNATION } from '@/utils/enums'
import eventBus from '@/utils/eventBus'
import { AnnouncementType } from '@/utils/types'

const EventSourceNotice: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // hooks 调用
  const { notification } = App.useApp();

  useEffect(() => {
    // 创建 EventSource 实例
    const eventSource = new EventSource(`http://localhost:8001/`);
    // 监听事件
    eventSource.addEventListener('message', ({ data }) => {
      // 解析数据
      const record = JSON.parse(data)
      // 如果返回的是空对象，则代表的时删除，否则是新增
      if (!isEmpty(record)) {
        const { title, avatar_url, name, type } = record
        // 格式化类型
        const typeName = `${formatMessage({ id: `${INTERNATION.Announcement}.type.${AnnouncementTypeEnum[type as AnnouncementType]}` })}`
        // 弹窗提醒
        notification.open({
          message: `${name}发布了一条新${typeName}`,
          description: title,
          icon: <Avatar src={avatar_url} />,
          btn: <Button
            type="primary"
            onClick={() => eventBus.emit(EVENTBUS_TYPE.ANNOUNCEMENT, record)}>查看</Button>,
        })
      }
      // 刷新未读消息
      eventBus.emit(EVENTBUS_TYPE.UPDATEUNREADYCOUNT);
    });
    return () => {
      // 关闭
      eventSource.close();
    }
  }, [])
  return null
}
export default EventSourceNotice