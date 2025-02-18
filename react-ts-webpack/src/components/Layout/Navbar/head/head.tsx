import React from 'react';
import {Avatar, Badge, Dropdown, MenuProps, Space} from 'antd';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const Head: React.FC = () => {
    const user = "Chen xiao"
    const numColor = Math.floor(Math.random() * 4)
    const color = ColorList[numColor]
    const gap = 1;


    const items: MenuProps['items'] = [
        {
            label: '用户信息',
            key: '0',
        },
        {
            label: (<Badge dot>消息通知</Badge>),
            key: '1',
        },
        {
            label: '退出登录',
            key: '3',
        },
    ];

    return (

            <Dropdown menu={{ items }} placement="bottomLeft">
                <a onClick={(e) => e.preventDefault()}>
                    <div>
                        <Space>
                            <Badge dot>
                                <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }}
                                        size="large"
                                        gap={gap}>
                                    {user[0]}
                                </Avatar>
                            </Badge>
                            {user}
                        </Space>
                    </div>
                </a>
            </Dropdown>

    );
};

export default Head;