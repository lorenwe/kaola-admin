// 消息铃铛

import { BellOutlined } from '@ant-design/icons'
// import { useIntl } from '@umijs/max'
import { useMount, useRequest, useUnmount } from 'ahooks'
import { Avatar, Badge, Card, ConfigProvider, List, Popover, Spin, Tabs } from 'antd'
import { get, map } from 'lodash-es'
import { FC, useState } from 'react'

import { getAnnouncementList, queryUnreadyCount } from '@/services/administrative/announcement'
import { formatPerfix } from '@/utils/tools'
import { AnnouncementTypeEnum } from '@/utils/const'
import { ANNOUNCEMENT_TYPE, EVENTBUS_TYPE, ROUTES } from '@/utils/enums'
import eventBus from '@/utils/eventBus'
import type { PaginationParams } from '@/utils/types'

const NoticeBell: FC = () => {
  // 国际化工具类
  // const { formatMessage } = useIntl();
  // 当前激活 tab 面板的 key
  const [activeKey, setActiveKey] = useState<API.AnnouncementType>(ANNOUNCEMENT_TYPE.ANNOUNCEMENT)
  // 当前页码
  const [current, setCurrent] = useState<number>(1)
  // 分页参数
  const paginationParams: PaginationParams = { pageSize: 5, current }

  // 获取活动公告列表
  const { data: announcementList, loading: announcementListLoading, run: fetchAnnouncementList } = useRequest(
    async () => get(await getAnnouncementList(), 'data', {}), {
    refreshDeps: [activeKey, current],
  })

  // 查询不同消息类型的未读条数
  const { data: unreadyCount, loading: unreadyCountLoading, run: fetchUnreadyCount } = useRequest(
    async () => get(await queryUnreadyCount(), 'data', {}), {
    onSuccess: () => {
      setCurrent(1);
      fetchAnnouncementList();
    },
  })

  // 消息类型
  const renderAnnouncementType = (
    <Tabs
      activeKey={activeKey}
      centered
      onChange={(key) => {
        setActiveKey(key);
        setCurrent(1);
      }}
      items={map(AnnouncementTypeEnum, (type: string, value: string) => ({
        label: `消息类型`,
        key: value,
      }))} />
  )

  // 渲染消息内容
  const renderContent = (
    <Card
      bodyStyle={{ padding: 0 }}
      bordered={false}
      style={{ boxShadow: 'none' }}
    >
      <List
        itemLayout="horizontal"
        dataSource={[]}
        loading={true}
        pagination={{
          position: 'bottom',
          align: 'center',
          size: 'small',
          total: 0,
          hideOnSinglePage: true,
          ...paginationParams,
          onChange: (page) => setCurrent(page),
        }}
        renderItem={(record: API.ANNOUNCEMENT) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={record.avatar_url} />}
              title={
                <Badge dot offset={[5, 5]}>
                  <a onClick={() => {
                    eventBus.emit(EVENTBUS_TYPE.ANNOUNCEMENT, record, fetchUnreadyCount);
                  }}>{record.title}</a></Badge>}
              description={record.cn_name}
            />
          </List.Item>
        )}
      />
    </Card>
  )

  useMount(() => {
    eventBus.on(EVENTBUS_TYPE.UPDATEUNREADYCOUNT, fetchUnreadyCount)
  })

  useUnmount(() => {
    eventBus.off(EVENTBUS_TYPE.UPDATEUNREADYCOUNT, fetchUnreadyCount)
  })
  return (
    <>
      <ConfigProvider theme={{
        components: {
          Popover: { minWidth: 350 },
          Tabs: { horizontalMargin: '0' },
        },
      }}>
        <Popover title={renderAnnouncementType} content={renderContent}>
          <Spin spinning={unreadyCountLoading} size="small">
            <Badge count={get(unreadyCount, 'total', 0)} size="small">
              <BellOutlined />
            </Badge>
          </Spin>
        </Popover>
      </ConfigProvider>
    </>
  )
}
export default NoticeBell