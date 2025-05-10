import React, {useEffect} from 'react'
import {HashRouter} from 'react-router-dom';
import {RouterView} from "./routes";
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setMessageApi } from './store/actions/photoAction';

const App: React.FC = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = JSON.stringify(process.env.REACT_APP_PROJECT_NAME).replaceAll("\"", "");
        dispatch(setMessageApi(messageApi))
    }, []);
  
    return (
        <HashRouter>
            {contextHolder}
            <RouterView/>
        </HashRouter>
    )
}
export default App