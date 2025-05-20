import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import DataTable from "@/components/Common/dataTable";
import './index.scss'
import {useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AnalysisLabel } from "@/constants/list";
import { getCookie } from "@/utils/auth";
import { getImages, getStudyGroup } from "@/api/app";
import { setLoading } from "@/store/actions/photoAction";
import { isChineseRegex } from "@/utils/tools";

const currentStyle = {
    color: '#ffffff',
};

const Analysis = () => {
    const loading = useSelector((state: RootState) => state.phote.loading)
    const messageApi = useSelector((state: RootState) => state.phote.messageApi)
    const [pageLoading, setPageLoading] = useState(false)
    const [data, setData] = useState([])
    const [dataGroups, setDataGroups] = useState<any>([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)

    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const onFinish = () => {
        if (current === -1) {
            setCurrent(1)
        } else {
            setCurrent(-1)
        }
       
        setPageLoading(true)
    }

    useEffect(() => {
        const getData = async () => {
            const [groups, images] = await Promise.all([
                getStudyGroup(), 
                getImages({
                    page: current > 0 ? current : 1,
                    ...form.getFieldsValue()
                })
            ])
            const labels = []
            for (const group of groups.data) {
                labels.push({
                    value: group.id,
                    label: group.title
                })
            }
            setDataGroups(labels)
            setData(images.data.data)
            setTotal(images.data.total)
            dispatch(setLoading(false))
            setPageLoading(false)
        }
        getData()
    }, [current, pageLoading])

    
  
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
                <Input />
            </Form.Item>
            <Form.Item 
                label={<span style={currentStyle}>项目组</span>}
                name="group"
                className="handle-action"
            >
                <Select
                    allowClear={true}
                    className="item-select"
                    options={dataGroups}
                />
            </Form.Item>
            <Form.Item 
                label={<span style={currentStyle}>来源</span>}
                name="source"
                className="handle-action"
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label={<span style={currentStyle}>标注数量</span>}
                name="number"
            >
                <InputNumber min={0} step={1}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={pageLoading}>搜索</Button>
            </Form.Item>
            <Form.Item>
                <Upload
                    action={'http://localhost:8000/apps/upload_image'}
                    headers={{
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': getCookie("csrftoken"),
                    }}
                    beforeUpload={(file) => {
                        setPageLoading(true)
                        const isPNG = file.type === 'image/png';
                        const isChinese = isChineseRegex(file.name)
                        if (!isPNG) {
                            messageApi.error('图片格式错误，请上传PNG格式');
                            setPageLoading(false)
                            return isPNG || Upload.LIST_IGNORE;
                        }
                        if (isChinese) {
                            messageApi.error('图片名称不能包含中文');
                            setPageLoading(false)
                            return !isChinese || Upload.LIST_IGNORE;
                        }
                        return isPNG || Upload.LIST_IGNORE;
                    }}
                    onChange={(info) => {
                        const res = info.file;
                        if (res.status === "done") {
                            const response = res.response
                            if (response.code === 200) {
                                messageApi.success(response.message);
                            } else {
                                messageApi.error(response.message);
                            }
                            setPageLoading(false)
                            if (current === 1) {
                                setCurrent(-1)
                            } else {
                                setCurrent(1)
                            }
                        }
                    }}
                    maxCount={1} 
                    showUploadList={false} 
                    withCredentials={true}>
                    <Button type="primary" loading={pageLoading}>导入图片</Button>
                </Upload>
            </Form.Item>
        </Form>
        <br/>
        <div className="analysis-content">
            <DataTable 
                type={AnalysisLabel} 
                data={data} 
                setCurrent={setCurrent} 
                current={current} 
                loading={pageLoading} 
                setLoading={setPageLoading}
                total={total}
            />
        </div>
      </div>)
    );
}

export default Analysis;