// src/components/Views/user/index.tsx
import React, {useEffect, useState } from "react";
import UserInfo from "./userInfo";
import LineGraph from "@/components/Common/lineGraph";
import { Row, Col, List, Input, Button, Space } from 'antd';
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import BarGraph from "@/components/Common/barGraph";
import {CloseCircleFilled} from "@ant-design/icons";
import { getLabels, getStudyGroup, handleLabel, handleStudyGroup } from "@/api/app";
import { setLoading, setStudyGroup } from "@/store/actions/photoAction";
import { getSession } from "@/api/user";

const itemStyle = {
    margin: '10px 20px', 
    background: '#889aa4',
    color: '#ffffff',
    border: '1px solid #ffffff',
    borderRadius: '10px',
    padding: '10px'
}

const contentStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
}

const User = () => {
     
    const loading = useSelector((state: RootState) => state.phote.loading)
    const studyGroup = useSelector((state: RootState) => state.phote.group)
    const messageApi = useSelector((state: RootState) => state.phote.messageApi)
    const dispatch = useDispatch()
    const [labelLoading, setLabelLoading] = useState(false)
    const [groupLoading, setGroupLoading] = useState(false)

    const [label, setLabel] = useState('')
    const [group, setGroup] = useState('')

    const [labels, setLabels] = useState([])
    const [groups, setGroups] = useState([])
    const [permission, setPermission] = useState<any>(null)

    useEffect(() => {
        const init = async () => {
            const [labelValue, groupValue, session] = await Promise.all([getLabels(), getStudyGroup(), getSession()])
            for (const value of groupValue.data) {
                if (value.is_active) {
                    dispatch(setStudyGroup(value.title))
                }
            }
            setPermission(session)
            console.log(session)
            setLabels(labelValue.data)
            setGroups(groupValue.data)
            dispatch(setLoading(false))
        }
        init()
    }, [groupLoading, labelLoading])


    return (
        (!loading && <div className="user-container">
            {/* 用户信息部分 */}
            <Row gutter={[24, 24]} className="user-info-row">
                <Col xs={24} lg={20}>
                    <UserInfo />
                    
                </Col>
                <Col xs={24} lg={4}>
                    <div className="user-avatar">
                        <img
                            width="100%"
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            alt="user avatar"
                        />
                    </div>
                </Col>
            </Row>

            {/* 图表部分 */}
            <Row gutter={[24, 24]} wrap className="charts-row">
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        {studyGroup}
                        <BarGraph name={'个人一周框图数量'}/>
                        {/* <LineGraph name={'个人一周导入图片'}/> */}
                    </div>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <LineGraph name={'个人一周导出切片'}/>
                    </div>
                </Col>
                {permission?.is_superuser && 
                <Col xs={24} sm={12} lg={8}>
                    <div className="chart-card">
                        <div>
                            <Space direction={'horizontal'} size="middle">
                                <Space.Compact>
                                    {!groupLoading && <Input 
                                        prefix={<div style={{ color: '#5470C6' }}>当前项目组</div>}
                                        defaultValue={studyGroup}
                                        onBlur={async (e) => {
                                            if (!e.target.value) return
                                            setGroupLoading(true)
                                            try {
                                                await handleStudyGroup({
                                                    name: e.target.value,
                                                    type: 'edit'
                                                }).then((res: any) => {
                                                    if (res.code === 200) {
                                                        messageApi.success(res.message)
                                                        dispatch(setStudyGroup(e.target.value))
                                                    }
                                                
                                                })
                                            } catch(err) {
                                                dispatch(setStudyGroup(''))
                                                messageApi.error('不存在该项目组')
                                                console.log(err)
                                    
                                            }
                                            setGroupLoading(false)
                                        }}
                                    />}
                                </Space.Compact>
                                <Space.Compact>
                                    {!groupLoading && <Input 
                                        prefix={<div style={{ color: '#5470C6' }}>新增项目组</div>}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setGroup(value)
                                        }}
                                    />}
                                    <Button 
                                        type="primary" 
                                        onClick={async () => {
                                            setGroupLoading(true)
                                            try {
                                                await handleStudyGroup({
                                                    name: group,
                                                    type: 'add'
                                                }).then((res: any) => {
                                                    if (res.code === 200) {
                                                        messageApi.success(res.message)
                                                    }
                                                })
                                            } catch (error) {
                                                messageApi.error('项目组已存在，请重试');
                                                console.error('项目组错误:', error);
                                            }
                                            setGroupLoading(false)
                                        }}
                                        disabled={group === ''}
                                        loading={groupLoading}
                                    >新增</Button>
                                </Space.Compact>
                            </Space>
                            <List className='list-content'
                                dataSource={groups}
                                loading={groupLoading}
                                renderItem={(item: any) => (
                                    <List.Item
                                        style={itemStyle}
                                        key={item.id}
                                    >
                                        <div style={contentStyle}>
                                            <span>
                                                项目组：{item.title}
                                            </span>
                                            <CloseCircleFilled 
                                                title="删除" 
                                                style={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    setGroupLoading(true)
                                                    Promise.resolve().then(async () => {
                                                        await handleStudyGroup({
                                                            name: item.title,
                                                            type: 'delete'
                                                        }).then((res: any) => {
                                                            messageApi.success(res.message)
                                                            if (item.title === studyGroup) {
                                                                dispatch(setStudyGroup(''))
                                                            }
                                                            setGroupLoading(false)
                                                        }) 
                                                    })
                                                }}
                                            />
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Space> </Space>
                        <div>
                            <Space direction="vertical" size="middle">
                                <Space.Compact>
                                    {!labelLoading && <Input 
                                        prefix={<div style={{ color: '#5470C6' }}>新增标签</div>}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setLabel(value)
                                        }}
                                    />}
                                    <Button 
                                        type="primary" 
                                        onClick={async () => {
                                            setLabelLoading(true)
                                            try {
                                                await handleLabel({
                                                    name: label,
                                                    type: 'add'
                                                }).then((res: any) => {
                                                    if (res.code === 200) {
                                                        messageApi.success(res.message)
                                                    }
                                                })
                                            } catch (error) {
                                                messageApi.error('标签已存在，请重试');
                                                console.error('标签错误:', error);
                                            }
                                            setLabelLoading(false)
                                        }}
                                        disabled={label === ''}
                                        loading={labelLoading}
                                    >新增</Button>
                                </Space.Compact>
                            </Space>
                            <List
                                className='list-content'
                                dataSource={labels}
                                loading={labelLoading}
                                renderItem={(item: any) => (
                                    <List.Item
                                        style={itemStyle}
                                        key={item.id}
                                    >
                                        <div style={contentStyle}>
                                            <span>
                                                表情标签：{item.title}
                                            </span>
                                            <CloseCircleFilled 
                                                title="删除" 
                                                style={{cursor: 'pointer'}}
                                                onClick={async () => {
                                                    setLabelLoading(true)
                                                    await handleLabel({
                                                        name: item.title,
                                                        type: 'delete'
                                                    }).then((res: any) => {
                                                        messageApi.success(res.message)
                                                        setLabelLoading(false)
                                                    }) 
                                                }}
                                            />
                                        </div>
                                        
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Space> </Space>
                    </div>
                </Col>
                }
            </Row>
        </div>)
    );
};

export default User;