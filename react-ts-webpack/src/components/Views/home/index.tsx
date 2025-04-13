import React, { useEffect, useState } from "react";
import LineGraph from "@/components/Common/lineGraph";
import { Col, Row } from "antd";

import "./index.scss";
import BarGraph from "@/components/Common/barGraph";

function Home() {

    const [loading, setLoading] = useState(true);
   

    useEffect(() =>{
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    return (
        <div className="home-container">
            {/* 长图表部分 */}
            {!loading && <Row className="home-info-row">
                <Col xs={24} lg={24}>
                    <LineGraph/>
                </Col>
            </Row>}

            {/* 短图表部分 */}
            {!loading &&<Row gutter={[24, 24]} wrap className="charts-row">
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <LineGraph/>
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <BarGraph/>
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <LineGraph/>
                    </div>
                </Col>
            </Row>}
        </div>
    );
}

export default Home;