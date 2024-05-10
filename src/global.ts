
console.log("执行 global.ts")
// 获取路由数据
import message from 'antd/es/message';


async function getUserRouter() {
  //const result = await UserRouters().then();
  //(window as any).dynamicRoutes = result;
  // 获取用户token
  // 传参token
  try {
    const { data: routesData } = await fetch('/api/v1/router', {
      method: 'POST',
    }).then((res) => res.json());
    if (routesData) {
      window.dynamic_route = routesData;
      // console.log("打印数据", window.dynamic_route)
    }
  } catch {
    message.error('路由加载失败');
  }
}
await getUserRouter()