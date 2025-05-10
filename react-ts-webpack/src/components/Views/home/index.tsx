import React, { useEffect } from "react";
import LineGraph from "@/components/Common/lineGraph";
import { Col, Row } from "antd";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/actions/photoAction";
import { RootState } from "@/store/store";
import RadarGraph from "@/components/Common/radarGraph";

function Home() {

    const dispatch = useDispatch()
    const loading = useSelector((state: RootState) => state.phote.loading)

    useEffect(() =>{
        setTimeout(() => {
            console.log(loading)
            dispatch(setLoading(false))
        }, 2000)
        
    }, [])

    return (
        ( !loading && <div className="home-container">
            {/* 长图表部分 */}
            <Row className="home-info-row">
                <Col xs={24} lg={24}>
                    <LineGraph name={'整体一周框选数量'}/>
                </Col>
            </Row>

            {/* 短图表部分 */}
            <Row gutter={[24, 24]} wrap className="charts-row">
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <LineGraph name={'整体一周导入图片'}/>
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <RadarGraph name={'整体一周框图类型分布'}/>
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <LineGraph name={'整体一周导出切片'}/>
                    </div>
                </Col>
            </Row>
        </div>)
    );
}

export default Home;