import React, {useState} from "react";
import {Button, Col, Form, InputNumber, Modal, Popconfirm, Radio, Row, Space} from "antd";
import {
    PlusCircleOutlined,
} from "@ant-design/icons";
import "./index.scss"
import MouseIcon from "@/assets/svg/MouseIcon";
import AutoIcon from "@/assets/svg/AutoIcon";
import { Mode } from "@/constants/annotationn";
import { allAlign, autoAnnotations } from "@/api/app";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/actions/photoAction";
import { getRec } from "@/utils/tools";
import { RootState } from "@/store/store";
import PartIcon from "@/assets/svg/PartIcon";

interface AnnotationMenuProps {
    changeMode: (mode: Mode) => void;
    pic: any,
    labels: any,
    setRecArrs: any,
    picId: any,
    recArrs: any
}

export const AnnotationMenu = (props: AnnotationMenuProps) => {
    const [clickBtn, setClickBtn] = useState(true);

    const [isPartModalVisible, setIsPartModalVisible] = useState(false);
    const [isAllModalVisible, setIsAllModalVisible] = useState(false);
    const messageApi = useSelector((state: RootState) => state.phote.messageApi)


    const [partForm] = Form.useForm();
    const [allForm] = Form.useForm();

    const dispatch = useDispatch()


    const cancel = () => {
        setIsAllModalVisible(false)
        setIsPartModalVisible(false)
    }


    const all_align = async () => {
        dispatch(setLoading(true))
        const ids: string[] = [];
        const deleteData = props.recArrs.filter((item: any) => item.type === 0);
        deleteData.forEach((item: any) => {
            ids.push(item.id);
        });
        const res = await allAlign({
            ids: ids,
            picId: props.picId,
           ...partForm.getFieldsValue()
        }) as any

        if (res.code === 200) {
            setClickBtn(false);
            props.setRecArrs(getRec(res.data))
            dispatch(setLoading(false))
            cancel()
        }

    }

    return (
        <div className='menu-container'>
            <Row className='menu-content'>
                {/*操作图片区*/}
                <Col flex={12}>
                    <Space className="menu-left">
                        <div style={{backgroundColor: clickBtn ? 'unset' : "black", marginRight: '15px'}}>
                            <Button className="pic-btn" type="text" title='选取'
                                icon={
                                    <MouseIcon 
                                        style={{fontSize: " 21px"}}
                                        color={clickBtn ? '#848482' : '#ffffff'}
                                    />
                                }
                                onClick={() => {
                                    setClickBtn(false);
                                    props.changeMode(Mode.Default);
                                }} 
                            />
                        </div>
                        <div style={{backgroundColor: clickBtn ? 'black' : "unset", marginRight: '15px'}}>
                            <Button className="pic-btn" type="text" title='新增'
                                icon={
                                    <PlusCircleOutlined
                                        style={{fontSize: "21px", color: clickBtn ? '#ffffff' : '#848482'}}
                                    />
                                }
                                onClick={() => {
                                    setClickBtn(true);
                                    props.changeMode(Mode.Action);
                                }} 
                            />
                        </div>
                    </Space>
                </Col>
                {/*操作标签区*/}        
                <Col flex={9}>
                    <Space className='menu-right'>
                        <Popconfirm
                            title="智能标注"
                            description="该操作不可逆，是否继续?"
                            onConfirm={async () => {
                                dispatch(setLoading(true))
                                const res = await autoAnnotations({
                                    pictureId: props.pic.id,
                                    picture_file: props.pic.picture_file,
                                    labels: props.labels
                                })
                                props.setRecArrs(getRec(res.data))
                                messageApi.success('智能标注成功')
                                dispatch(setLoading(false))
                            }}
                            onCancel={() => {}}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button className="pic-btn" type="text" title='自动框选'
                                icon={ 
                                    <AutoIcon
                                        style={{fontSize: "21px"}}
                                        props={{color: '#848482'}}
                                    />
                                }
                            />
                        </Popconfirm>
                        <Popconfirm
                            title="对齐设置"
                            description="该操作不可逆，是否继续?"
                            onConfirm={() => {
                                setIsPartModalVisible(true)
                            }}
                            onCancel={() => {}}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button className="pic-btn" type="text" title='局部对齐设置'
                                icon={<PartIcon style={{fontSize: " 19px"}}/>}
                            >
                            </Button>
                        </Popconfirm>
                        {/* <Button className="pic-btn" type="text" title='全部对齐设置'
                            icon={
                                <AllIcon 
                                    style={{fontSize: " 19px"}}
                                />
                            }
                            onClick={() => setIsAllModalVisible(true)} 
                        /> */}
                    </Space>
                </Col>
                
                <Modal
                    className='pic-model'
                    title="局部对齐设置"
                    closable={false}
                    style={{top: 240, right: 230}}
                    open={isPartModalVisible}
                    destroyOnClose={true}
                    onCancel={() => setIsPartModalVisible(false)}
                    footer={[
                        <Button 
                            key="back" 
                            onClick={() => {
                                all_align()
                            }}
                        >
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
                    width={600}
                    destroyOnClose={true}
                    onCancel={() => setIsAllModalVisible(false)}
                    footer={[
                        <Button 
                            key="back" 
                            onClick={() => {
                                all_align()
                            }}
                        >
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
    )
}