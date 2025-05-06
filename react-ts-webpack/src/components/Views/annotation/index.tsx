import React, {useEffect, useState} from 'react';
import {Button, Layout, Spin} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import { useNavigate } from 'react-router-dom';
import './index.scss';
import {ArrowRightOutlined} from "@ant-design/icons";
import { AnnotationMenu } from './AnnotationMenu';
import { AnnotationShow } from './AnnotationShow';
import { AnnotationOperate } from './AnnotationOperate';
import { AnnotationModel } from './AnnotationModel';
import { REC } from '@/constants/annotationn';
import imageSrc from '@/assets/0.png';
import ConfirmDialog from '@/components/Common/ConfirmDialog';

export const AnnotationComponent = () => {

    const navigate = useNavigate();

    const [mode, setMode] = useState<string>('action');
    const [recArrs, setRecArrs] = useState<Array<REC>>([])
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openModel, setOpenModel] = useState(false)

    useEffect(() => {
        const init = async () => {
            setRecArrs([])
        }
        init()
    }, []);

    const changeMode = (mode: string) => {
        setMode(mode);
    }

    const confirmModal = (isOpen: boolean) => {
        setOpenConfirm(isOpen)
    }

    // 删除事件
    const keydownAction = (e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
            const deleteData = recArrs.filter(item => item.type === 0);
            if (deleteData.length === 0) {
                return;  
            }
            confirmModal(true)
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', keydownAction);
        return () => {
            window.removeEventListener('keydown', keydownAction);
        };
    }, [recArrs]);



    // 添加框图
    const addToRecs = (e: any, curObj: any) => {
        const id = new Date()
        const rec: REC = {
            id: id.getTime() + '',
            x: curObj.x > e.offsetX ? e.offsetX : curObj.x, // x点
            y: curObj.y > e.offsetY ? e.offsetY : curObj.y, // y点
            w: Math.abs(e.offsetX - curObj.x), // 宽
            h: Math.abs(e.offsetY - curObj.y), // 高
            type: 0, // 类型
            index: recArrs.length + 1,
            annotator: '1',
            pictureId: '2',
            isNew: true
        };
        // 防止误触
        if (rec.w > 4 && rec.h > 4) {
            setRecArrs([...recArrs, rec])
            setOpenModel(true)
        }
    }


    const deleteSelectedRec = (recArrs: REC[]) => {
        const ids: string[] = [];
        const deleteData = recArrs.filter(item => item.type === 0);
        deleteData.forEach(item => {
            ids.push(item.id);
        });
        const newRecArrs = recArrs.filter(item => !ids.includes(item.id));
        setRecArrs(newRecArrs)
    };

    const cancel = () => {
        const newRecArrs = recArrs.filter((_, index) => index !== recArrs.length - 1);
        setRecArrs(newRecArrs)
        setOpenModel(false)
    }


    return (
        <Layout className="layout-container">
            <Header className="header-container">
                <div className="header-div-container">
                    <div className="title-div-container">
                    </div>
                    <div className="exit-btn-container">
                        <Button type="link" icon={<ArrowRightOutlined style={{fontSize: 'x-large', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}/>}
                                onClick={() => {navigate('/analysis')}}/>
                    </div>
                </div>
            </Header>
            <Layout className='left-container'>
                <Layout className="main-container">
                    <Content className="main-content">
                        <Spin spinning={false} tip="Loading..." style={{top: '160px'}}>
                            <div className='showPic-container'>
                                <AnnotationShow 
                                    mode={mode} 
                                    recArrs={recArrs} 
                                    imageSrc={imageSrc} 
                                    setRecArrs={setRecArrs}
                                    addToRecs={addToRecs}
                                />
                            </div>
                            <div className='menu-container'>
                                <AnnotationMenu changeMode={changeMode}/>
                            </div>
                        </Spin>  
                    </Content>
                </Layout>
                <Sider width='25%'>
                    <AnnotationOperate/>
                </Sider>
            </Layout>
            <AnnotationModel 
                open={openModel}
                setOpenModel={setOpenModel}
                cancel={cancel}
            />
            <ConfirmDialog 
                openConfirm={openConfirm} 
                setOpenConfirm={setOpenConfirm} 
                data={recArrs} 
                deleteSelectedRec={deleteSelectedRec}
            />
        </Layout>
    )
}
