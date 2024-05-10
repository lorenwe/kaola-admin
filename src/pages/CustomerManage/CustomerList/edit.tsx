import { useParams } from '@umijs/max';
import React from 'react'

export default function edit(props:any) {
  const params  = useParams();
  console.log(props, params)
  return (
    <div>
      编辑客户 -- {params.id}
    </div>
  )
}
