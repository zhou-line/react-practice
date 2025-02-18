import React from "react";
import Head from "./head/head";
import styles from './index.module.css';
import {Layout} from "antd";

const { Header } = Layout

const title = process.env.REACT_APP_PROJECT_NAME

const Navbar = () => {

    return (
        <Header className={styles.container}>
            <h2 >{title}</h2>
            <span>
                <Head/>
            </span>
        </Header>
    )
}

export default Navbar;