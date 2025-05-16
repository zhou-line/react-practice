import React from "react";
import './index.scss'
import { Form, Modal, Select} from "antd";

interface Props {
    open: boolean,
    ok: (open: boolean) => void,
    cancel: () => void
}

export const  AnnotationModel = (props: Props) => {
    const [markForm] = Form.useForm();

    const onReset = () => {
        markForm.resetFields();
    };

    return (
        <Modal
            title="新增标注"
            className='add-model'
            style={{top: 200, right: 230}}
            open={props.open}
            closable={false}
            onOk={() => {
                onReset()
                props.ok(true)
            }}
            onCancel={() => {
                onReset()
                props.cancel()
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
                <Form.Item name="person" 
                    label={<label>标注对象</label>}>
                    <Select
                        style={{width: 120}}
                    />
                </Form.Item>
                <Form.Item name="person" 
                    label={<label>标签</label>}>
                    <Select
                        style={{width: 120}}
                    />
                </Form.Item>
            </Form>
        </Modal>
       
    )
}