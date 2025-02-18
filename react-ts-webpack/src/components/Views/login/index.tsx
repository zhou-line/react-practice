import React, { useState } from "react";
const Login = () => {
    const [count, setCounts] = useState('');

    const onChange = (e: any) => {
        setCounts(e.target.value);
    };

    return (
        <>
            <h2>124459995543</h2>
            <p>受控组件11</p>
            <input type="text" value={count} onChange={onChange} />
            <br />
            <p>非受控组件</p>
            <input type="text" />
        </>
    );
}

export default Login;