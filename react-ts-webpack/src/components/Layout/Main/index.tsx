import React from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import "./index.scss";

const { Content } = Layout;

// 优化 src/components/Layout/Main/index.tsx
const Container = () => {
    
    return (
        <Layout className="main-container">
            <Content className="main-content">
                <div className="content-wrapper">
                    <Outlet/>
                </div>  
            </Content>
        </Layout>
    );
};

export default Container;