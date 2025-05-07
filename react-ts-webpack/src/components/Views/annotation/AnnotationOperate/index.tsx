import React, { useEffect } from 'react';
import './index.scss';
import { Button, Form, List, Select, Tabs, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { DraggableIconGray } from '@/assets/svg/DraggableIconGray';
import { AllConfirmedIconGray } from '@/assets/svg/AllConfirmedIconGray';
import { AlignedAndConfirmedIconGray } from '@/assets/svg/AlignedAndConfirmedIconGray';
import { UnalignedAndNotConfirmedIconGray } from '@/assets/svg/UnalignedAndNotConfirmedIconGray';
import { REC } from '@/constants/annotationn';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


interface Props {
    data: REC[],
    highLight: (e: any) => void,
}

export const AnnotationOperate = (props: Props) => {

    const selectedIndex = useSelector<RootState, number>(state => state.phote.selectedIndex)

    useEffect(() => {

    }, [props.data.length])

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
            />
            <Button className="pic-btn" type="text" title='未对齐'
                icon={<UnalignedAndNotConfirmedIconGray/>}
            />
            <Button className="pic-align" type="text" title='已对齐'
                icon={<AlignedAndConfirmedIconGray/>}
            />
            <Button className="pic-btn" type="text" title='未确认'
                icon={<CloseCircleOutlined style={iconStyle}/>}
            />
            <Button className="pic-btn" type="text" title='已确认'
                icon={<CheckCircleOutlined style={iconStyle}/>}
            />
            <Button className="pic-btn" type="text" title='全部'
                icon={<DraggableIconGray/>}
            />
        </div>
    );

    const onChange = (key: string) => {
        console.log(key);
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
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    
                    />
                    <Select
                        placeholder="标签"
                        size='middle'
                        style={{flex:3}}
                        allowClear={true}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                    <Select
                        placeholder="标签值"
                        size='middle'
                        style={{flex:3}}
                        allowClear={true}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                </div>
            </div>
            <div className="sider-components-content">
                <Tabs
                    tabBarExtraContent={operations}
                    onChange={onChange}
                    type="card"
                    items={Array.from({ length: 2 }).map((_, i) => {
                        const id = String(i + 1);
                        return {
                            label: `Tab ${id}`,
                            key: id,
                            children: (
                                <List
                                    className='sider-components-content-list'
                                    loading={false}
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
                                            <span title={`未对齐`}><Tag icon={<UnalignedAndNotConfirmedIconGray />} color='#A77022'/></span>
                                            <span 
                                                className='item-content'
                                                title={`表情：温柔(${item.x}, ${item.y})`}
                                            >{`表情：温柔(${item.x}, ${item.y})`}</span>
                                            <span 
                                                className='item-content' 
                                                title={`中心点：(${(item.x + item.w / 2)}, ${(item.y + item.h / 2)})`}
                                            >{`中心点：(${(item.x + item.w / 2)}, ${(item.y + item.h / 2)})`}</span>
                                            <span title={`未确认`}><CloseCircleOutlined style={{marginTop: 4}}/></span>
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
                    colon={false}
                >
                    {/*标注对象*/}
                    <Form.Item
                        label={<span style={{color: '#B0B0B0', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>标注对象:</span>}
                        name="tage"
                        className="pictureFormItem"
                    >
                        <Select
                            placeholder="请选择标注对象"
                            defaultValue={null}
                            open={false}
                        />

                    </Form.Item>
                    {/*选择*/}
                    <Form.Item
                        label={<span style={{color: '#B0B0B0'}}>表情:</span>}
                        name="expression"
                        className="pictureFormItem"
                    >
                        <Select
                            placeholder={`请选择`}
                        />
                    </Form.Item>
                    {/*对齐*/}
                    <Form.Item
                        label={<span style={{color: '#B0B0B0'}}>对齐:</span>}
                        name="align"
                        className="pictureFormItem"
                    >
                        <Select 
                            placeholder="对齐人"
                            mode="multiple"
                            showSearch={false}
                            open={false}
                            allowClear={false}
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
