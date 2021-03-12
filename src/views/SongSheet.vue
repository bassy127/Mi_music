<template>
    <div class="songsheet" >
        <div class="topTag" v-show="sheetDetail.name != '' ">
            <div class="bg" :style="{
                backgroundImage: 'url('+sheetDetail.coverImgUrl+')',
                backgroundSize: 'cover',
                backgroundPosition: '50%',
                transform: 'scale(1.5)'
            }"></div>
            <div class="navBox">
                <div class="fl">
                    <img :src="sheetDetail.coverImgUrl">
                    <span>歌单</span>
                    <span>{{sheetDetail.playCount | formatNum}}</span>
                </div>
                <div class="fr">
                    <div class="user">
                        <p class="title">{{sheetDetail.name}}</p>
                        <img class="head" :src="sheetDetail.creator.avatarUrl">
                        <i class="name">{{sheetDetail.creator.nickname}}</i>
                        <!-- <i class="real"></i> -->
                    </div>
                    <div class="commentBtn">
                        <span @click="collectBtn">
                            <img src="../assets/images/collect.png" v-if="!showCollectLight">
                            <img src="../assets/images/collectLight.png" v-else>
                        </span>

                        <img src="../assets/images/comment.png" @click="commentBtn" v-show="!showLight">
                        <img src="../assets/images/commentLight.png" v-show="showLight">

                        <img src="../assets/images/share.png" >
                    </div>
                </div>
            </div>

            <PrevPage class="prevPage" @click.native="showprevPage" v-show="showLight"></PrevPage>
            <PrevPage class="prevPage" @click.native="prevPage" v-show="!showLight"></PrevPage>
        </div>
        <div v-show="!showLight">
            <SongSheetTitle v-show="sheetSongList.length !=0">歌曲列表</SongSheetTitle>
            <ul>
                <MusicList v-for="(mItem,index) in sheetSongList" :key="index" :mItem="mItem" class="li" @playMusic="$emit('playMusic',mItem.id)">
                    <em class="num">{{index+1}}</em>
                </MusicList>
            </ul>
        <span v-show="sheetSongList.length>0" @click="clickSheet"  class="more">更多</span>
        </div>

        <Loading v-show="sheetSongList.length == 0"></Loading>
        <Comment v-show="showLight" :commentDatas="commentDatas" :hotCommentDatas="hotCommentDatas"></Comment>
    </div>
</template>
<script>
import SongSheetTitle from "../components/SongSheetTitle"
import MusicList from "../components/MusicList"
import Comment from "../components/Comment"
import Loading from '../components/Loading.vue'
import PrevPage from '../components/PrevPage.vue'
export default {
    // 注册组件
    components:{
        SongSheetTitle,
        MusicList,
        Comment,
        Loading,
        PrevPage
    },
    data(){
        return{
            sheetDetail:{
                coverImgUrl:"",
                name:"",
                creator:{
                    avatarUrl:"",
                    nickname:"",
                }
            },
            sheetSongList:[],
            pageNum:0,
            showLight:false,
            showCollectLight:false,

            sheetId:[],

            commentDatas:[],
            hotCommentDatas:[],
        }
    },
    // 过滤器
    filters:{
        formatNum(value){
        // 保留一位小数
        return (value / 10000 ).toFixed(1) + "万"
        }
    },
    // mounted(){
    //     this.click();
    // },
    methods:{
        clickSheet(){
            if(this.sheetDetail.creator.avatarUrl == "undefined"){
                this.sheetSongList=[];
                this.sheetDetail ={
                    coverImgUrl:"",
                    name:"",
                    creator:{
                        avatarUrl:"",
                        nickname:"",
                    }
                };
            }
            // this.sheetSongList=[];
            let musicid = [];
            // 临时改变 请求的baseURL地址
            this.$http.defaults.baseURL="http://music.kele8.cn";
            // 获取歌单详情
            this.$http.get("/playlist/detail?id="+this.$route.params.musicID).then(data=>{
                this.pageNum++;
                this.sheetDetail =  data.data.playlist
                musicid=data.data.playlist.trackIds.slice(20*(this.pageNum-1),20*this.pageNum);
                // console.log(data,"gggg")
            }).then(()=>{// 获取歌单的歌曲
                for(var v of musicid){
                    this.$http.get("/song/detail?ids="+v.id).then(data=>{
                        let result = data.data
                        this.sheetSongList.push({
                            id:result.privileges[0].id, // id
                            name:result.songs[0].name, // 歌名
                            song:{
                                privilege:{// 音质
                                    maxbr:result.privileges[0].maxbr
                                },
                                artists:result.songs[0].ar,//歌手
                                album:{//专辑
                                    name:result.songs[0].al.name
                                }
                            }
                        })
                    });
                }
            }).then(()=>{
                this.$http.get("/comment/playlist?id="+this.$route.params.musicID).then(data=>{
                    this.commentDatas = data.data.comments
                    this.hotCommentDatas = data.data.hotComments
                    // console.log(data)
                })
            })
            // 请求结束 改回baseURL的地址 
            this.$http.defaults.baseURL="http://musicapi.leanapp.cn/";
        },

        commentBtn(){
            this.showLight = true;
        },
        collectBtn(){
            let listId = [];
            listId = this.sheetId 
            
            if(listId.indexOf(this.sheetDetail.id) == -1){
                // console.log("收藏")
                this.showCollectLight = true;
                this.sheetDetail.subscribedCount+=1
                this.sheetId.push(this.sheetDetail.id)
                // console.log(this.sheetId)
            }else{
                // console.log("取消收藏")
                this.showCollectLight = false;
                this.sheetDetail.subscribedCount-=1
                this.sheetId.pop()
                // console.log(this.sheetId)
            }

        },
        showprevPage(){
            // console.log("000")
            this.showLight = false;
        },
        prevPage(){
            this.$router.go(-1)
        }
    },
    beforeRouteEnter(from,to,next){
        next(vm=>{
            if(typeof vm.$route.params.musicID != 'undefined'){
                vm.sheetSongList=[];
                vm.commentDatas=[];
                vm.hotCommentDatas=[]
                vm.pageNum=0
            }
            vm.clickSheet(vm)
        })
    },
    // beforeRouteUpdate(from,to,next){
    //     this.clickSheet(this)
    //     // next(vm=>{
    //     // })
    //     next()
    // }
}
</script>
<style lang="less" scoped>
    .songsheet{
        margin-bottom: 45px;
    }
    .btn{
        background:  #fff;
    }
    .topTag{
        height: 186px;
        width: 100%;
        padding: 30px 10px 30px 15px;
        position: relative;
        overflow: hidden;
        .bg{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            // 模糊处理
            filter: blur(20px);
            &::after{
                content: "";
                display: block;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.25);
            }
        }
        .navBox{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            // background: burlywood;
            display: flex;
            justify-content: space-between;
            display: flex;
            position: relative;
            .fl{
                width: 35%;
                position: relative;
                margin-right: 16px;
                img{
                    width: 100%;
                    height: 100%;
                    vertical-align: bottom;
                }
                span:nth-child(2){
                    height: 17px;
                    // line-height: 17px;
                    position: absolute;
                    top: 10px;
                    left: 0;
                    padding: 0 8px;
                    font-size: 9px;
                    background-color: rgba(217,48,48,.8);
                    color: #fff;
                    text-align: center;
                    font-style: normal;
                    border-top-right-radius: 17px;
                    border-bottom-right-radius: 17px;
                }
                span:nth-child(3){
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
            .fr{
                flex: 1;
                position: relative;
                .user{
                    text-align: left;
                    position: relative;
                    .title{
                        padding-top: 1px;
                        font-size: 17px;
                        color: #fff;
                        text-align: left;
                        margin-bottom: 20px;
                        height: 45px;
                        // 文字溢出处理
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-break: normal;
                    }
                    .head{
                        width: 30px;
                        height: 30px;
                        background-color: rosybrown;
                        vertical-align: bottom;
                        border-radius: 50%;
                    }
                    .name{
                        width: 60px;
                        margin-left: 5px;
                        display: inline-block;
                        // color: rgba(0,0,0,.7);
                        color:hsla(0,0%,100%,.7);
                        font-style: normal;
                        font-size: 14px;
                        // 文字溢出处理
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-break: normal;
                    }
                    .real{
                        position: absolute;
                        left: 20px;
                        bottom: 0;
                        width: 12px;
                        height: 12px;
                        background: royalblue;
                        border-radius: 50%;
                        background-size: 75px auto;
                    }
                }
                .commentBtn{
                    width: 100%;
                    height: 22px;
                    margin: 0 auto;
                    margin-top: 8px;
                    span{
                        width: 22px;
                        height: 22px;
                        display: inline-block;
                        margin-right: 15px;
                    }
                    img{
                        width: 22px;
                        height: 100%;
                        vertical-align: bottom;
                        margin-right: 15px;
                    }
                }
            }
        }
        // .prevPage{
        //         width: 30px;
        //         /* height: 22px; */
        //         position: absolute;
        //         top: 2px;
        //         left: 3px;
        //     img{
        //         width: 100%;
        //         height: 100%;
        //         vertical-align: bottom;
        //     }
        // }
    }
    .more{
        display: inline-block;
        text-decoration: none;
        color: #999;
        margin: 10px 10px 20px 10px;
    }
    .num{
        text-align: center;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-style: normal;
        font-size: 17px;
        color: #999;
        margin-left: -10px;
    }
    .li{
        padding-top: 7px;
    }
</style>