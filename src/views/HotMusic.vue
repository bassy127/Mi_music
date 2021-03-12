<template>
    <div class="hotMusic">
        <div class="logo">
            <div class="hotop">
                <div class="hoticon"></div>
                <span>更新日期: {{updateTime|formatDate}}</span>
            </div>
        </div>
        
        <HotMusicList></HotMusicList>
    </div>
</template>
<script>
// import MusicList from "../components/MusicList"
// import Loading from "../components/Loading"
import HotMusicList from "../components/HotMusicList"
export default {
    name: "HotMusic",
    // 组件
    components:{
        // MusicList,
        // Loading,
        HotMusicList
    },
    data(){
        return{
            // hotMusicList:[],
            updateTime: new Date(),
            // pageNum: 0
        }
    },
    methods:{
        playMusic(id){
        this.$emit("playMusic",id)
        }
    },
    filters:{
        formatDate(value){
            let date = new Date(value);
            // 获取时间
            let m = date.getMonth()+1;
            let d = date.getDate();
            // 补零操作
            m = m < 10 ? "0" + m : m
            d = d < 10 ? "0" + d : d;
            return m + "月" + d + "日"
        },
        
    },

    

    // beforeRouteUpdate(from,to,next){
    //     this.loadMusic(this)
    //     next();
    // }
}
</script>
<style lang="less" scoped>
    .logo{
        // padding-top: 38.9%;
        height: 145px;
        background-color: #ccc;
        background-image: url(../assets/images/hot_music_bg_2x.jpg);
        background-size: 100%;
        position: relative;
        div.hotop{
            padding-left: 20px;
            position: absolute;
            left: 0px;
            right: 0;
            top: 0;
            bottom: 0;
            box-sizing: border-box;
            // 开启弹性盒子
            display: flex;
            // 设置主轴的方向为 垂直方向
            flex-direction: column;
            // 设置主轴上的子元素排列方式为居中
            justify-content: center;
            .hoticon{
                width: 142px;
                height: 67px;
                background: url(../assets/images/index_icon_2x.png) no-repeat;
                background-size: 166px 97px;
                background-position: -24px -30px;
                margin-bottom: 10px;
            }
            span{
                color: #f2f2f2;
                font-size: 12px;
                text-align: left;
            }
        }
    }

    
</style>
