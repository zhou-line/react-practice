import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {setAuth} from "@/store/actions/adminAction";

const Analysis = () => {
    const dispatch = useDispatch()
    const [count, setCounts] = useState('');

    const onChange = (e: any) => {
        setCounts(e.target.value);
    };

    return (
        <>
            <input type="text" value={count} onChange={onChange} />
            <br />
            <p>非受控组件</p>
            <input type="text" />
            <a onClick={() => dispatch(setAuth(''))} >2222222222</a>
        </>
    );
}

export default Analysis;