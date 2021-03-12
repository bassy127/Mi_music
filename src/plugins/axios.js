"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = { //axios的配置
  // 设置 请求 的域名
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: "http://musicapi.leanapp.cn/",
  // baseURL: "http://music.kele8.cn",
  // baseURL: "http://192.168.90.79:3000/"
  // baseURL: "http://192.168.90.2:3000/"
  // 请求的 超时时间
  // timeout: 60 * 1000, // Timeout
  // 验证跨域
  // withCredentials: true, // Check cross-site Access-Control
};

/*
  axios()、axios.get()、axios.post()、axios.create(config)
*/
// 根据配置创建 axios实例
const _axios = axios.create(config);

// axios ajax请求的前置配置
_axios.interceptors.request.use( // use也是promise形式
  function(config) {
    // Do something before request is sent

    // conifg.headers.token = "hellotoken testtoken"; // 在请求头部添加标记，一般与cookie session ID 对应，【注意：如果头部不允许添加标记，则在请求 地址后面url后面添加一个token，如：
    // config.url += "?token = 12343445452-=sfssfxe3"
    // console.log(config);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// axios 请求之后的后置配置
// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    // 在后置配置 处理服务器 返回的数据
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

/*
  vue的插件规范
    1. install 方法 就是插件 安装方法
*/
// 把 axios做成vue的插件
Plugin.install = function(Vue) { // 插件配置
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, { // 扩展vue的原型对象（给vue的原型对象添加属性）
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
    $http: {
      get(){
        return _axios;
      }
    },
  });
};
// 安装插件
Vue.use(Plugin)

export default Plugin;
