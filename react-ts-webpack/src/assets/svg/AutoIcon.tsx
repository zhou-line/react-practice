import Icon from '@ant-design/icons';
import React from 'react';

const AutoIcon = (props: any) => {
    const Svg = () => (
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="1rem" height="1rem">
            <path
                d="M64 97.6c0-18.56 15.04-33.6 33.6-33.6H198.4c18.56 0 33.6 15.04 33.6 33.6v22.4h560v-22.4c0-18.56 15.04-33.6 33.6-33.6h100.8c18.56 0 33.6 15.04 33.6 33.6V198.4c0 18.56-15.04 33.6-33.6 33.6h-22.4v560h22.4c18.56 0 33.6 15.04 33.6 33.6v100.8c0 18.56-15.04 33.6-33.6 33.6H825.6a33.6 33.6 0 0 1-33.6-33.6v-22.4h-560v22.4c0 18.56-15.04 33.6-33.6 33.6H97.6A33.6 33.6 0 0 1 64 926.4V825.6c0-18.56 15.04-33.6 33.6-33.6h22.4v-560h-22.4A33.6 33.6 0 0 1 64 198.4V97.6z m112 134.4v560h22.4c18.56 0 33.6 15.04 33.6 33.6v22.4h560v-22.4c0-18.56 15.04-33.6 33.6-33.6h22.4v-560h-22.4a33.6 33.6 0 0 1-33.6-33.6v-22.4h-560v22.4c0 18.56-15.04 33.6-33.6 33.6h-22.4z"
                fill={props.props.color}></path>
        </svg>
    )

    return (
        <Icon component={Svg} {...props} />
    )
}

export default AutoIcon;