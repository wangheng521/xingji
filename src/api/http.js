import axios from 'axios'

// 配置axios响应拦截器，将res.data赋值给res，以后我们得到响应结果的时候，可以直接使用res，不用res.data了
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log(response);
    console.log(1);
    
    // 我们接收到的是res.data，如果不存在，就接收到res
    return response.data || response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 导出修改后的axios
export default axios