<template>
  <div class="recommend">
    <!-- 调用Title组件  :to="{path:'/musiclist/'+rem.id}-->
    <Title>推荐歌单</Title>
    <ul class="recommendList">
      <router-link tag="li" v-for="rem in recommendMusicList" :key="rem.id" :to="{path:'/musiclist/'+rem.id}" >
        <div>
          <img :src="rem.picUrl" alt="">
          <span>{{rem.playCount|formatNum}}</span>
        </div>
        <p>{{rem.name}}</p>
      </router-link>
    </ul>
    <Loading v-if="recommendMusicList.length <=0"></Loading>
    <Title>最新音乐</Title>
    <!-- 调用 NewMusicItem 组件-->
    <!-- 组件传值 -->
    <NewMusicItem :newMusicList="newMusicList"></NewMusicItem>
  </div>
</template>

<script>
// 导入Title组件
import Title from "../components/Title";
// 导入 最新音乐组件
import NewMusicItem from "../components/NewMusicItem"
import Loading from "../components/Loading"
// 导入
export default {
  name: 'Recommend',
  // 组件
  components: {
    Title,
    NewMusicItem,
    Loading
  },
  data(){
    return{
      recommendMusicList:[],
      newMusicList:[]
    }
  },
  methods:{
    playMusic(id){
      this.$emit("playMusic",id)
    }
  },
  // 定义一个路由守卫
  beforeRouteEnter(to,from,next){
    // 调用 axios ajax请求
    // 推荐歌单
    next(vm=>{
      vm.$http.get("/personalized?limit=6").then(function(data){
        vm.recommendMusicList = data.data.result
        // console.log(data)
      }).catch(error=>{
        console.log(error);
      }),
      // 最新音乐列表
      vm.$http.get("/personalized/newsong").then(function(data){
        vm.newMusicList = data.data.result
        // console.log(data.data)
      }).catch(error=>{
        console.log(error);
      })
    })
  },
  // 过滤器
  filters:{
    formatNum(value){
      // 保留一位小数
      return (value / 10000 ).toFixed(1) + "万"
    }
  }
}
</script>
<style lang="less" scoped>
  .recommend{
      background-color: #fcfcfd;
      padding-top: 20px;
      box-sizing: border-box;
      // padding-bottom: 55px;
      margin-bottom: 50px;
      ul.recommendList{
        // 开启flex布局
        display: flex;
        // 换行
        flex-wrap: wrap;
        // 两端对齐
        justify-content: space-between;
        padding-bottom: 24px;
        li{
          width: 33%;
          margin-bottom: 13px;
          div{
            position: relative;
            span{
              color: #fff;
              font-size: 12px;
              position: absolute;
              top: 2px;
              right: 5px;
              text-shadow: 1px 0 0 rgba(0,0,0,.15);
              &:before{
                content: "";
                display: inline-block;
                width: 11px;
                height: 10px;
                margin-right: 5px;
                background-image: url(../assets/images/u_earp.png);
                background-size: 100%;
              }
            }
          }
          p{
            font-size: 13px;
            padding: 6px 2px 0 6px;
            text-align: left;
            display: -webkit-box;
            // 文字处理
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: 30px;
            line-height: 1.2;
          }
        }
      }
  }
</style>
