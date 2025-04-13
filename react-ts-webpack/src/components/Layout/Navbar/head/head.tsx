import React from 'react';
import {Avatar, Badge, Dropdown, MenuProps} from 'antd';
import { useWindowSize } from '@/hooks/useWindowSize';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

interface Props {
    user: string,
    current: HTMLDivElement | null,
}


const Head = (props: Props) => {
    const { width } = useWindowSize();
    const numColor = Math.floor(Math.random() * 4)
    const color = ColorList[numColor]
    const gap = 1;

    const BREAKPOINT_SM = 768;

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

    // 根据屏幕宽度决定如何显示用户信息
    const renderUserInfo = () => {
    
        return (
            <Badge dot>
                <Avatar 
                    style={{ 
                        backgroundColor: color, 
                        verticalAlign: 'middle' 
                    }}
                    size="large"
                    gap={gap}
                >
                    {props.user[0]}
                </Avatar>
            </Badge>
        )
    }
    


    return (

            <Dropdown menu={{ items }} placement="bottomLeft">
                <a onClick={(e) => e.preventDefault()}>
                    <div>
                        
                        {renderUserInfo()}
                        <span style={{color: '#ffffff'}}> {width > BREAKPOINT_SM ? props.user : null}</span>
                    </div>
                </a>
            </Dropdown>

    );
};

export default Head;