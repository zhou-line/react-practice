import React from 'react';
import { Alert } from 'antd';
import "./index.scss";
import { themeConfig } from '@/styles/theme';
import { deleteNotices } from '@/api/app';

interface AlertMessageProps {
  message: string;
  type: 'success' | 'warning' | 'info';
  item: any
}

const AlertMessage = (props: AlertMessageProps) => {

  const onClose = async (item: any) => {
    await deleteNotices({
      id: item.id
    })
  }

  const backgroundColor = props.type === 'success' ? themeConfig.colors.success : props.type === 'warning' ? themeConfig.colors.warning : themeConfig.colors.info;
  
  return (
    <Alert
      style={{ backgroundColor: backgroundColor}}
      className='alert-card'
      message={props.message}
      closable
      onClose={() => onClose(props.item)}
    />
  )
};

export default AlertMessage;