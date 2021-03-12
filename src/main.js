import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 定义一个全局的对象 存储musicID
let playMusic={
  musicID:0,
  isPlay:false,
}
new Vue({
  router,
  data:{//将全局对象实例为 vue的属性
    playMusic:playMusic
  },
  render: h => h(App)
}).$mount('#app')
