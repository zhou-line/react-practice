import {NavLink} from "react-router-dom";
import React, {useEffect, useState } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
    PoweroffOutlined,
    HomeOutlined,
    BellOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "@/store/store";
import { setMenuKey } from "@/store/actions/adminAction";
import "./index.scss";
import { logout } from "@/api/user";

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout

interface Props {
    collapsed: boolean,
    onCollapse: (value: boolean) => void,
}

const Sidebar = (props: Props) => {
    const messageApi = useSelector((state: RootState) => state.phote.messageApi)
    const [collapsed, setCollapsed] = useState(window.innerWidth <= 976);
    const menuKey = useSelector<RootState, string>(state => state.admin.menuKey)
    const [selectKey, setSelectKey] = useState(menuKey)
    const dispatch = useDispatch();

    const items: MenuItem[] = [
        { key: 'home', icon: <HomeOutlined />, label: (<NavLink to="">首页</NavLink>) },
        { key: 'notice', icon: <BellOutlined />, label: (<NavLink to={{pathname:'notice'}}>通知</NavLink>) },
        { key: 'analysis', icon: <PieChartOutlined />, label: (<NavLink to={{pathname:'analysis'}}>图片分析</NavLink>) },
        { key: 'resources', icon: <DesktopOutlined />, label: (<NavLink to={{pathname:'resources'}}>图片资源库</NavLink>) },
        { key: 'user', icon: <UserOutlined />, label: (<NavLink to={{pathname:'user'}}>用户信息</NavLink>) },
        { key: 'login', icon: <PoweroffOutlined />, label: (<NavLink to={"/login"} >退出登录</NavLink>), onClick: async () => {
            await logout()
            messageApi.success('退出成功')
         }},
    ];

    useEffect(() => {
      
        setSelectKey(menuKey)
    }, [menuKey])

    useEffect(() => {
        setCollapsed(props.collapsed)
    }, [props.collapsed])

    const getMenuItem = (event: any) => {
        dispatch(setMenuKey(event.key === 'login' ? 'home' : event.key))
    }

    return (
        <Sider 
            collapsible 
            collapsed={collapsed} 
            onCollapse={(value) => props.onCollapse(value)}
            className="app-sider"
        >
            <Menu
                defaultSelectedKeys={[selectKey]}
                mode="inline"
                theme="dark"
                items={items}
                selectedKeys={[selectKey]}
                onClick={getMenuItem}
            />
        </Sider>
    )
}

export default Sidebar;