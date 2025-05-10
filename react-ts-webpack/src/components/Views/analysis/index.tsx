import React from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import DataTable from "@/components/Common/dataTable";
import './index.scss'
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AnalysisLabel } from "@/constants/list";

const currentStyle = {
    color: '#ffffff',
};

const Analysis = () => {
    const loading = useSelector((state: RootState) => state.phote.loading)

    const [form] = Form.useForm();
  
    return (
      (!loading && <div className="analysis-container">
        <Form
            layout='inline'
            form={form}
            className="analysis-search"
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
            <Form.Item 
                label={<span style={currentStyle}>标注数量</span>}
            >
                <InputNumber min={0} max={10} step={1} />
            </Form.Item>
            <Form.Item>
                <Button type="primary">搜索</Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary">导入图片</Button>
            </Form.Item>
        </Form>
        <br/>
        <div className="analysis-content">
            <DataTable type={AnalysisLabel} />
        </div>
      </div>)
    );
}

export default Analysis;