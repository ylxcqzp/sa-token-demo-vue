import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8088'; //后端开发地址
axios.defaults.timeout = 10000
// 请求头信息是为post请求设置
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'


// 请求拦截器
axios.interceptors.request.use((config) => {
    if (localStorage.getItem("Authorization")) {
        config.headers['Access-Token'] = localStorage.getItem("Authorization")
        console.log(config.headers['Access-Token']);
    }
    return config;
},error => {
    return Promise.reject(error);
})

// 响应拦截器
axios.interceptors.response.use(response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    console.log(response);
    if (response.status === 200) {
        if (response.data.code === 511) {
            // 未授权调取授权接口
        } else if (response.data.code === 510) {
            // 未登录跳转登录页
        } else if (response.data.code === 401) {
            localStorage.removeItem('Authorization');
            this.$router.push("/login");
        } else {
            return Promise.resolve(response)
        }
    } else {
        return Promise.reject(response)
    }
}, error => {
    // 我们可以在这里对异常状态作统一处理
    if (error.response.status) {
        // 处理请求失败的情况
        // 对不同返回码对相应处理
        return Promise.reject(error.response)
    }
})

// get 请求
export function httpGet(url,params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// post请求

export function httpPost(url,data,params) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
           /* transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],*/
            params,
            data,
            timeout:10000,
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err);
        })
    })
}



