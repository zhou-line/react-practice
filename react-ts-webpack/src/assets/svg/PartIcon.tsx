import Icon from '@ant-design/icons';
import React from 'react';

const PartIcon = (props:any) => {
    const Svg = () => (
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em"
             height="1em">
            <path
                d="M512 64a448 448 0 1 0 448 448 448 448 0 0 0-448-448z m-5.76 814.08V133.76a372.48 372.48 0 0 1 0 744.32z"
                fill={props.color || "#848482"}/>
        </svg>
    )

    return (
        <Icon component={Svg} {...props} />
    )
}

export default PartIcon;