// 系统设置-接口管理
import { PageContainer } from '@ant-design/pro-components'
import type { FC } from 'react';

import TableTemplate from './components/TableTemplate'

const ApiManagement: FC = () => {
    return (
        <PageContainer header={{ title: null }}>
            {/* 表格列表 */}
            <TableTemplate />
        </PageContainer>
    )
}
export default ApiManagement