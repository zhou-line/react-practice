import AlertMessage from "@/components/Common/alertMessage";
import { Col, Row } from "antd";
import React from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Notice = () => {
    const loading = useSelector((state: RootState) => state.phote.loading)

    return (
        ( !loading && <div className="notice-container">
            <Row gutter={[24, 24]} wrap className="notice-row" align="top">
                <Col xs={24} sm={12}>
                    <div className="notice-card">
                        <h3>公告</h3>
                        <div className="notice-card-content">
                            <AlertMessage message={"123"} type={"warning"}/>
                            <AlertMessage message={"234"} type={"warning"}/>
                            <AlertMessage message={"345"} type={"warning"}/>
                            <AlertMessage message={"456"} type={"warning"}/>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={12}>
                    <div className="notice-card">
                        <h3>系统消息</h3>
                        <div className="notice-card-content">
                            <AlertMessage message={"123"} type={"warning"}/>
                            <AlertMessage message={"234"} type={"warning"}/>
                            <AlertMessage message={"345"} type={"warning"}/>
                            <AlertMessage message={"456"} type={"warning"}/>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>)
    );
}

export default Notice;