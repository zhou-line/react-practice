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
    // const [submit, setSubmit] = useState([])

    // const getLabel = () => {
    //     if (props.target) {
    //         const person = []
    //         const arrLabel = {}
    //         props.target.forEach(item => {
    //             const personLabel = item['labels']
    //             const labels = []
    //             if (personLabel) {
    //                 personLabel.forEach(label => {
    //                     const labelValues = label['label_values']
    //                     const data = []
    //                     labelValues.forEach(value => {
    //                         data.push({
    //                             id: value.id,
    //                             color: value.color,
    //                             title: value.title,
    //                         })
    //                     })
    //                     labels.push({
    //                         id: label.id,
    //                         label: data,
    //                         title: label.title,
    //                         name: item.id + '-' + label.id,
    //                     })
    //                 })
    //             }
    //             person.push({
    //                 title: item.title,
    //                 id: item.id
    //             })
    //             arrLabel[item.id] = {
    //                 title: item.title,
    //                 labels,
    //                 id: item.id
    //             }
    //         })
    //         setLabels(arrLabel)
    //         setPerson(person)
    //         setPersonLabels(arrLabel[person[0].id]?.labels);
    //     }
    // }
    // const handlePersonChange = (value) => {
    //     if (labels) {
    //         onReset()
    //         markForm.setFieldsValue({ person: value });
    //         setSubmittable(true)
    //         setPersonLabels(labels[value].labels);
    //     }
    // };

    // const MarkItem = React.memo(({label}) => (
    //     <Form.Item name={label.id}
    //                label={<label style={{ color: '#848482' }}>{label.title}</label>}
    //                key={label.id}
    //                required={false}
    //     >
    //         <Select
    //             style={{width: 120}}
    //             onChange={() => {
    //                 setSubmittable(false)
    //             }}
    //             options={label.label.map(value => ({
    //                 label: value.title,
    //                 value: value.id,
    //                 color: value.color,
    //             }))}
    //         />
    //     </Form.Item>
    // ))


    // const actModal = (state) => {
    //     setModalOpen(state)
    //     setSubmittable(true)
    // }

    // const handleOk = () => {
    //     const data = submit
    //     markForm.validateFields().then((values) => {
    //         const label = {}
    //         for (const name in values) {
    //             if (name !== 'person') {
    //                 label[name] = values[name]
    //             }
    //         }
    //         const value = {
    //             pictureId: data.pictureId,
    //             annotator: data.annotator,
    //             targetId: values['person'],
    //             annotation: {
    //                 left: data.x,
    //                 top: data.y,
    //                 width: data.w,
    //                 height: data.h
    //             },
    //             labelValues: label
    //         }
    //         REST.addAnnotation(value).then((res) => {
    //             props.setNewRec({
    //                 picId: picId,
    //                 type: '新增',
    //             })
    //             onReset()
    //             actModal(false)
    //         })
    //     }).catch((info) => {
    //         console.log('Validate Failed:', info);
    //     });
    // }

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
                    // initialValue={person.length > 0 ? person[0].id : null}
                    label={<label>标注对象</label>}>
                    <Select
                        style={{width: 120}}
                        // onChange={handlePersonChange}
                        // options={person.length > 0 ? person.map(value => ({
                        //     label: value.title,
                        //     value: value.id
                        // })) : []}
                    />
                </Form.Item>
                {/* {personLabels ? personLabels.map((item, index) => <MarkItem label={item} index={index} key={item.name} />) : null} */}
            </Form>
        </Modal>
       
    )
}