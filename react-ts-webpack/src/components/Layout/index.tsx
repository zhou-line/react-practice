import React from "react";

import Navbar from "./Navbar";
import {Layout} from "antd";
import Sidebar from "./Sidebar";
import Container from "./Main";

const Design = () => {
    
    return (
        <Layout style={{
            minHeight: '100vh',
        }}>
            <Navbar/>
            <Layout>
                <Sidebar/>
                <Container/>
            </Layout>
        </Layout>
    )
}

export default Design;