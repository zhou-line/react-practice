import React from 'react';
// useRoutes  根据路由配置  创建路由
import {useRoutes} from "react-router-dom";
import Design from "../components/Layout";
import Home from "../components/Views/home";
import Page404 from "../components/Views/404/404";
import User from "../components/Views/user";
import Login from "../components/Views/login";
import Notice from "../components/Views/notice";
import Analysis from "../components/Views/analysis";
import Resources from "../components/Views/resources";
//导入两个页面

const RouterView = () => {
    //路由基本配置
    const baseRoutes = [
        {
            path:"/",
            element:<Design></Design>,
            children: [
                {
                    index: true, // index设置为true 变成默认的二级路由
                    element: <Home/>
                }, {
                    path: 'notice',
                    element: <Notice/>
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
    //创建路由
    const element = useRoutes(baseRoutes)
    //返回路由内容
    return (
        <>{element}</>
    )
}

export default RouterView;