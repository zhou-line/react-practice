import React from 'react';
// useRoutes  根据路由配置  创建路由
import {useRoutes} from "react-router-dom";
import {Spin} from "antd";
import {generateRouter} from "@/routes/handleRouter";
import {RouterBeforeEach} from "@/routes/components/RouterBeforeEach";
import ProtectedRoute from "@/routes/components/ProtectedRoute ";
const Design = React.lazy(() => import('../components/Layout'));
const Home = React.lazy(() => import('../components/Views/home'));
const Page404 = React.lazy(() => import('../components/Views/404'));
const User = React.lazy(() => import('../components/Views/user'));
const Login = React.lazy(() => import('../components/Views/login'));
const Notice = React.lazy(() => import('../components/Views/notice'));
const Analysis = React.lazy(() => import('../components/Views/analysis'));
const Resources = React.lazy(() => import('../components/Views/resources'));
//导入两个页面

export interface RouteConfig {
    index?: boolean;
    path?: string;
    element: React.ReactNode;
    auth?: boolean;
    children?: RouteConfig[];
    redirect?: string;
}

export const baseRoutes: RouteConfig[] = [
    {
        path:"/",
        element: <ProtectedRoute> <Design></Design> </ProtectedRoute>,
        children: [
            {
                path: "", // index在RouteObject中默认为 false | undefined，索引路由是隐含的，不需要设置 index 属性为 true， 变成默认的二级路由
                element: <Home/>
            }, {
                path: 'notice',
                element: <Notice/>,
                auth: true
            },
            {
                path: 'analysis',
                element: <Analysis/>
            },
            {
                path: 'resources',
                element: <Resources/>
            },
            {
                path: 'user',
                element: <User/>
            }
        ]
    },
    {
        path:"/login",
        element:<Login></Login>
    },
    {
        path:"/annotation/:userId",
        element:<Home></Home>
    },
    {
        path:"/404",
        element:<Page404></Page404>
    }
]

export const RouterView = () => {
    //路由基本配置

    const router = generateRouter(baseRoutes) ?? []
    //创建路由
    const elements = useRoutes(router)
    //返回路由内容
    return (
        <React.Suspense fallback={<Spin />}>
            <RouterBeforeEach>
                {elements}
            </RouterBeforeEach>
        </React.Suspense>
    )
}
