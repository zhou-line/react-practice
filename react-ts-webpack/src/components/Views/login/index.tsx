import React from "react";
import "./index.scss";
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import {
    UserOutlined,
    LockOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {setAuth, setMenuKey} from "@/store/actions/adminAction";
import {useDispatch, useSelector} from "react-redux";
import { getSession, login } from "@/api/user";
import { RootState } from "@/store/store";

interface LoginResponse {
    code: number;
    message: string;
    token: string;
    is_authenticated: boolean;
    
}

type FieldType = {
    username?: string;
    password?: string;
};

const Login = () => {
    const title = process.env.REACT_APP_PROJECT_NAME
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const messageApi = useSelector((state: RootState) => state.phote.messageApi)

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const response = await login(values);
            const res = response as any as LoginResponse;
            if (res.code === 200) {
                const session = await getSession();
                const value = session as any as LoginResponse;
                if (value.is_authenticated) {
                    dispatch(setAuth(value.token));
                    dispatch(setMenuKey('home'));
                    navigate("/");
                    messageApi.success('登录成功');
                } else {
                    messageApi.error('登录失败，请重试');
                }
            } else {
                messageApi.error('登录失败，请重试');
            }
        } catch (error) {
            messageApi.error('登录失败，请重试');
            console.error('登录错误:', error);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-container">
            <Form
                name="basic"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className="title-container">
                    <h3 className="title">{title}</h3>
                </div>

                <Form.Item<FieldType>
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input size="large" prefix={<UserOutlined />} placeholder="Username" autoComplete="password"/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input size="large" prefix={<LockOutlined />} type="password" placeholder="Password" autoComplete="current-password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" size={"large"} autoInsertSpace>
                        Log in
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
}

export default Login;