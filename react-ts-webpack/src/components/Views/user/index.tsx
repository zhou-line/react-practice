// src/components/Views/user/index.tsx
import React from "react";
import UserInfo from "./userInfo";
import LineGraph from "@/components/Common/lineGraph";
import RadarGraph from "@/components/Common/radarGraph";
import { Row, Col } from 'antd';
import "./index.scss";

const User = () => {
    return (
        <div className="user-container">
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
                        <LineGraph/>
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <LineGraph/>
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <RadarGraph/>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default User;