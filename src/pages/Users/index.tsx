import React, { useEffect } from 'react'
import { useQuery } from '@umijs/max';
import { UserList } from '@/services/user/users';

export default function index() {
  const { data, isLoading, error } = useQuery(['projects', 'user-list'], () => UserList(), {
    retry: 0, // 重试3次
    retryDelay: 1000, // 重试延迟1秒
    retryOnMount: false, // 仅在组件挂载时重试
  });
  if (isLoading) return '加载中...';
  if (error) return `发生错误`;

  return (
    <ul>
      {data?.map(project => (
        <li key={project.id}>{project.username}</li>
      ))}
    </ul>
  );
}
