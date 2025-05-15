import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import { getCookie, getToken, removeToken } from './auth';
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'


// create an axios instance
const service: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // Django 服务器地址
    timeout: 5000,
    withCredentials: true, // 允许携带 cookie
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        "X-CSRFToken": getCookie("csrftoken")
    }
})

// request interceptor
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // do something before request is sent
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // if (store.getters.token) {
        //     // let each request carry token
        //     // ['X-Token'] is a custom headers key
        //     // please modify it according to the actual situation
        //     config.headers['Authorization'] = getToken()
        // }
        return config
    },
    (error: AxiosError) => {

        if (error.status === 401) {
            // token 过期或无效
            window.location.href = `/login`;
            return Promise.reject(new Error('认证失败，请重新登录'));
        }
        if (error.code === "ERR_NETWORK") {
            window.location.href = '#/404';
        }
        // do something with request error
        console.log(error) // for debug
        console.log(222)
        window.location.href = '#/404';
        return Promise.reject(error);
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response: AxiosResponse) => {
        const res = response.data

        // if the custom code is not 200, it is judged as an error.
        if (res.code !== 200) {
            return Promise.reject(new Error(res.message || '请求失败'));
            // Message({
            //     message: res.msg || 'Error',
            //     type: 'error',
            //     duration: 5 * 1000
            // })
            // // 401: Illegal token;
            // if (res.code === 401) {
            //     // to re-login
            //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
            //         confirmButtonText: 'Re-Login',
            //         cancelButtonText: 'Cancel',
            //         type: 'warning'
            //     }).then(() => {
            //         store.dispatch('user/resetToken').then(() => {
            //             location.reload()
            //         })
            //     })
            // }
            // return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        // if (error.toString().includes('401')) {
        //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //         confirmButtonText: 'Re-Login',
        //         cancelButtonText: 'Cancel',
        //         type: 'warning'
        //     }).then(() => {
        //         store.dispatch('user/resetToken').then(() => {
        //             location.reload()
        //         })
        //     })
        // }
        // console.log('err' + error) // for debug
        // Message({
        //     message: error.msg,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        console.log(error)
        if (error.status === 403) {
            // token 过期或无效
            removeToken();
            window.location.href = '/login';
        }
        if (error.code === "ERR_NETWORK") {
            window.location.href = '#/404';
        }
        console.log(66666)
        return Promise.reject(error);
    }
)

export default service