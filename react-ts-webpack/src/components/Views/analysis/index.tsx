import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Upload, UploadProps } from "antd";
import DataTable from "@/components/Common/dataTable";
import './index.scss'
import {useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AnalysisLabel } from "@/constants/list";
import { getCookie } from "@/utils/auth";
import { getImages } from "@/api/app";
import { setLoading } from "@/store/actions/photoAction";

const currentStyle = {
    color: '#ffffff',
};

const Analysis = () => {
    const loading = useSelector((state: RootState) => state.phote.loading)
    const messageApi = useSelector((state: RootState) => state.phote.messageApi)
    const [pageLoading, setPageLoading] = useState(false)
    const [data, setData] = useState([])

    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const onFinish = () => {
        console.log(form.getFieldsValue())
    }

    const getData = async () => {
       
           const res = await getImages({data:1}) as any
           if (res.code === 200) {
            console.log(res.data)
                setData(res.data)
           }
           dispatch(setLoading(false))
    }

    useEffect(() => {
        getData()
    }, [])
    
    

    const csrfToken = getCookie("csrftoken");


    const props: UploadProps = {
        action: 'http://localhost:8000/apps/upload_image',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            "X-CSRFToken": csrfToken,
        },
        beforeUpload: (file) => {
            setPageLoading(true)
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                messageApi.error('图片格式错误，请上传PNG格式');
                setPageLoading(false)
            }
            return isPNG || Upload.LIST_IGNORE;
        },
        onChange: (info) => {
            const res = info.file;
            if (res.status === "done") {
                const response = res.response
                if (response.code === 200) {
                    messageApi.success(response.message);
                } else {
                    messageApi.error(response.message);
                }
                setPageLoading(false)
            }
        },
    };
  
    return (
      (!loading && <div className="analysis-container">
        <Form
            layout='inline'
            form={form}
            className="analysis-search"
            onFinish={onFinish}
        >
            <Form.Item 
                label={<span style={currentStyle}>名称</span>}
                name="name"
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label={<span style={currentStyle}>项目组</span>}
                name="group"
                className="handle-action"
            >
                <Select/>
            </Form.Item>
            <Form.Item 
                label={<span style={currentStyle}>来源</span>}
                name="source"
                className="handle-action"
            >
                <Select/>
            </Form.Item>
            <Form.Item 
                label={<span style={currentStyle}>标注数量</span>}
                name="number"
            >
                <InputNumber min={0} max={10} step={1} defaultValue={0}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">搜索</Button>
            </Form.Item>
            <Form.Item>
                <Upload {...props} maxCount={1} showUploadList={false}>
                    <Button type="primary" loading={pageLoading}>导入图片</Button>
                </Upload>
            </Form.Item>
        </Form>
        <br/>
        <div className="analysis-content">
            <DataTable type={AnalysisLabel} data={data} />
        </div>
      </div>)
    );
}

export default Analysis;