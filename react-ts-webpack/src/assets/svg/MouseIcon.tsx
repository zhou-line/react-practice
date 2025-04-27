import Icon from '@ant-design/icons';
import React from 'react';

const MouseIcon = (props: any) => {
    const Svg = () => (
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="1em" height="1em">
            <path
                d="M153.6 0l12.288 128.768 42.906 600.934 6.144 104.192 85.81-55.142s55.194-30.72 116.532-73.626l153.293 263.68L601.242 1024l55.142-30.669 104.243-61.286 55.194-30.72-30.669-55.143-153.293-263.68a20232.653 20232.653 0 0 0 122.675-67.43l85.812-49.05-79.719-55.193L257.843 73.574 153.6 0z m73.574 122.624l496.64 337.254s-79.667 42.906-177.766 98.1l183.91 312.73-104.192 61.337L441.805 613.17c-92.007 49.05-171.725 104.243-171.725 104.243l-42.906-594.79z"
                fill={props.color}></path>
        </svg>
    )

    return (
        <Icon component={Svg} {...props} />
    )
}

export default MouseIcon;