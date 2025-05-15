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
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedIndex } from '@/store/actions/photoAction';
import { RootState } from '@/store/store';

export const AnnotationComponent = () => {

    const navigate = useNavigate();
    const [mode, setMode] = useState<string>('action');
    const [recArrs, setRecArrs] = useState<Array<REC>>([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [data, setData] = useState<Array<REC>>([]);
    const messageApi = useSelector((state: RootState) => state.phote.messageApi)
    const loading = useSelector((state: RootState) => state.phote.loading)

    const dispatch = useDispatch()

    const curObj = {
        isRightClick: false, // 鼠标右键按下标识
        radious: 8,          // 范围误差值
        recSize: 6,         // 移动小框的大小
        index: -1,          // 当前矩形框的index
        side: -1,            // 边界值
        resize: false, // 是否拖拽大小
        draw: false, // 是否画图
        drag: false, // 是否拖动
        x: 0, // 画图的起始x
        y: 0, // 画图的起始y
        startX: 0, // x轴开始位置
        startY: 0, // y轴开始位置
    }

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
        setRecArrs([...newRecArrs])
        setData([...newRecArrs])
        messageApi.success('删除成功')
        
    };

    const ok = (is: boolean) => {
        if (is) {
            setData(recArrs)
            dispatch(setSelectedIndex(recArrs.length - 1))
            messageApi.success('新增成功')
        } 
        setOpenModel(false)
    }

    const cancel = () => {
        const newRecArrs = recArrs.filter((_, index) => index !== recArrs.length - 1);
        setRecArrs(newRecArrs)
        setOpenModel(false)
    }

    const highLight = (data: any) => {
        const index = recArrs.findIndex(item => item.id === data.id);
        if (data.type === 0) {
            recArrs.forEach((item: REC) => {
                item.type = 1
            })
            curObj.index = -1;
            dispatch(setSelectedIndex(-1))
            return
        }

        if (index > -1) {
            recArrs.forEach((item: REC) => {
                item.type = 1
            })
            const rec = recArrs[index];
           
            rec.type = 0;
            dispatch(setSelectedIndex(index))
            curObj.index = index;
            return;
        }
    }


    return (
        (!loading && <Layout className="layout-container">
            <Header className="header-container">
                <div className="header-div-container">
                    <div className="title-div-container">
                        <h1>zzy-test-1</h1>
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
                                    imageSrc={(imageSrc)} 
                                    setRecArrs={setRecArrs}
                                    addToRecs={addToRecs}
                                    curObj={curObj}
                                />
                            </div>
                            <div className='menu-container'>
                                <AnnotationMenu changeMode={changeMode}/>
                            </div>
                        </Spin>  
                    </Content>
                </Layout>
                <Sider width='25%'>
                    <AnnotationOperate 
                        data={data}
                        highLight={highLight}
                    />
                </Sider>
            </Layout>
            <AnnotationModel 
                open={openModel}
                ok={ok}
                cancel={cancel}
            />
            <ConfirmDialog 
                openConfirm={openConfirm} 
                setOpenConfirm={setOpenConfirm} 
                data={recArrs} 
                deleteSelectedRec={deleteSelectedRec}
            />
        </Layout>)
    )
}
