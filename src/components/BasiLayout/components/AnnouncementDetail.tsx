//活动公告详情
import { useBoolean, useMount, useRequest, useUnmount } from 'ahooks'
import { Avatar, ConfigProvider, Drawer, List, Typography } from 'antd';
import { pick } from 'lodash-es'
import { FC, useState } from 'react'
import { isSuccess } from '@/utils/tools'
import { EVENTBUS_TYPE } from '@/utils/enums'
import eventBus from '@/utils/eventBus'

const { Text } = Typography;

const AnnouncementDetail: FC = () => {
  // 保存当前数据
  const [currentRecord, setCurrentRecord] = useState<any>()

  // 是否显示 Drawer
  const [open, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] = useBoolean(false)

  // 模拟接口设置消息已读
  const announcementAlready = async (params:any) => {
    console.log("模拟接口设置消息已读参数", params)
    return {
      "message": "操作成功",
      "code": 200
    }
  }
  // 公告已读
  const { runAsync: fetchAnnouncementAlready } = useRequest(async (params) => await announcementAlready(params), {
    manual: true,
  })

  // 查看详情
  const handleAnnouncementDetails = async (record: any, callback?: () => void) => {
    // 这里接收了一个函数参数，在 NoticeBell 组件中触发的查看消息详情事件，传过来的是 ”查询未读消息数量函数“
    // 调用该函数可以立即查询最新的未读消息数量，但在此应该立即触发 ”更新未读消息数量“ 事件
    console.log("查看公告详情", record)
    setCurrentRecord(record);
    setOpenDrawerTrue();
    // 设置公告已读
    await fetchAnnouncementAlready(pick(record, 'title')).then(({ code }) => {
      if (isSuccess(code)) {
        callback?.()
        // 触发 ”更新未读消息数量“ 事件
        eventBus.emit(EVENTBUS_TYPE.UPDATEUNREADYCOUNT);
      }
    })
  }

  // 退出详情
  const handlerCancel = () => {
    setCurrentRecord(undefined);
    setOpenDrawerFalse();
  }

  // 监听事件
  useMount(() => {
    // 监听别的模块查看公告详情
    eventBus.on(EVENTBUS_TYPE.ANNOUNCEMENT, handleAnnouncementDetails)
  })

  // 取消监听事件
  useUnmount(() => {
    eventBus.off(EVENTBUS_TYPE.ANNOUNCEMENT, handleAnnouncementDetails)
  })

  return (
    <Drawer open={open} onClose={handlerCancel} width={450} zIndex={1060}>
      <ConfigProvider theme={{
        components: {
          List: {
            titleMarginBottom: 0,
          },
        },
      }}>
        <List
          itemLayout="vertical"
          size="small"
          pagination={false}
          dataSource={currentRecord ? [currentRecord] : []}
          renderItem={(item) => (
            <List.Item
              key={item?.announcement_id}
            >
              <List.Item.Meta
                avatar={<Avatar src={item?.avatar_url} />}
                title={<Text ellipsis={{ tooltip: item?.title }}>{item?.title}</Text>}
                description={item?.cn_name}
              />
              <div dangerouslySetInnerHTML={{ __html: item?.content }} />
            </List.Item>
          )}
        />
      </ConfigProvider>
    </Drawer>
  )
}
export default AnnouncementDetail