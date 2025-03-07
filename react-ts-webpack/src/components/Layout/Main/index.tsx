import React from "react";
import {Layout, theme} from "antd";
import {Outlet} from "react-router-dom";

const { Content } = Layout;

const Container = () => {
    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();
      
    const containerStyle =  {
        backgroundColor: '#1a1e34',
    }

    const contentStyle = {
        margin: '24px 16px',
        padding: 24,
        backgroundColor: '#001529',
        borderRadius: borderRadiusLG,
    }

    return (
        <Layout style={containerStyle}>
            <Content style={contentStyle}>
                <Outlet/>
           </Content>
        </Layout>
    )
}

export default Container;