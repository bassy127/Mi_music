<template>
  <div id="app">
    <!-- 调用组件 -->
    <TopNav v-show="$route.meta.showNav"></TopNav>
    <!-- router-view：路由匹配到视图组件显示位置 -->
    <keep-alive>
      <router-view class="view" @playMusic="playMusic"/>
    </keep-alive>
    <Player class="player" :musicID = "$root.playMusic.musicID"></Player>
  </div>
</template>

<script>
// App.vue 是根组件
// 导入components文件中的组件
import TopNav from "./components/TopNav"
import Player from "./components/Player"
export default {
  components:{
    TopNav,
    Player
  },
  data() {
    return{
      // musicID: this.$root.playMusic.musicID
    }
  },
  methods:{
    playMusic(id){
      this.musicID=id
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.player{
  position: fixed;
  bottom: 0;
  left: 0;
}
.view{
  margin-bottom: 80px;
}
</style>
