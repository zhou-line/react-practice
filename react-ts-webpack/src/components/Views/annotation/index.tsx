import React, {useEffect} from 'react';
import {Button, Layout, Spin} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import './index.scss';
import {ArrowRightOutlined} from "@ant-design/icons";
import { AnnotationMenu } from './AnnotationMenu';
import { AnnotationShow } from './AnnotationShow';
import { AnnotationOperate } from './AnnotationOperate';
import { AnnotationModel } from './AnnotationModel';

export const AnnotationComponent = () => {


    useEffect(() => {
        const init = async () => {
        
        }
        init()
    }, []);

    return (
        <Layout className="layout-container">
            <Header className="header-container">
                <div className="header-div-container">
                    <div className="title-div-container">
                    </div>
                    <div className="exit-btn-container">
                        <Button type="link" icon={<ArrowRightOutlined style={{fontSize: 'x-large', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}/>}
                                onClick={() => {}}/>
                    </div>
                </div>
            </Header>
            <Layout className='left-container'>
                <Layout className="main-container">
                    <Content className="main-content">
                        <Spin spinning={false} tip="Loading..." style={{top: '160px'}}>
                            <div className='showPic-container'>
                                <AnnotationShow/>
                            </div>
                            <div className='menu-container'>
                                <AnnotationMenu/>
                            </div>
                        </Spin>  
                    </Content>
                </Layout>
                <Sider width='25%'>
                    <AnnotationOperate/>
                </Sider>
            </Layout>
            <AnnotationModel/>
        </Layout>
    )
}
