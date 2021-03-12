import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入页面组件
import Recommend from '../views/Recommend.vue'

Vue.use(VueRouter)

const routes = [
  { // 推荐歌单组件
    path: '/',
    name: 'Recommend',
    component: Recommend,
    // 设定 原信息
    meta:{showNav:true}
  },
  { //热歌榜组件
    path: '/hotmusic',
    name: 'HotMusic',
    // 懒加载
    component:()=>import("../views/HotMusic.vue"),
    meta:{showNav:true}
  },
  { //热歌榜组件
    path: '/hotmusic/:pageNum',
    name: 'HotMusic',
    // 懒加载
    component:()=>import("../views/HotMusic.vue"),
    meta:{showNav:true}
  },
  { //搜索
    path: '/search',
    name: 'SearchMusic',
    // 懒加载
    component: ()=>import("../views/SearchMusic.vue"),
    meta:{showNav:true}
  },
  { //推荐歌单 详情页
    path: '/musiclist/:musicID',
    name: 'SongSheet',
    // 懒加载
    component: ()=>import("../views/SongSheet.vue"),
    meta: {showNav: false}
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
