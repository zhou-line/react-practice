import React, { useState } from 'react'
import * as styles from './index.module.css'

function Screen() {
    const [ count, setCounts ] = useState('')
    const onChange = (e: any) => {
        setCounts(e.target.value)
    }
    return (
        <>
            <h2>124459995543</h2>
            <p className={styles.title}>受控组件11</p>
            <input type="text" value={count} onChange={onChange} />
            <br />
            <p>非受控组件</p>
            <input type="text" />
        </>
    )
}
export default Screen