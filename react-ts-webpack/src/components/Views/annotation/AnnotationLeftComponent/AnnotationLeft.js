import React, {forwardRef, useEffect, useRef, useState} from "react";
import AnnotationMenuComponent from "./AnnotationMenuComponent/AnnotationMenu";
import './annotationLeft.css'
import AnnotationShowComponent from "./AnnotationShowComponent/AnnotationShow";
import {useDispatch, useSelector} from "react-redux";
import {Spin} from "antd";
import PubSub from "../../PubSub/PubSub";

export default function AnnotationLeftComponent(props) {


    const loading = useSelector(state => state.picture.loading);

    return (
        <div className='left-container'>
            <Spin spinning={loading} tip="Loading..." style={{top: '160px'}}>
                <div className='showPic-container'>
                    <AnnotationShowComponent props={props}/>
                </div>
                <div className='menu-container'>
                    <AnnotationMenuComponent props={props}/>
                </div>
            </Spin>
        </div>
    )
}