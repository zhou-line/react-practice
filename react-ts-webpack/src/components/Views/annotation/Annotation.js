import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Layout, Row} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header, Footer} from "antd/es/layout/layout";
import './annotation.css';
import AnnotationLeftComponent from "./AnnotationLeftComponent/AnnotationLeft";
import {ArrowRightOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import REST from "../Shared/REST";
import {
    setPicTarget,
    setPicAnnotations,
    setPicSrc,
    setPicId,
    setRecs,
    setLoading,
    setAdmin
} from "../redux/actions/picAction";
import {getRec} from "./util";
import PicturePropsShowComponents from "./AnnotationLeftComponent/PicturePropsShowComponent/PicturePropsShowComponent";

export default function AnnotationComponent(props) {

    const history = useHistory();

    const [picInfo, setPicInfo] = useState(null)

    const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            dispatch(setLoading(true))
            const picId = props.match.params.id
            const picInfo =  await REST.getPicture(picId)
            const picParams = {
                pictureId: picId,
                username: localStorage.getItem('annotator')
            }
            const [target, annotations, annotator] = await Promise.all([
                REST.getTargets(picInfo.study_group.id, localStorage.getItem('annotator')),
                REST.getAnnotations(picParams),
                REST.getUserRole(localStorage.getItem('annotator'), picInfo.study_group.id),
            ]);
            dispatch(setAdmin(annotator.admin))
            dispatch(setRecs(getRec(annotations)));
            setPicInfo(picInfo)
            dispatch(setPicTarget(target));
            dispatch(setPicSrc(picInfo.picture_file));
            dispatch(setPicId(picId));
            dispatch(setPicAnnotations(annotations));
        }
        init()
    }, []);

    return (
        <div>
            <Layout className="layout-container">
                <Header className="header-container">
                    <div className="header-div-container">
                        <div className="title-div-container">
                            <h3 className="pic-title">{picInfo ? `${picInfo.title}(${picInfo.study_group.title})` : '加载中...'}</h3>
                        </div>
                        <div className="exit-btn-container">
                            <Button type="link" icon={<ArrowRightOutlined style={{fontSize: 'x-large'}}/>}
                                    onClick={() => history.goBack()}/>
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Content>
                        <AnnotationLeftComponent props={props} picInfo={picInfo}/>
                    </Content>
                    <Sider width='25%'>
                        <PicturePropsShowComponents picId={props.match.params.id} />
                    </Sider>
                </Layout>
            </Layout>
        </div>
    )
}
