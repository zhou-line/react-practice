import React, { useState } from "react";
import './index.scss'
import { Form, Modal, Select} from "antd";

interface Props {
    open: boolean,
    ok: (open: boolean, info: any) => void,
    cancel: () => void,
    labels: any
}

export const  AnnotationModel = (props: Props) => {
    const [loading, setLoading] = useState(false)
    const [markForm] = Form.useForm();

    return (
        <Modal
            title="新增标注"
            className='add-model'
            style={{top: 200, right: 230}}
            open={props.open}
            closable={false}
            loading={loading}
            onOk={() => {
                setLoading(true)
                Promise.resolve(props.ok(true, markForm.getFieldsValue())).then(() => {
                    markForm.resetFields();
                    setLoading(false)
                })
            }}
            onCancel={() => {
                props.cancel()
                markForm.resetFields();
            }}
            destroyOnClose={true}
            width={320}
            okText="确认"
            cancelText="取消"
        >
            <Form
                style={{maxWidth: 320}}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                form={markForm}
            >
                <Form.Item name="target" 
                    label={<label>标注对象</label>}>
                    <Select
                        className="item-select"
                        allowClear={true}
                        style={{width: 120}}
                        options={[
                            { value: '教师', label: '教师' },
                            { value: '学生', label: '学生' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="label" 
                    label={<label>标签</label>}>
                    <Select
                        className="item-select"
                        allowClear={true}
                        style={{width: 120}}
                        options={props.labels}
                    />
                </Form.Item>
            </Form>
        </Modal>
       
    )
}