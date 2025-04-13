import React from 'react';
import { Col, Form, Input, Row, theme } from 'antd';
import USER_INFO_LABELS, { userInfoLabels} from '@/constants/user';

const AdvancedSearchForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: '#001529',
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const labelStyle: React.CSSProperties = {
    color: '#ffffff'
  };

  const labels = USER_INFO_LABELS
  const labelLength = Object.keys(labels).length

  const getFields = () => {
    const children = [];
    for (let i = 0; i < labelLength; i++) {
      children.push(
        <Col span={8} key={i}>
            <Form.Item
              name={`field-${i}`}
              label={<span style={labelStyle}>{userInfoLabels(i).name}</span>}
              rules={[
                {
                  required: userInfoLabels(i).isRequire,
                  message: 'Input something!',
                },
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
        </Col>,
      );
    }
    return children;
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form 
        form={form} 
        name="advanced_search" 
        style={formStyle} 
        onFinish={onFinish}
        layout="vertical"
    >
      <Row gutter={24}>{getFields()}</Row>
    </Form>
  );
};

const UserInfo: React.FC = () => {

  return (
    <>
      <AdvancedSearchForm />
    </>
  );
};

export default UserInfo;