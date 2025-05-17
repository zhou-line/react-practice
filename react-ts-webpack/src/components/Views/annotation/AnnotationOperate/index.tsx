import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button, Form, List, Select, Tabs, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { DraggableIconGray } from '@/assets/svg/DraggableIconGray';
import { AllConfirmedIconGray } from '@/assets/svg/AllConfirmedIconGray';
import { AlignedAndConfirmedIconGray } from '@/assets/svg/AlignedAndConfirmedIconGray';
import { UnalignedAndNotConfirmedIconGray } from '@/assets/svg/UnalignedAndNotConfirmedIconGray';
import { REC } from '@/constants/annotationn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getUsers } from '@/api/user';
import { confirmAnnotations, editAnnotation, getAnnotations } from '@/api/app';
import { getRec } from '@/utils/tools';
import { setSelectedIndex } from '@/store/actions/photoAction';


interface Props {
    data: REC[],
    highLight: (e: any) => void,
    labels: any,
    loading: boolean,
    setRecArrs: any,
    picId: any
}

export const AnnotationOperate = (props: Props) => {

    const selectedIndex = useSelector<RootState, number>(state => state.phote.selectedIndex)
    const superuser = useSelector<RootState, number>(state => state.admin.superuser)
    const [users, setUsers] = useState<any>([])
    const [form] = Form.useForm();

    const [target, setTarget] = useState('')
    const [valueLabel, setValueLabel] = useState('')
    const [loading, setLoading] = useState(props.loading)
    const [align, setAlign] = useState(0)
    const dispatch = useDispatch()
    

    useEffect(() => {
        const getUser = async () => {
            const res = await getUsers()
            if (res.data[0].is_superuser) {
                res.data[0].username = '所有'            
            }
            console.log(res.data)
            setUsers(res.data)
        }
        getUser()
    }, [])

    useEffect(() => {

    }, [props.loading, props.data.length])

    const init = async () => {
        const submit = {
            picId: props.picId,
            target: target,
            labelValue: valueLabel
        }
        const res = await getAnnotations(submit)
        props.setRecArrs(getRec(res.data))
        setLoading(false)
    }

    useEffect(() => {
        init()
    }, [])


    useEffect(() => {
        if (selectedIndex > -1) {
            console.log(props.data[selectedIndex])
            form.setFieldsValue({
                target: props.data[selectedIndex]?.target,
                expression: props.data[selectedIndex]?.labelValue
            })
        } else {
            form.resetFields()
        }

    }, [selectedIndex])

    const iconStyle = {
        color: '#848482',
        fontSize: 15,
        verticalAlign: 'inherit',
        margin: '5px 5px 0',
        cursor: 'pointer'
    }
    
    const operations = (
        <div className="confirmIconGroup">
            <Button className="pic-btn" type="text" title='全部确认'
                icon={<AllConfirmedIconGray style={{fontSize: " 19px"}}/>}
                onClick={async () => {
                    const ids = props.data.map(item => item.id)
                    setLoading(true)
                    const submit = {
                        picId: props.picId,
                        target: target,
                        labelValue: valueLabel,
                        ids: ids,
                        confirm: 1,
                        align: align
                    }
                    await confirmAnnotations(submit)
                    props.data.forEach(item => {
                        item.confirm = 1
                    })
                    dispatch(setSelectedIndex(-1))
                    setLoading(false)
                }}
            />
            <Button className="pic-btn" type="text" title='未对齐'
                icon={<UnalignedAndNotConfirmedIconGray/>}
                onClick={async () => {
                    setLoading(true)
                    const submit = {
                        picId: props.picId,
                        target: target,
                        labelValue: valueLabel,
                        align: 0
                    }
                    setAlign(0)
                    const res = await getAnnotations(submit)
                    props.setRecArrs(getRec(res.data))
                    dispatch(setSelectedIndex(-1))
                    setLoading(false)
                }}
            />
            <Button className="pic-align" type="text" title='已对齐'
                icon={<AlignedAndConfirmedIconGray/>}
                onClick={async () => {
                    setLoading(true)
                    const submit = {
                        picId: props.picId,
                        target: target,
                        labelValue: valueLabel,
                        align: 1,
                    }
                    setAlign(1)
                    const res = await getAnnotations(submit)
                    props.setRecArrs(getRec(res.data))
                    dispatch(setSelectedIndex(-1))
                    setLoading(false)
                }}
            />
            <Button className="pic-btn" type="text" title='未确认'
                icon={<CloseCircleOutlined style={iconStyle}/>}
                onClick={async () => {
                    setLoading(true)
                    const submit = {
                        picId: props.picId,
                        target: target,
                        labelValue: valueLabel,
                        confirm: 0
                    }
                    const res = await getAnnotations(submit)
                    props.setRecArrs(getRec(res.data))
                    dispatch(setSelectedIndex(-1))
                    setLoading(false)
                }}
            />
            <Button className="pic-btn" type="text" title='已确认'
                icon={<CheckCircleOutlined style={iconStyle}/>}
                onClick={async () => {
                    setLoading(true)
                    const submit = {
                        picId: props.picId,
                        target: target,
                        labelValue: valueLabel,
                        confirm: 1
                    }
                    const res = await getAnnotations(submit)
                    props.setRecArrs(getRec(res.data))
                    dispatch(setSelectedIndex(-1))
                    setLoading(false)
                }}
            />
            <Button className="pic-btn" type="text" title='全部'
                icon={<DraggableIconGray/>}
                onClick={async () => {
                    setLoading(true)
                    const submit = {
                        picId: props.picId,
                        target: target,
                        labelValue: valueLabel
                    }
                    const res = await getAnnotations(submit)
                    props.setRecArrs(getRec(res.data))
                    dispatch(setSelectedIndex(-1))
                    setLoading(false)
                }}
            />
        </div>
    );

    const onChange = async (key: string) => {
        setLoading(true)
        if (key === '1' && superuser) {
            init()
        } else {
            const submit = {
                picId: props.picId,
                target: target,
                labelValue: valueLabel,
                username: users[(+key - 1)].username
            }
            const res = await getAnnotations(submit)
            props.setRecArrs(getRec(res.data))
            setLoading(false)
        }
        dispatch(setSelectedIndex(-1))
    };

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const label = props.labels.filter((item: any) => item.value === values.expression)[0]
        const submit = {
            id: props.data[selectedIndex].id,
            label: label.label,
            labelValue: label.value,
            target: values?.target,
            align_user: values?.align_user
        }
        props.data[selectedIndex].label = label.label
        props.data[selectedIndex].labelValue = label.value
        props.data[selectedIndex].target = values.target
        props.setRecArrs([...props.data])
        await editAnnotation(submit)
    };


    return (
        <div className="sider-components">
            <div className="sider-components-title">
                <div className="searchBar">
                    <Select
                        placeholder="维度"
                        size='middle'
                        style={{flex:3}}
                        allowClear={true}
                        options={[
                            { value: '教师', label: '教师' },
                            { value: '学生', label: '学生' },
                        ]}
                        onChange={async (value: any) => {
                            setLoading(true)
                            setTarget(value)
                            const submit = {
                                picId: props.picId,
                                target: value,
                                labelValue: valueLabel
                            }
                            const res = await getAnnotations(submit)
                            props.setRecArrs(getRec(res.data))
                            dispatch(setSelectedIndex(-1))
                            setLoading(false)
                        }}
                    
                    />
                    <Select
                        placeholder="标签值"
                        size='middle'
                        style={{flex:3}}
                        allowClear={true}
                        options={props.labels}
                        onChange={async (value: any) => {
                            setLoading(true)
                            setValueLabel(value)
                            const submit = {
                                picId: props.picId,
                                target: target,
                                labelValue: value
                            }
                            const res = await getAnnotations(submit)
                            props.setRecArrs(getRec(res.data))
                            dispatch(setSelectedIndex(-1))
                            setLoading(false)
                        }}
                    />
                </div>
            </div>
            <div className="sider-components-content">
                <Tabs
                    tabBarExtraContent={operations}
                    onChange={onChange}
                    type="card"
                    items={Array.from(users).map((_, i) => {
                        const id = String(i + 1);
                        return {
                            label: users[i]?.username,
                            key: id,
                            children: (
                                <List
                                    className='sider-components-content-list'
                                    loading={loading}
                                    itemLayout="horizontal"
                                    size="small"
                                    dataSource={props.data}
                                    renderItem={(item: REC, index: number) => (
                                        <List.Item 
                                            className='sider-components-content-list-item'
                                            style={{color: index === selectedIndex ? '#ffffff' : '#848482'}}
                                            onClick={(e: any) =>{
                                                e.stopPropagation();
                                                props.highLight(item)
                                            }}
                                        >
                                            <span>{index + 1}</span>
                                            {item.align ? <span title={`已对齐`}>
                                                <Tag icon={<AlignedAndConfirmedIconGray />} color='#1677FF'/>
                                            </span>:
                                            <span title={`未对齐`}>
                                                <Tag icon={<UnalignedAndNotConfirmedIconGray />} color='#A77022'/>
                                            </span>}
                                            <span 
                                                className='item-content'
                                                title={`表情：${item.label}(${item.x}, ${item.y})`}
                                            >{`表情：${item.label}(${item.x}, ${item.y})`}</span>
                                            <span 
                                                className='item-content' 
                                                title={`标注人：(${item.annotator})`}
                                            >{`标注人：(${item.annotator})`}</span>
                                            {
                                                item.confirm ?
                                                <span title={`取消确认`}>
                                                    <CloseCircleOutlined 
                                                        style={{marginTop: 4}}
                                                        onClick={async () => {
                                                            setLoading(true)
                                                            const submit = {
                                                                ids: [item.id],
                                                                confirm: 0,
                                                            }
                                                            await confirmAnnotations(submit)
                                                            item.confirm = 0
                                                            setLoading(false)
                                                        }}
                                                    />
                                                </span> :
                                                <span title={`确认`}>
                                                    <CheckCircleOutlined 
                                                        style={{marginTop: 4}}
                                                        onClick={async () => {
                                                            setLoading(true)
                                                            const submit = {
                                                                ids: [item.id],
                                                                confirm: 1,
                                                            }
                                                            item.confirm = 1
                                                            await confirmAnnotations(submit)
                                                            props.setRecArrs([...props.data])
                                                            setLoading(false)
                                                        }}
                                                    />
                                                </span>
                                            }
                                        </List.Item>
                                    )}
                                />
                            ),
                        };
                    })}
                />
            </div>

            <div className="sider-components-footer">
                <Form
                    disabled={selectedIndex === -1}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    className="pictureBottomForm"
                    labelAlign="left"
                    layout="horizontal"
                    onFinish={onFinish}
                    colon={false}
                    form={form}
                >
                    {/*标注对象*/}
                    <Form.Item
                        label={<span style={{color: '#B0B0B0', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>标注对象:</span>}
                        name="target"
                        className="pictureFormItem"
                    >
                        <Select
                            allowClear={true}
                            placeholder="请选择标注对象"
                            options={[
                                { value: '教师', label: '教师' },
                                { value: '学生', label: '学生' },
                            ]}
                        />

                    </Form.Item>
                    {/*选择*/}
                    <Form.Item
                        label={<span style={{color: '#B0B0B0'}}>表情:</span>}
                        name="expression"
                        className="pictureFormItem"
                    >
                        <Select
                            allowClear={true}
                            placeholder={`请选择表情`}
                            options={props.labels}
                        />
                    </Form.Item>
                    {/*对齐*/}
                    <Form.Item
                        label={<span style={{color: '#B0B0B0'}}>对齐:</span>}
                        name="align_user"
                        className="pictureFormItem"
                    >
                        <Select 
                            placeholder="对齐人"
                            mode="multiple"
                            allowClear={true}
                            disabled={true}
                        />
                    </Form.Item>
                    {/*    按钮组    */}
                    <div className='btnGroup'>
                        <Button
                            className="cancel-button"
                            size='middle'
                        > 取消</Button>
                        <Button
                            className="submit-btn"
                            type="primary"
                            size='middle'
                            htmlType="submit"
                        >提交</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
