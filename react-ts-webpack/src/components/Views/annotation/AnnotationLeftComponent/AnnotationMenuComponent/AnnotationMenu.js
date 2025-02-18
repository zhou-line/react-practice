import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Button, Col, Dropdown, Form, Input, InputNumber, message, Modal, Radio, Row, Select, Space} from "antd";
import {
    ExclamationCircleFilled,
    PlusCircleOutlined,
} from "@ant-design/icons";
import './annotationMenu.css'
import MouseIcon from "../../icons/MouseIcon";
import PubSub from "../../../PubSub/PubSub";
import {useDispatch, useSelector} from "react-redux";
import REST from "../../../Shared/REST";
import AutoIcon from "../../icons/Auto";
import {setLoading} from "../../../redux/actions/picAction";

export default function AnnotationMenuComponent(props) {
    const [clickBtn, setClickBtn] = useState(true);

    const [isPartModalVisible, setIsPartModalVisible] = useState(false);
    const [isAllModalVisible, setIsAllModalVisible] = useState(false);

    const picId = useSelector(state => state.picture.picId)
    const recs = useSelector(state => state.picture.recArrs)
    const admin = useSelector(state => state.picture.admin)
    const annotations = useSelector(state => state.picture.picAnnotations);


    const [partForm] = Form.useForm();
    const [allForm] = Form.useForm();


    const [recArrs, setRecArrs] = useState([])

    const dispatch = useDispatch();

    const { confirm } = Modal;

    useEffect(() => {
       setRecArrs(recs)
    }, [recs])

    const add = () => {
        PubSub.publish('pic-add');
        setClickBtn(true)
    };


    const showAlignConfirm = (data, type) => {
        confirm({
            title: '是否对齐?',
            icon: <ExclamationCircleFilled/>,
            content: '该操作不可逆，是否继续',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                if (type === 'all') {
                    REST.autoAlignAnnotation(data).then(res => {
                        PubSub.publish('getShowContext');
                        PubSub.publish('init-rec', {picId: picId, type: '对齐'});
                    })
                } else if (type === 'part') {
                    REST.toAlignAnnotation(data).then(res => {
                        PubSub.publish('getShowContext');
                        PubSub.publish('init-rec', {picId: picId, type: '对齐'});
                    })
                }
            },
            onCancel() {},
        });
    };

    const defaultAct = () => {
        PubSub.publish('pic-default');
        setClickBtn(false)
    };

    const autoAct = () => {
        dispatch(setLoading(true))
    };

    const getAdd = () => {
        const personIndex = annotations.data.findIndex(item => item.userName === localStorage.getItem('annotator'))
        const personId = annotations.data[personIndex].userId
        const data = {
            url: 'D:/southwest/web/core/media/pictures/videos/5/SWPS-2021-C-2-S/0.png',
            pictureId: picId,
            annotator: personId,
            targetId: 20
        }
        REST.autoGetAnnotation(data).then(res => {
            PubSub.publish('init-rec', {
                picId: picId,
                type: '自动框选',
            })
        })
    }

    const partAlignOk = () => {
        const ids = []
        recArrs.forEach(item => {
            if (item.type === 0) {
                ids.push(item.id)
            }
        })
        partForm.validateFields().then((values) => {
            const data = {
                ids,
                direction: values['direction'],
                stretch: values['stretch']
            }
            setIsPartModalVisible(false)
            showAlignConfirm(data, 'part')
        })
    }

    const allAlignOk = () => {
        allForm.validateFields().then((values) => {
            const data = {
                pictureId: picId,
                radius: values['radius'],
                direction: values['direction'],
                stretch: values['stretch']
            }
            setIsAllModalVisible(false)
            showAlignConfirm(data, 'all')
        })
    }

    const cancel = () => {
        setIsAllModalVisible(false)
        setIsPartModalVisible(false)
    }

    return (
        <>
            <div className='menu'>
                <Row className='menu'>
                    {/*操作图片区*/}
                    <Col flex={12}>
                        <Space className="menu-left">
                            <div style={{backgroundColor: clickBtn ? 'unset' : "black", marginRight: '15px'}}>
                                <Button className="pic-btn" type="text" title='选取'
                                        icon={<MouseIcon style={{fontSize: " 21px"}}
                                                         color={clickBtn ? '#848482' : 'white'}/>}
                                        onClick={defaultAct}/>
                            </div>
                            <div style={{backgroundColor: clickBtn ? 'black' : "unset", marginRight: '15px'}}>
                                <Button className="pic-btn" type="text" title='新增'
                                        icon={<PlusCircleOutlined
                                            style={{fontSize: "21px", color: clickBtn ? 'white' : '#848482'}}/>}
                                        onClick={add}/>
                            </div>
                        </Space>
                    </Col>
                    {/*操作标签区*/}
                    <Col flex={9}>
                        <Space className='menu-right'>
                            <Button className="pic-btn" type="text" title='自动框选'
                                    icon={<AutoIcon style={{color: '#848482'}}/>}
                                    onClick={() => {
                                        Promise.resolve().then(() => dispatch(setLoading(true))).then(() => getAdd())
                                    }}></Button>
                        </Space>
                    </Col>
                    {/*{admin ?*/}
                    {/*<Col flex={9}>*/}
                    {/*    <Space className='menu-right'>*/}
                    {/*        <Button className="pic-btn" type="text" title='局部对齐设置'*/}
                    {/*                icon={<PartIcon style={{color: '#848482'}}/>}*/}
                    {/*                onClick={() => setIsPartModalVisible(true)}></Button>*/}
                    {/*        <Button className="pic-btn" type="text" title='全部对齐设置'*/}
                    {/*                icon={<AllIcon style={{color: '#848482'}}/>}*/}
                    {/*                onClick={() => setIsAllModalVisible(true)}></Button>*/}
                    {/*    </Space>*/}
                    {/*</Col> : <Col flex={9}></Col>*/}
                    {/*}*/}
                    <Modal
                        className='pic-model'
                        title="局部对齐设置"
                        closable={false}
                        style={{top: 240, right: 230}}
                        open={isPartModalVisible}
                        destroyOnClose={true}
                        onCancel={() => setIsPartModalVisible(false)}
                        footer={[
                            <Button key="back" onClick={() => partAlignOk()}>
                                确认
                            </Button>,
                            <Button key="submit" type="primary" onClick={() => cancel()}>
                                取消
                            </Button>,
                        ]}
                    >
                        <Form form={partForm} preserve={false}>
                            <Form.Item name="direction" label="对齐方式" initialValue={'left'}>
                                <Radio.Group>
                                    <Radio value="left">左对齐</Radio>
                                    <Radio value="right">右对齐</Radio>
                                    <Radio value="top">上对齐</Radio>
                                    <Radio value="bottom">下对齐</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="stretch" label="拉伸方式" initialValue={0}>
                                <Radio.Group>
                                    <Radio value={0}>最小范围</Radio>
                                    <Radio value={1}>平均范围</Radio>
                                    <Radio value={2}>最大范围</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        className='pic-model'
                        title="整体对齐设置"
                        closable={false}
                        style={{top: 240, right: 230}}
                        open={isAllModalVisible}
                        width={580}
                        destroyOnClose={true}
                        onCancel={() => setIsAllModalVisible(false)}
                        footer={[
                            <Button key="back" onClick={() => allAlignOk()}>
                                确认
                            </Button>,
                            <Button key="submit" type="primary" onClick={() => cancel()}>
                                取消
                            </Button>,
                        ]}
                    >
                        <Form form={allForm} preserve={false}>
                            <Form.Item name="direction" label="对齐方式" initialValue={'left'}>
                                <Radio.Group>
                                    <Radio value="left">全部左对齐</Radio>
                                    <Radio value="right">全部右对齐</Radio>
                                    <Radio value="top">全部上对齐</Radio>
                                    <Radio value="bottom">全部下对齐</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="stretch" label="拉伸方式" initialValue={0}>
                                <Radio.Group>
                                    <Radio value={0}>最小范围</Radio>
                                    <Radio value={1}>平均范围</Radio>
                                    <Radio value={2}>最大范围</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="阈值(范围)" name="radius" initialValue={5}>
                                <InputNumber
                                    size='small'
                                    className="number-input"
                                    style={{width: '200px'}}
                                    min={1}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Row>
            </div>
        </>
    )

}