<template>
<!-- 评论区组件 备份用 -->
    <div class="comment">
        <SongSheetTitle class="h3" >精彩评论</SongSheetTitle>
        <!-- <button @click="click">1111</button> -->
        <ul>
            <li v-for="(user,i) in commentDatas" :key="user.commentId">
                <img :src="user.user.avatarUrl" class="head fl">
                <div class="middle">
                    <div class="box">
                        <div class="ubox">
                            <span class="nickname">{{user.user.nickname}}</span>
                            <i v-show="user.user.vipRights!=null"></i>
                            <div class="time">{{user.time | getFormatTime }}</div>
                        </div>
                        <div class="up" @click="like(i,user.commentId)">
                            <span><i v-if="user.likedCount!=0">{{user.likedCount}}</i></span>
                            <span class="love dislike" v-if="!user.liked">❤</span>
                            <span class="love like" v-else >❤</span>
                        </div>
                    </div>
                    <div class="desc">{{user.content}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import SongSheetTitle from "../components/SongSheetTitle"
let that; // 定义一个全局的this
export default {
    components:{
        SongSheetTitle,
    },
    data(){
        return{
            commentDatas:[],
            likedId: [],
            NowDate: new Date(),
        }
    },
    filters:{
        getFormatTime(val){
            return that.formatTime(val);
        }
    },
    methods:{
        like(index,id){
            let list=[]
            list = this.likedId
            if(list.indexOf(id) ==-1){ //在数组中没找到，点赞
                // console.log("meyou"),
                this.likedId.push(id)// 添加到数组
                // console.log(this.likedId);
                this.commentDatas[index].likedCount+=1;
                this.commentDatas[index].liked = true;
                // console.log(this.commentDatas[index].liked);

            }else{//取消点赞
                this.commentDatas[index].likedCount-=1;
                this.commentDatas[index].liked = false;
                // console.log(this.commentDatas[index].liked);
                // 循环遍历，找到取消点赞 并删除
                for(let i in this.likedId){
                    if(this.likedId[i] == id){
                        this.likedId.splice(i, 1);
                    }
                }
            }
        },
        
        // 时间处理
        getNowTime(){//获取当前时间戳
            let date = new Date();
            // console.log(date,"当前时间")
            // console.log(NowDate.getTime(),"当前时间戳")
            return date.getTime()
        },
        getZeroTime(){ //获取 今天 0点 0分 0秒 的时间戳
            let date = new Date();
            date.setHours(0);
            date.setMinutes(0);
            date.setMilliseconds(0);
            // console.log(date,"整点的时间")
            return date.getTime();
        },
        getYearTime(){// 获取今年 1月 1日 0点 0分 0秒 的时间戳
            let date = new Date();
            date.setMonth(0);
            date.setDate(1);
            date.setHours(0);
            date.setMinutes(0);
            date.setMilliseconds(0);
            // console.log(date,"跨年时间")
            return date.getTime();
        },
        getLastDate: function(time){// 获取标准年月日
            var date = new Date(time);
            var month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return date.getFullYear() + "年" + month + "月" + day + "日";
        },
        formatTime(timestamp){// 格式化时间
            var now = this.getNowTime(); // 获取当前时间戳
            // var day = this.getZeroTime() // 获取今天整点的时间戳
            // var year = this.getYearTime() // 获取1月1日整点的时间戳
            // return now,day,year
            var timer = (now - timestamp) / 1000;// 相当于 (当前的时间戳 - 评论的时间戳) = 秒数的 差值
            var tip = ""; // 存放评论
            // 处理时间
            if(timer == 0 ){
                tip = "刚刚"
            }else if(timer<60){
                tip = timer + "秒前"
            }else if(timer < 3600){
                tip = Math.floor(timer/60) + "分钟前"
            }else if(timer < 86400 ){// 86400 = 24h
                tip = Math.floor( timer / 60 /60 ) + "小时前"
            }else if(timer/86400 <= 31){
                tip = Math.ceil(timer / 86400) + "天前"
            }else{
                tip = this.getLastDate(timer);
            }
            return tip;
        }
    },
    
    mounted(){
        that = this; // 给全局的that赋值
        this.$http.get("/comment/playlist?id="+this.$route.params.musicID).then(data=>{
            this.commentDatas = data.data.comments
            // console.log(this.commentDatas)
        })
    },

}
</script>
<style lang="less" scoped>
    .h3{
        font-style: italic;
    }
    .comment{
        ul{
            li{
                padding-top: 10px;
                display: flex;
                text-align: left;

                .head{
                    width: 30px;
                    height: 30px;
                    margin: 0 10px;
                    vertical-align: bottom;
                    border-radius: 50%;
                }
                .middle{
                    flex: 1;
                    .box{
                        display: flex;
                        .ubox{
                            flex: 1;
                            .nickname{
                                font-size: 14px;
                                color: #666;
                                line-height: 20px;
                            }
                            i{
                                width: 32px;
                                height: 11px;
                                margin: 0 5px;
                                background: url(../assets/images/vip.png);
                            }
                            .time{
                                font-size: 9px;
                                color: #999;
                            }
                        }
                        .up{
                            width: 60px;
                            text-align: right;
                            margin-right: 10px;
                            padding-left: 5px;
                            span{
                                text-align: right;
                                width: 10px;
                                display: inline-block;
                                i{
                                    line-height: 22px;
                                    font-size: 11px;
                                    color: #999;
                                    font-style: normal;
                                }
                            }
                            .love{
                                padding-left: 5px;
                                height: 30px;
                                margin-right: 20px;
                                text-align: right;
                                // color: cadetblue;
                            }
                            .like{
                                color: #eb3941;
                            }
                        }
                    }
                }
                .desc{
                    color: #333;
                    font-size: 15px;
                    line-height: 22px;
                    margin-top: 5px;
                }
            }
        }
    }
</style>