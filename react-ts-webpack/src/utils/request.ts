import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
//
// 定义响应数据的泛型类型
interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}
// create an axios instance
const service: AxiosInstance = axios.create({
    baseURL: '', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    headers: {}
})

// request interceptor
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // do something before request is sent

        // if (store.getters.token) {
        //     // let each request carry token
        //     // ['X-Token'] is a custom headers key
        //     // please modify it according to the actual situation
        //     config.headers['Authorization'] = getToken()
        // }
        return config
    },
    (error: AxiosError) => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
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
        return Promise.reject(error)
    }
)

// 封装 GET 请求
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return service.get(url, config);
};

// 封装 POST 请求
export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return service.post(url, data, config);
};

// 封装 PUT 请求
export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return service.put(url, data, config);
};

// 封装 DELETE 请求
export const deleteRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return service.delete(url, config);
};