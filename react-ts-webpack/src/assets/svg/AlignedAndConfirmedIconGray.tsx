import Icon from '@ant-design/icons';
import React from 'react';


export const AlignedAndConfirmedIconGray = (props: any) => {
    const Svg = () => (
        <svg width="25" height="25" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="8" width="17" height="2" rx="1" fill="#848482"/>
            <rect x="7" y="14" width="10" height="2" rx="1" fill="#848482"/>
            <rect x="7" y="20" width="6" height="2" rx="1" fill="#848482"/>
            <path d="M14.5 19L18 22L24 16" stroke="#848482" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )

    return (
        <Icon component={Svg} {...props}/>
    )
}