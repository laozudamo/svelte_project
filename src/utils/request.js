import axios from 'axios'

// import { createToaster } from "@meforma/vue-toaster";
// const toaster = createToaster({ type: 'error', position: 'top', duration: 3000 });

// import store from '@/store';
// create an axios instance
const service = axios.create({
    baseURL:'http://' + import.meta.env.VITE_BASE_API,
    // timeout: 6000, // request timeou
    headers: {
        'Content-Type': 'application/json;application/x-www-form-urlencoded;charset=UTF-8'
    }
})

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Token'] = token
    }
    return config;
},
    error => {
        // Do something with request error
        return Promise.reject(error);
    });

    console.log(import.meta.env.BASE_URL)


// response interceptor
/* 
  1030 token失效
*/
service.interceptors.response.use(response => {
    const { code, msg } = response.data
    if (code !== 0) {
        // toaster.show(`${msg}`);
        // if (code === 1030) {
        //     store.dispatch('user/REST_TOKEN').then(() => {
        //         location.reload()
        //     })
        // }
    }

    return response.data
},
    error => {
        switch (error.code) {
            case "ECONNABORTED":
                // toaster.show("请求超时,请重试")
                break;
            case "ERR_NETWORK":
                // toaster.show("服务器不在线")
                break
            default:
                console.log(error)
        }

        const { response } = error
        if (response && response.status === 500) {
            // toaster.show('服务器内部错误')
        }

        return Promise.reject(error);
    }
)

export default service