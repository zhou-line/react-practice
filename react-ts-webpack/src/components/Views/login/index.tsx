import React from "react";
import "./index.scss";
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import {
    UserOutlined,
    LockOutlined
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {setAuth} from "@/store/actions/adminAction";
import {useDispatch} from "react-redux";
import { getToken, setToken } from "@/utils/auth";

type FieldType = {
    username?: string;
    password?: string;
};


const Login = () => {

    const title = process.env.REACT_APP_PROJECT_NAME
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        setToken('21312')
        const token = getToken()
        console.log(location)
        dispatch(setAuth(token))
        if (location.state) {
            navigate(location.state?.from.pathname);
        } else {
            navigate("/");
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