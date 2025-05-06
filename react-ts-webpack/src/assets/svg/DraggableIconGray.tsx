import Icon from '@ant-design/icons';
import React from 'react';


export const DraggableIconGray = (props: any) => {
    const Svg = () => (
        <svg width="21" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H12V7.5L6 12L0 7.5V0Z" fill="#848482"/>
        </svg>
    )
    return (
        <Icon component={Svg} {...props} />
    )
}