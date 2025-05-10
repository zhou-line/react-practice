import React from 'react';
import {Avatar, Badge, Dropdown, MenuProps} from 'antd';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NavLink } from 'react-router-dom';
import { logout } from '@/api/user';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuKey } from '@/store/actions/adminAction';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

interface Props {
    user: string,
    current: HTMLDivElement | null,
}


const Head = (props: Props) => {
    const { width } = useWindowSize();
    const numColor = Math.floor(Math.random() * 4)
    const color = ColorList[numColor]
    const messageApi = useSelector((state: RootState) => state.phote.messageApi)
    const dispatch = useDispatch();
    const gap = 1;

    const BREAKPOINT_SM = 768;

    const items: MenuProps['items'] = [
        {
            label: <NavLink to={"/user"} >用户信息</NavLink>,
            key: '0',
            onClick: () => {
                console.log('用户信息');
                dispatch(setMenuKey('user'))
            }
        },
        {
            label: (<NavLink to={"/notice"} ><Badge dot>消息通知</Badge></NavLink>),
            key: '1',
            onClick: () => {
                console.log('消息通知')
                dispatch(setMenuKey('notice'))
            }
        },
        {
            label: <NavLink to={"/login"} >退出登录</NavLink>,
            key: '3',
            onClick: async () => {
               await logout()
               messageApi.success('退出成功')
            }
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
                <a onClick={(e) => {
                    e.preventDefault()
                }}>
                    <div>
                        {renderUserInfo()}
                        <span style={{color: '#ffffff'}}> {width > BREAKPOINT_SM ? props.user : null}</span>
                    </div>
                </a>
            </Dropdown>

    );
};

export default Head;