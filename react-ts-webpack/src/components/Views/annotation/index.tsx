import React, {useEffect, useState} from 'react';
import {Button, Layout, Spin} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import {ArrowRightOutlined} from "@ant-design/icons";
import { AnnotationMenu } from './AnnotationMenu';
import { AnnotationShow } from './AnnotationShow';
import { AnnotationOperate } from './AnnotationOperate';
import { AnnotationModel } from './AnnotationModel';
import { imageUrlPre, REC } from '@/constants/annotationn';
import ConfirmDialog from '@/components/Common/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSelectedIndex } from '@/store/actions/photoAction';
import { RootState } from '@/store/store';
import { addAnnotation, deleteAnnotations, getAnnotations, getLabels, getTheImage } from '@/api/app';
import { getRec } from '@/utils/tools';

const AnnotationComponent = () => {

    const navigate = useNavigate();
    const [mode, setMode] = useState<string>('action');
    const [recArrs, setRecArrs] = useState<Array<REC>>([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const messageApi = useSelector((state: RootState) => state.phote.messageApi)
    const loading = useSelector((state: RootState) => state.phote.loading)
    const { userId } = useParams()
    const [pic, setPic] = useState<any>(null)
    const [imgSrc, setImgSrc] = useState('') 
    const [labels, setLabels] = useState<any>([])
    const username = useSelector((state: RootState) => state.admin.username)

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
            const [image, labels, annotation] = await Promise.all([
                getTheImage({id: userId}),
                getLabels(),
                getAnnotations({picId: userId})
            ])
            const recs = annotation.data
            const picData = image.data
            setPic(picData)
            const values = []
            for (const label of labels.data) {
                values.push({
                    value: label.id,
                    label: label.title
                })
            }
            setLabels(values)
            setImgSrc(imageUrlPre + picData.picture_file)
            
            setRecArrs(getRec(recs))
            dispatch(setLoading(false))

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
            pictureId: Number(userId),
            isNew: true,
            annotator: username
        };
        // 防止误触
        if (rec.w > 4 && rec.h > 4) {
            setRecArrs([...recArrs, rec])
            setOpenModel(true)
        }
    }


    const deleteSelectedRec = async (recArrs: REC[]) => {
        const ids: string[] = [];
        const deleteData = recArrs.filter(item => item.type === 0);
        let isContinue = true;
        deleteData.forEach(item => {
            ids.push(item.id);
            if (item.confirm === 1) {
                isContinue = false;
            }
        });
        if (!isContinue) {
            messageApi.error('存在已确认的标签，无法删除')
            return
        }
        const res = await deleteAnnotations({
            ids: ids,
            picId: userId
        }) as any
        if (res.code === 200) {
            const newRecArrs = recArrs.filter(item => !ids.includes(item.id));
            dispatch(setSelectedIndex(-1))
            setRecArrs([...newRecArrs])
            messageApi.success('删除成功')
        }
    };

    const ok = async (is: boolean, info: any) => {
        if (is) {
            const labelData = labels.filter((item: any) => item.value === info.label)
            const theRec = recArrs[recArrs.length - 1]
            theRec.label = labelData[0].label
            theRec.labelValue = labelData[0].value
            theRec.target = info.target

            dispatch(setSelectedIndex(recArrs.length - 1))
            const res = await addAnnotation(theRec) as any
            if (res?.code === 200) {
                messageApi.success('新增成功')
                theRec.id = res.data.id
            }
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
        <Layout className="layout-container">
            <Spin spinning={loading} tip="Loading..." style={{top: '160px'}}>
                <Header className="header-container">
                    <div className="header-div-container">
                        <div className="title-div-container">
                            <h1>{pic?.name}</h1>
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
                                        imageSrc={imgSrc} 
                                        setRecArrs={setRecArrs}
                                        addToRecs={addToRecs}
                                        curObj={curObj}
                                    />
                                </div>
                                <div className='menu-container'>
                                    <AnnotationMenu 
                                        recArrs={recArrs} 
                                        setRecArrs={setRecArrs}
                                        changeMode={changeMode}
                                        pic={pic}
                                        picId={userId}
                                        labels={labels}
                                    />
                                </div>
                            </Spin>  
                        </Content>
                    </Layout>
                    <Sider width='25%'>
                        <AnnotationOperate
                            picId={userId}
                            data={recArrs}
                            highLight={highLight}
                            labels={labels}
                            loading={loading}
                            setRecArrs={setRecArrs}
                        />
                    </Sider>
                </Layout>
                <AnnotationModel 
                    open={openModel}
                    ok={ok}
                    cancel={cancel}
                    labels={labels}
                />
                <ConfirmDialog 
                    openConfirm={openConfirm} 
                    setOpenConfirm={setOpenConfirm} 
                    data={recArrs} 
                    deleteSelectedRec={deleteSelectedRec}
                />
            </Spin>
        </Layout>
    )
}

export default AnnotationComponent
