import React, { useEffect } from 'react';
import { Col, Form, Input, Row, theme } from 'antd';
import USER_INFO_LABELS, {userInfoLabels} from '@/constants/user';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getInfo } from '@/api/user';

const AdvancedSearchForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const labels = USER_INFO_LABELS
  const labelLength = Object.keys(labels).length
  const auth = useSelector<RootState, string>(state => state.admin.auth)

  const labelStyle: React.CSSProperties = {
    color: '#ffffff'
  };
  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: '#001529',
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  useEffect(() => {
    if (auth) {
        Promise.resolve(getInfo(auth)).then((res: any) => {
          form.setFieldsValue(res.data)
        })
    }
  }, [token])

  const getFields = () => {
    const children = [];
    for (let i = 0; i < labelLength; i++) {
      children.push(
        <Col span={8} key={i}>
            <Form.Item
              name={userInfoLabels(i).id}
              label={<span style={labelStyle}>{userInfoLabels(i).name}</span>}
            >
              <Input 
                disabled={true} 
                placeholder={`请输入${userInfoLabels(i).name}`} 
              />
            </Form.Item>
        </Col>,
      );
    }
    return children;
  };

  return (
    <Form 
        form={form} 
        name="advanced_search" 
        style={formStyle} 
        layout="vertical"
    >
      <Row gutter={24}>{getFields()}</Row>
    </Form>
  );
};

const UserInfo: React.FC = () => {

  return (
    <AdvancedSearchForm />
  );
};

export default UserInfo;