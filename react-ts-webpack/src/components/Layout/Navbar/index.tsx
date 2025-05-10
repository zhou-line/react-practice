import React, { useEffect, useRef, useState } from "react";
import Head from "./head/head";
import {Layout, Space} from "antd";
import "./index.scss"
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getInfo } from "@/api/user";
import { User } from "@/constants/user";

const { Header } = Layout

const title = process.env.REACT_APP_PROJECT_NAME

const Navbar = () => {

    const ref = useRef<HTMLDivElement | null>(null);
    const [user, setUser] = useState<User>({})
    const token = useSelector<RootState, string>(state => state.admin.auth)

    useEffect(() => {
        if (token) {
            Promise.resolve(getInfo(token)).then((res: any) => {
               setUser(res.data)
            })
        }
    }, [token])

    return (
        <Header className="navbar" ref={ref}>
            <div className="navbar-content">
                <h2>{title}</h2>
                <div className="navbar-right">
                    <Space size="large">
                        <Head user={user.username ?? ''} current={ref.current}/>
                    </Space>
                </div>
            </div>
        </Header>
    );
};

export default Navbar;