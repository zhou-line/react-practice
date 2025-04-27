import React, {useEffect} from 'react'
import {HashRouter} from 'react-router-dom';
import {RouterView} from "./routes";

const App: React.FC = () => {


    useEffect(() => {
        document.title = JSON.stringify(process.env.REACT_APP_PROJECT_NAME).replaceAll("\"", "");
    }, []);
  
    return (
        <HashRouter>
            <RouterView/>
        </HashRouter>
    )
}
export default App