//全屏
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { useFullscreen } from 'ahooks';
import { Tooltip } from 'antd'
import type { FC } from 'react'


const FullScreen: FC = () => {
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(() => document.body);
  return (
    <>
      {
        isFullscreen ?
          <Tooltip title="退出全屏">
            <FullscreenExitOutlined onClick={exitFullscreen} />
          </Tooltip>
          :
          <Tooltip title="全屏">
            <FullscreenOutlined onClick={enterFullscreen} />
          </Tooltip>
      }
    </>
  )
}

export default FullScreen