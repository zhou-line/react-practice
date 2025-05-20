import React, { useEffect, useState } from "react";
import LineGraph from "@/components/Common/lineGraph";
import { Col, Row } from "antd";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/actions/photoAction";
import { RootState } from "@/store/store";
import RadarGraph from "@/components/Common/radarGraph";
import { getALLData } from "@/api/app";

function Home() {

    const dispatch = useDispatch()
    const loading = useSelector((state: RootState) => state.phote.loading)
    const [radar, setRadar] = useState([])
    const [slice, setSlice] = useState([])
    const [num, setNum] = useState([])
    const [pic, setPic] = useState([])
    useEffect(() =>{
        const init = async () => {
            const res = await getALLData() as any
            if (res?.code === 200) {
                const data = res.data
                setRadar(data.rada_data)
                setSlice(data.slice_data)
                setNum(data.num_data)
                setPic(data.pic_data)
            }
            console.log(slice)
            console.log(pic)
            console.log(num)
            dispatch(setLoading(false))
        }
        init()
    }, [])

    return (
        ( !loading && <div className="home-container">
            {/* 长图表部分 */}
            <Row className="home-info-row">
                <Col xs={24} lg={24}>
                    <LineGraph name={'整体一周存在框选数量'} data={num}/>
                </Col>
            </Row>

            {/* 短图表部分 */}
            <Row gutter={[24, 24]} wrap className="charts-row">
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <LineGraph name={'整体一周存在图片'} data={pic}/>
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <RadarGraph name={'整体存在标签分布'} data={radar}/>
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <LineGraph name={'整体一周确认切片'} data={slice} />
                    </div>
                </Col>
            </Row>
        </div>)
    );
}

export default Home;