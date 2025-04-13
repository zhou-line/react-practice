import React, { useRef } from "react";
import Head from "./head/head";
import {Layout, Space} from "antd";
import "./index.scss"

const { Header } = Layout

const title = process.env.REACT_APP_PROJECT_NAME

const user = "Chen xiao"

const Navbar = () => {

    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <Header className="navbar" ref={ref}>
            <div className="navbar-content">
                <h2>{title}</h2>
                <div className="navbar-right">
                    <Space size="large">
                        <Head user={user} current={ref.current}/>
                    </Space>
                </div>
            </div>
        </Header>
    );
};

export default Navbar;