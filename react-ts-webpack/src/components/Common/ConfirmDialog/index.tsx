import React, { useEffect } from 'react';
import "./index.scss";
import { Button, Modal } from 'antd';
import {ExclamationCircleFilled} from "@ant-design/icons";
import { REC } from '@/constants/annotationn';


interface Props {
    openConfirm: boolean,
    setOpenConfirm: (openConfirm: boolean) => void,
    data: REC[],
    deleteSelectedRec: (recArrs: REC[]) => void
}

const ConfirmDialog = (props: Props) => {

    useEffect(() => {
        console.log(props.openConfirm)

    }, [props.openConfirm])

    return (
        <Modal
            className='message-model'
            title={
                <>
                 <ExclamationCircleFilled/> 是否删除？
                </>
            }
            closable={false}
            style={{top: 55, right: 220}}
            width={400}
            open={props.openConfirm}
            destroyOnClose={true}
            onCancel={() => {
                props.setOpenConfirm(false);
            }}
            footer={[
                <Button key="back" onClick={() => {
                    props.deleteSelectedRec(props.data)
                    props.setOpenConfirm(false);
                }}>
                    确认
                </Button>,
                <Button key="submit" type="primary" danger onClick={() => {
                    props.setOpenConfirm(false);
                }}>
                    取消
                </Button>,
            ]}
        >
            <div>
                该操作不可逆，是否继续
            </div>
        </Modal>
    )
      
};

export default ConfirmDialog;