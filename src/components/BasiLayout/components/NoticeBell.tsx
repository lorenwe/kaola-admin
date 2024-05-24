// 消息铃铛
import { BellOutlined } from '@ant-design/icons'
import { useIntl } from '@umijs/max'
import { useMount, useRequest, useUnmount } from 'ahooks'
import { Avatar, Badge, Card, ConfigProvider, List, Popover, Spin, Tabs } from 'antd'
import { get, map } from 'lodash-es'
import { FC, useState } from 'react'
import { AnnouncementTypeEnum } from '@/utils/const'
import { ANNOUNCEMENT_TYPE, EVENTBUS_TYPE, INTERNATION } from '@/utils/enums'
import eventBus from '@/utils/eventBus'
import type { AnnouncementType, PaginationParams } from '@/utils/types'

const NoticeBell: FC = () => {
  // 国际化工具类
  const { formatMessage } = useIntl();
  // 当前激活 tab 面板的 key
  const [activeKey, setActiveKey] = useState<API.AnnouncementType>(ANNOUNCEMENT_TYPE.ANNOUNCEMENT)
  // 当前页码
  const [current, setCurrent] = useState<number>(1)
  // 分页参数
  const paginationParams: PaginationParams = { page_size: 5, page: current }

  // 模拟接口消息数量统计
  const queryUnreadyCount = async () => {
    console.log("更新了未读消息")
    return {
      "data": {
          "total": 18,
          "announcement": 3,
          "activity": 4,
          "message": 5,
          "notification": 6
      },
      "message": "操作成功",
      "code": 200
    }
  }

  // 定义消息列表参数类型
  type AnnouncementListSearchParams = PaginationParams & {
    unready?: boolean; // 是否只查询未读消息
    type: AnnouncementType; // 消息类型
  }
  // 模拟消息列表
  const getAnnouncementList = async (params: AnnouncementListSearchParams) => {
    return {
      "data": {
          "list": [
              {
                "title": "花西子就被传谣为日本品牌向警方报案",
                "content": "<p><span style=\"color: rgb(51, 51, 51);\">近日，随着某知名主播不当言论链式风波甚嚣尘上，“花西子是日本品牌”等截图在网络上流传。对此，花西子表示：花西子品牌名中的“花”，取自于品牌理念中的“以花养妆”；“西子”则指的是西湖，灵感来自苏东坡的名句“欲把西湖比西子，淡妆浓抹总相宜”。</span></p><p><span style=\"color: rgb(51, 51, 51);\">同时，花西子接受媒体采访中对探访视频表示：2019年曾与日本某研究所有过短期产研和生产合作，2020年已停止合作。随着国内美妆研发及产业链的综合实力的持续上升，目前花西子的研发中心及生产工厂100%都在国内。</span></p><p><span style=\"color: rgb(51, 51, 51);\">据花西子产品外包装上显示，委托方为中国杭州，产地为中国上海，未有任何日本相关工厂信息。</span></p><p><span style=\"color: rgb(51, 51, 51);\">据了解，此前花西子还曾获得由新华社颁发的“中国品牌全球传播力”top10。综上网传“花西子产地为日本”“花西子是日本品牌”皆为谣言，并就此向警方报案。</span></p>",
                "type": "1", 
                "name": "lorenwe",
                "avatar_url": "http://127.0.0.1:8000/uploads/avatar/20240513090542-3984.png",
              },
              {
                "title": "官方通报已婚女子陪领导喝酒醉卧街头",
                "content": "<p><span style=\"color: rgb(51, 51, 51);\">【官方通报</span><a href=\"https://s.weibo.com/weibo?q=%23%E5%A5%B3%E5%AD%90%E9%99%AA%E9%A2%86%E5%AF%BC%E5%96%9D%E9%85%92%E9%86%89%E5%8D%A7%E8%A1%97%E5%A4%B4%23\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(235, 115, 64); background-color: rgb(255, 255, 255);\">#女子陪领导喝酒醉卧街头#</a><span style=\"color: rgb(51, 51, 51);\">：醉酒女子未婚，未发现不正当关系】据</span><a href=\"https://weibo.com/n/%E6%96%B0%E4%BA%AC%E6%8A%A5\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(235, 115, 64); background-color: rgb(255, 255, 255);\">@新京报</a><span style=\"color: rgb(51, 51, 51);\">&nbsp;报道：8月31日，网友发视频举报一女子“婚内出轨”，“多次陪领导喝酒醉卧街头”。10月6日，山东泰安通报“女子陪领导喝酒醉卧街头”调查情况。视频中醉酒女子系泰安高新区未婚副科级干部许某，视频发布者系已婚的孟某某，8月30日许某和孟某某因感情纠纷争执，将以往录制的许某醉酒视频剪辑后发至网络。调查发现，许某及视频中的两名张姓人员存在违规接受宴请问题，其中张某（男）系泰安高新区党工委委员、管委会副主任，张某（女）系泰安高新建设集团人资部部长，目前三人均已被处理。</span></p>",
                "type": "1",
                "name": "李知恩",
                "avatar_url": "http://127.0.0.1:8000/uploads/avatar/20240513081424-5560.png",
                  
              },
              {
                "title": "李佳琦们别再飘了",
                "content": "<p><em style=\"color: rgb(51, 51, 51);\"><u>&nbsp;曾经喊着“把价格打下来”的李佳琦，因在最近一场直播中回怼网友频登热搜。一时的口无遮拦，招致网络舆论的愤怒声讨。大家发现，不少网红、主播赚钱之前都很谦卑，赚钱之后变得很膨胀。但任何行业都离不开柴米油盐精打细算的普通人，一旦“飘”了，忘记了做好服务的初心，注定被厌弃淘汰。</u></em></p>",
                "type": "1",
                "name": "lorenwe",
                "avatar_url": "http://127.0.0.1:8000/uploads/avatar/20240513090542-3984.png",
              }
          ],
          "total": 3
      },
      "message": "操作成功",
      "code": 200
    }
  }
  
  // 查询不同消息类型的未读条数
  const { data: unreadyCount, loading: unreadyCountLoading, run: fetchUnreadyCount } = useRequest(
    async () => get(await queryUnreadyCount(), 'data', {}), {
    onSuccess: () => {
      setCurrent(1);
      fetchAnnouncementList();
    },
  })

  // 获取活动公告列表
  const { data: announcementList, loading: announcementListLoading, run: fetchAnnouncementList } = useRequest(
    async () => get(await getAnnouncementList({
      type: activeKey,
      unready: true,
      ...paginationParams,
    }), 'data', {}), {
    refreshDeps: [activeKey, current],
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
        label: `${formatMessage({ id: `${INTERNATION.Announcement}.type.${type}` })}(${get(unreadyCount, type, 0)})`,
        key: value,
      }))} />
  )

  // 渲染消息内容
  const renderContent = (
    <Card
      bordered={false}
      styles={{ body: { padding: 0 } }}
      style={{ boxShadow: 'none' }}
    >
      <List
        itemLayout="horizontal"
        dataSource={get(announcementList, 'list', [])}
        loading={announcementListLoading}
        pagination={{
          position: 'bottom',
          align: 'center',
          size: 'small',
          total: get(announcementList, 'total', 0),
          hideOnSinglePage: true,
          current: paginationParams.page,
          pageSize: paginationParams.page_size,
          onChange: (page) => setCurrent(page),
        }}
        renderItem={(record: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={record.avatar_url} />}
              title={
                <Badge dot offset={[5, 5]}>
                  <a onClick={() => {
                    console.log("点击了标题", record)
                    // 触发查看消息事件，并传递查询未读消息数量函数过去
                    // eventBus.emit(EVENTBUS_TYPE.ANNOUNCEMENT, record, fetchUnreadyCount)
                    eventBus.emit(EVENTBUS_TYPE.ANNOUNCEMENT, record)
                  }}>{record.title}</a>
                </Badge>
              }
              description={record.name}
            />
          </List.Item>
        )}
      />
    </Card>
  )

  // 监听事件
  useMount(() => {
    // 监听别的模块更新公告数量，在其他地方触发该事件即可自动更新未读消息数量
    eventBus.on(EVENTBUS_TYPE.UPDATEUNREADYCOUNT, fetchUnreadyCount)
  })

  // 取消监听事件
  useUnmount(() => {
    eventBus.off(EVENTBUS_TYPE.UPDATEUNREADYCOUNT, fetchUnreadyCount)
  })
  return (
    <>
      <ConfigProvider theme={{
        components: {
          Popover: { titleMinWidth: 350 },
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