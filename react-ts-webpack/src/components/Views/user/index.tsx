// src/components/Views/user/index.tsx
import React from "react";
import UserInfo from "./userInfo";
import LineGraph from "@/components/Common/lineGraph";
import { Row, Col } from 'antd';
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import BarGraph from "@/components/Common/barGraph";

const User = () => {
     
    const loading = useSelector((state: RootState) => state.phote.loading)
    return (
        (!loading && <div className="user-container">
            {/* 用户信息部分 */}
            <Row gutter={[24, 24]} className="user-info-row">
                <Col xs={24} lg={20}>
                    <UserInfo />
                </Col>
                <Col xs={24} lg={4}>
                    <div className="user-avatar">
                        <img
                            width="100%"
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            alt="user avatar"
                        />
                    </div>
                </Col>
            </Row>

            {/* 图表部分 */}
            <Row gutter={[24, 24]} wrap className="charts-row">
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <LineGraph name={'个人一周导入图片'}/>
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <LineGraph name={'个人一周导出切片'}/>
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <BarGraph name={'个人一周框图数量'}/>
                    </div>
                </Col>
            </Row>
        </div>)
    );
};

export default User;