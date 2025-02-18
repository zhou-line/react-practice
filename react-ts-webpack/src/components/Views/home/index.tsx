import React, { useState } from "react";
function Home() {
    const [count, setCounts] = useState('');

    const onChange = (e: any) => {
        setCounts(e.target.value);
    };

    return (
        <>
            <h2>124459995543</h2>
            <input type="text" value={count} onChange={onChange} />
            <br />
            <p>非受控组件</p>
            <input type="text" />
        </>
    );
}

export default Home;