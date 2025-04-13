import React from 'react';
import { Alert } from 'antd';
import "./index.scss";
import { themeConfig } from '@/styles/theme';

interface AlertMessageProps {
  message: string;
  type: 'success' | 'warning' | 'info';
}

const AlertMessage = (props: AlertMessageProps) => {
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e, 'I was closed.');
  };

  const backgroundColor = props.type === 'success' ? themeConfig.colors.success : props.type === 'warning' ? themeConfig.colors.warning : themeConfig.colors.info;
  
  return (
    <Alert
      style={{ backgroundColor: backgroundColor}}
      className='alert-card'
      message={props.message}
      closable
      onClose={onClose}
    />
  )
};

export default AlertMessage;