import React from "react";
import { Button, Form, Input, Select } from "antd";
import DataTable from "@/components/Common/dataTable";
import './index.scss'
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ResourceLabel } from "@/constants/list";

const currentStyle = {
    color: '#ffffff',
};

const Resources = () => {

    const [form] = Form.useForm();
    const loading = useSelector((state: RootState) => state.phote.loading)
  
  
    return (
      (!loading && <div className="resources-container">
        <Form
            className="resources-search"
            layout='inline'
            form={form}
        >
            <Form.Item 
                label={<span style={currentStyle}>名称</span>}
                name="layout"
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label={<span style={currentStyle}>项目组</span>}
                name="layout"
                className="handle-action"
            >
                <Select/>
            </Form.Item>
            <Form.Item 
                label={<span style={currentStyle}>来源</span>}
                name="layout"
                className="handle-action"
            >
                <Select/>
            </Form.Item>
            <Form.Item>
                <Button type="primary">搜索</Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary">导出切片</Button>
            </Form.Item>
        </Form>

        <br/>

        <div className="resources-content">
            <DataTable type={ResourceLabel}/>
        </div>
      </div>)
    );
}

export default Resources;