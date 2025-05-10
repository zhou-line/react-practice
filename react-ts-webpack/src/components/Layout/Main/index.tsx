import React from "react";
import {Layout, Spin} from "antd";
import {Outlet} from "react-router-dom";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const { Content } = Layout;

// 优化 src/components/Layout/Main/index.tsx
const Container = () => {

    const loading = useSelector((state: RootState) => state.phote.loading)
    
    return (
        <Spin spinning={loading} tip="Loading..." className="spin-container" style={{top: '160px', color: '#ffffff'}}>
            <Layout className="main-container">
                <Content className="main-content">
                    <div className="content-wrapper">
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Spin>  
    );
};

export default Container;