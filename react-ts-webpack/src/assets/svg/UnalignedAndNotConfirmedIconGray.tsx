import Icon from '@ant-design/icons';
import React from 'react';

export const UnalignedAndNotConfirmedIconGray = (props: any) => {
    const Svg = () => (
        <svg width="18" height="17" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="11" stroke="#848482" strokeWidth="2"/>
            <rect x="11" y="14" width="8" height="2" rx="1" fill="#848482"/>
        </svg>
    )

    return (
        <Icon component={Svg} {...props}/>
    )
}
