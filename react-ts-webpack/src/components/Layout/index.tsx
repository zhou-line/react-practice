import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import {Layout} from "antd";
import Sidebar from "./Sidebar";
import Container from "./Main";
import "./index.scss"; 

const Design = () => {

    const [isMobile, setIsMobile] = useState(false);

    const toggleCollapsed = (value: boolean) => {
        setIsMobile(value);
    };
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 976);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <Layout className="app-layout">
            <Navbar/>
            <Layout className="site-layout">
                <Sidebar collapsed={isMobile} onCollapse={toggleCollapsed} />
                <Layout>
                    <Container/>     
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Design;