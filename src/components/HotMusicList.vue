<template>
<!-- 热歌榜 组件 -->
    <div class="hotlist">
        <ul>
            <!-- <router-link to="/" tag="li" v-for="(hotItem,index) in hotMusicList" :key="hotItem.songs[0].id">
                <em class="num" :class="index<=2 ? 'hot':'' ">{{(index+1) | formatNum}}</em>
                <div class="fl">
                    <div class="song">{{hotItem.songs.name}}</div>
                        <div class="singer">
                            <i v-if="hotItem.privileges[0].maxbr >= 999000"></i>
                            <span v-for="(artist,index) in hotItem.songs[0].ar" :key="index">
                                <template v-if="index"> / </template>
                                {{artist.name}}
                            </span>
                            - {{hotItem.songs[0].al.name}}
                        </div>
                </div>
                <div class="fr">
                    <span></span>
                </div>
            </router-link> -->

            <!-- 调用Music组件 -->
            <MusicList v-for="(mItem,index) in hotMusicList" :mItem="mItem" :key="mItem.id">
                <em class="num" :class="index<=2 ? 'hot':'' ">{{(index+1) | formatNum}}</em>
            </MusicList>
            <Loading v-if="hotMusicList.length <=0"></Loading>
        </ul>
        <!-- <router-link :to="`/hotmusic/${pageNum+1}`" v-if="hotMusicList.length>0"  class="more" >更多</router-link> -->
        <span @click="click" v-show="hotMusicList.length!=0"  class="more">更多</span>
        <p ref="scrollbar"></p>
    </div>
</template>
<script>
import MusicList from "../components/MusicList"
import Loading from "../components/Loading"
export default {
    components:{
        MusicList,
        Loading
    },
    data(){
        return{
            hotMusicList:[],
            pageNum: 0
            
        }
    },
    filters:{
        formatNum(value){
            return value < 10 ? "0"+value : value;
        }
    },
    mounted(){
        this.click()
    },
    created(){
        window.addEventListener("scroll",()=>{
            // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动距离
            // let clientHight = document.documentElement.clientHeight || document.body.clientHeight; // 获取可视高度
            // let barTop = this.$refs.scrollbar.offsetTop; // 获取最后一个元素 距离顶部的距离
            // console.log(scrollTop,clientHight,barTop);

            // if(scrollTop+clientHight==barTop){
            //     this.click()
            // }
        })
    },
    destoryed(){
        window.removeEventListener("scroll");
    },
    methods:{
        click(){
            let musicId = [];
            this.$http.get("/top/list?idx=1").then(data=>{//获取热门歌单
                // console.log(data)
                this.pageNum++
                console.log(this.pageNum, 1111)

                // 获取热门歌单更新时间（周四更新）
                this.updateTime = data.data.playlist.updateTime;
                // console.log(data.data.playlist)
                // 获取热门歌曲的id，并截取20条
                musicId = data.data.playlist.trackIds.slice(20*(this.pageNum-1),20*this.pageNum);
            }).then(()=>{
                // 请求之前先 清空列表
                // vm.hotMusicList=[]
                // 循环 热门歌曲id 请求歌曲详情接口
                for(let v of musicId){
                    this.$http.get("/song/detail?ids="+v.id).then(data=>{
                        // vm.hotMusicList.push(data.data);
                        this.hotMusicList.push({
                            id: data.data.songs[0].id,
                            name: data.data.songs[0].name,
                            song:{
                                privilege: { maxbr: data.data.privileges[0].maxbr },
                                artists: data.data.songs[0].ar,
                                album: data.data.songs[0].al
                            }
                        })
                        // console.log(data.data)
                    })
                    // console.log(vm.hotMusicList)
                }
            });
        },
        // loadMusic(vm){
        //     // vm.pageNum++;
        //     // vm.pageNum > 10 ? vm.pageNum : vm.pageNum ++
        //     let musicId = [];
        //     vm.$http.get("/top/list?idx=1").then(data=>{//获取热门歌单
        //         // 获取热门歌单更新时间（周四更新）
        //         vm.updateTime = data.data.playlist.updateTime;
        //         // console.log(data.data.playlist)
        //         // 获取热门歌曲的id，并截取20条
        //         musicId = data.data.playlist.trackIds.slice(20*(vm.pageNum-1),20*vm.pageNum);
        //     }).then(()=>{
        //         // 请求之前先 清空列表
        //         // vm.hotMusicList=[]
        //         // 循环 热门歌曲id 请求歌曲详情接口
        //         for(let v of musicId){
        //             vm.$http.get("/song/detail?ids="+v.id).then(data=>{
        //                 // vm.hotMusicList.push(data.data);
        //                 vm.hotMusicList.push({
        //                     id: data.data.songs[0].id,
        //                     name: data.data.songs[0].name,
        //                     song:{
        //                         privilege: { maxbr: data.data.privileges[0].maxbr },
        //                         artists: data.data.songs[0].ar,
        //                         album: data.data.songs[0].al
        //                     }
        //                 })
        //                 // console.log(data.data)
        //             })
        //             // console.log(vm.hotMusicList)
        //         }
        //     });
        // }
    },
    // 路由守卫
    // beforeRouteEnter(to,from,next){//路由进入之前会执行一次
    //     next(vm=>{
    //     //     // 第一次请求的时候清空
    //     //     vm.hotMusicList=[]
    //     //     vm.loadMusic(vm);
    //         vm.pageNum=0
    //         vm.click(vm);
    //     })
    // },
}
</script>
<style lang="less" scoped>
    .hotlist{
        margin-bottom: 80px;
    }
    ul{
        padding-bottom: 14px;
        position: relative;
        li{
            padding-left: 0px;
            display: flex;
            em{
                text-align: center;
                width: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-style: normal;
                font-size: 17px;
                color: #999;
                &.hot{
                    color: red;
                }
            }
        }
    }
    .more{
        display: inline-block;
        text-decoration: none;
        color: #999;
        // margin: 10px 10px 20px 10px;
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>