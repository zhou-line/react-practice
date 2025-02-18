import React from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";

const { Content } = Layout;

const Container = () => {
    return (
        <Content>
            <Outlet/>
        </Content>
    )
}

export default Container;