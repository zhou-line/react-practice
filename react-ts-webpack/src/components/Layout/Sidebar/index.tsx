import {NavLink} from "react-router-dom";
import React, { useState } from 'react';
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

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: 'menu-1', icon: <HomeOutlined />, label: (<NavLink to="">首页</NavLink>) },
    { key: 'menu-2', icon: <BellOutlined />, label: (<NavLink to={{pathname:'notice'}}>通知</NavLink>) },
    { key: 'menu-3', icon: <PieChartOutlined />, label: (<NavLink to={{pathname:'analysis'}}>图片分析</NavLink>) },
    { key: 'menu-4', icon: <DesktopOutlined />, label: (<NavLink to={{pathname:'resources'}}>图片资源库</NavLink>) },
    { key: 'menu-5', icon: <UserOutlined />, label: (<NavLink to={{pathname:'user'}}>用户信息</NavLink>) },
    { key: 'menu-6', icon: <PoweroffOutlined />, label: (<NavLink to={"/login"} >退出登录</NavLink>) },
];

const { Sider } = Layout

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = (value: boolean) => {
        setCollapsed(value);
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => toggleCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu
                defaultSelectedKeys={['menu-1']}
                mode="inline"
                theme="dark"
                items={items}
            />
        </Sider>
    )
}

export default Sidebar;