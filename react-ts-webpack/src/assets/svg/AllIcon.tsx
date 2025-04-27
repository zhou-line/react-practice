import Icon from '@ant-design/icons';
import React from 'react';

const AllIcon = (props: any) => {
    const Svg = () => (
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em"
             height="1em">
            <path d="M512 512m-512 0a100 100 0 1 0 1024 0 100 100 0 1 0-1024 0Z" fill={props.color || "#848482"}
            />
        </svg>
    )

    return (
        <Icon component={Svg} {...props} />
    )
}

export default AllIcon;