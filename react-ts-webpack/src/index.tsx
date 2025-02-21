import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from "./store/store";
import {Provider} from "react-redux";

const root = document.querySelector('#root')

if(root) {
    createRoot(root).render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    )
}
