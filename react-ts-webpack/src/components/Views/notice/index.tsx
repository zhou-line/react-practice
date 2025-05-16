import AlertMessage from "@/components/Common/alertMessage";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getNotices } from "@/api/app";
import { setLoading } from "@/store/actions/photoAction";

const Notice = () => {
    const loading = useSelector((state: RootState) => state.phote.loading)
    const [system, setSystem] = useState<any[]>([])
    const dispatch = useDispatch()

    useEffect(() => {
        const init = async () => {
            const res = await getNotices({}) 
            const sysArry = []
            for (const data of res.data) {
                if (data.status === '系统消息') {
                    sysArry.push(data)
                }
            } 
            setSystem(sysArry)
            dispatch(setLoading(false))
        }
        init()
    }, [])


    return (
        ( !loading && <div className="notice-container">
            <Row gutter={[24, 24]} wrap className="notice-row" align="top">
                <Col xs={24} sm={24}>
                    <div className="notice-card">
                        <h3>系统消息</h3>
                        <div className="notice-card-content">
                            {system.map((item:any) => {
                                return (
                                    <AlertMessage 
                                        key={item.id} 
                                        message={item.description} 
                                        type={item.type} 
                                        item={item}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>)
    );
}

export default Notice;