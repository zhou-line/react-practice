import React from "react";
import {NavLink} from "react-router-dom";
function Home() {

    return (
        <div>
            <NavLink to={{pathname:'/404'}}>404</NavLink>
        </div>
    );
}

export default Home;