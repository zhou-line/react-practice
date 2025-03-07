import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {setAuth} from "@/store/actions/adminAction";
const Notice = () => {
    const [count, setCounts] = useState('');

    const onChange = (e: any) => {
        setCounts(e.target.value);
    };

    const dispatch = useDispatch()

    return (
        <>
            <h2>124459995543</h2>
            <p>受控组件11</p>
            <input type="text" value={count} onChange={onChange} />
            <br />
            <p>非受控组件</p>
            <a onClick={() => dispatch(setAuth(''))} >2222222222</a>
        </>
    );
}

export default Notice;