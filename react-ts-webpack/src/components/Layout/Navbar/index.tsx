import React from "react";
import Head from "./head/head";
import {Layout} from "antd";
import "./index.scss"

const { Header } = Layout

const title = process.env.REACT_APP_PROJECT_NAME

const Navbar = () => {

    return (
        <Header className="head-container">
            <h2 >{title}</h2>
            <span>
                <Head/>
            </span>
        </Header>
    )
}

export default Navbar;