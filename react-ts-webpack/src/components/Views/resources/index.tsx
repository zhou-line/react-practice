import React, { useEffect, useState } from "react";
import { Button, Form, Input, Popconfirm, Select } from "antd";
import DataTable from "@/components/Common/dataTable";
import './index.scss'
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { ResourceLabel } from "@/constants/list";
import { setLoading } from "@/store/actions/photoAction";
import { exportSlices, getImages, getSclies, getStudyGroup } from "@/api/app";

const currentStyle = {
    color: '#ffffff',
};

const Resources = () => {

    const [form] = Form.useForm();
    const loading = useSelector((state: RootState) => state.phote.loading)
    const messageApi = useSelector((state: RootState) => state.phote.messageApi)
    const [pageLoading, setPageLoading] = useState(false)
    const [data, setData] = useState([])
    const [dataGroups, setDataGroups] = useState<any>([])
    const [current, setCurrent] = useState(1)
    const [imageLabels, setImageLabels] = useState<any>([])
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch()


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
            const [groups, sclies, images] = await Promise.all([
                getStudyGroup(), 
                getSclies({
                    page: current > 0 ? current : 1,
                    ...form.getFieldsValue()
                }),
                getImages({
                    page: -1,
                })
            ])
            const labels = []
            const imageList = []
            for (const group of groups.data) {
                labels.push({
                    value: group.title,
                    label: group.title
                })
            }
            for (const image of images.data) {
                console.log(image)
                imageList.push({
                    value: image.title,
                    label: image.title
                })
            }
            setImageLabels(imageList)
            setDataGroups(labels)
            setData(sclies.data.data)
            setTotal(sclies.data.total)
            dispatch(setLoading(false))
            setPageLoading(false)
        }
        getData()
    }, [current, pageLoading])


    const exportPics = async () => {
        if (data.length === 0) {
            messageApi.error('切片数据为空，请先进行标注确认')
            return 
        }
        if (form.getFieldValue('source')) {
            setPageLoading(true)
            await exportSlices({
                picture_name: form.getFieldValue('source')
            })
            messageApi.success('导出成功')
            setPageLoading(false)
        } else {
            messageApi.error('请先选择图源')
        }
    }
  
    return (
      (!loading && <div className="resources-container">
        <Form
            className="resources-search"
            layout='inline'
            form={form}
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
                <Select
                    allowClear={true}
                    className="item-select"
                    options={dataGroups}
                />
            </Form.Item>
            <Form.Item 
                label={<span style={currentStyle}>图源</span>}
                name="source"
                className="handle-action"
            >
                <Select
                    allowClear={true}
                    className="item-select"
                    options={imageLabels}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">搜索</Button>
            </Form.Item>
            <Form.Item>
                <Popconfirm
                    title="导出图片"
                    description="该操作会造成不可逆的结果，是否继续?"
                    onConfirm={() => {
                        exportPics()
                    }}
                    onCancel={() => {}}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button 
                        type="primary"
                    >导出切片</Button>
                </Popconfirm>
            </Form.Item>
        </Form>

        <br/>

        <div className="resources-content">
            <DataTable 
                type={ResourceLabel} 
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

export default Resources;