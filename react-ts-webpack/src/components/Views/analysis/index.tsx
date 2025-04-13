import React from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import DataTable from "@/components/Common/dataTable";

const currentStyle = {
    color: '#ffffff',
};

const Analysis = () => {

    const [form] = Form.useForm();
  
  
    return (
      <div>
        <Form
            layout='inline'
            form={form}
        >
            <Form.Item 
                label={<span style={currentStyle}>Username</span>}
                name="layout"
            >
                <Select/>
            </Form.Item>
            <Form.Item 
                 label={<span style={currentStyle}>Username</span>}
                name="layout"
            >
                <Select/>
            </Form.Item>
            <Form.Item 
                 label={<span style={currentStyle}>Username</span>}
                name="layout"
            >
                <Select/>
            </Form.Item>
            <Form.Item 
                label={<span style={currentStyle}>Username</span>}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label={<span style={currentStyle}>Username</span>}
            >
                <InputNumber min={1} max={10} defaultValue={3} />
            </Form.Item>
            <Form.Item
                label={<span style={currentStyle}>Username</span>}
            >
                <InputNumber min={1} max={10} defaultValue={3} />
            </Form.Item>
            <Form.Item>
                <Button type="primary">Submit</Button>
            </Form.Item>
        </Form>
        <br/>

        <DataTable/>
      </div>
    );
}

export default Analysis;