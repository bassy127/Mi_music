<template>
<!-- 播放器组件 -->
    <div class="player">
        <audio ref="musicPlay" autoplay 
                :src="`https://music.163.com/song/media/outer/url?id=${musicID}.mp3`"
                @timeupdate="timeupdate">
        </audio>
        <!-- 自定义播放器 -->
        <div class="myPlayer" >
            <div class="fl" @click="showPage">
                <span v-show="songDetail.al.picUrl != ''" >
                    <img class="head" :src="songDetail.al.picUrl" ref="rollImg">
                </span>
                <span class="son">
                    <i class="song">{{songDetail.name}}</i>
                    <i class="name"> - {{songDetail.ar[0].name}}</i>
                </span>
            </div>
            <div class="fr">
                <span @click="togglePaly">
                    <img src="../assets/images/pause.png" v-if="!$root.playMusic.isPlay">
                    <img src="../assets/images/playing.png" v-else>
                </span>
                <img src="../assets/images/songall.png">
            </div>
        </div>

        <!-- 歌词显示 -->
        <div class="lyricPage" v-show="isShowlrc" >
            <div class="bgc" :style="{
            backgroundImage:'url('+this.songDetail.al.picUrl+')',
            backgroundPosition: '50% center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            transform: 'scale(1.2)',
            zIndex: 1
        }"></div>
            <div class="pageTop">
                <img src="../assets/images/prevPage2.png" class="hideLyric" @click="isShowlrc=false">
                <div @click="hidePage">
                    <span>{{songDetail.name}}</span>
                    <span>{{songDetail.ar[0].name}}</span>
                </div>
                <img src="../assets/images/share.png" alt="">
            </div>
            <div class="lyric">
                <ul :style="{ transform:`translateY(-${lrcCurrentIndex*25}px)` }">
                    <li v-for="(lrc,i) in newLrcArr" :key="i" :class="{active:i==lrcCurrentIndex}">{{lrc.lyric}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:[
        "musicID",
    ],
    data(){
        return{
            songDetail:{
                name:null,
                al:{
                    picUrl:""
                },
                ar:[
                    {name:""}
                ]
            },
            isShowlrc:false,
            newLrcArr:[],
            lrcCurrentIndex:0
        }
    },
    methods:{
        togglePaly(){// 音乐播放
            if(this.$root.playMusic.isPlay){
                this.$root.playMusic.isPlay = false; 
                this.$refs.musicPlay.pause();//暂停播放
                this.$refs.rollImg.style.animationPlayState="paused" // 停止图片滚动
            }else{
                this.$root.playMusic.isPlay = true;
                this.$refs.musicPlay.play(); // 开始播放
                this.$refs.rollImg.style.animationPlayState = "running" // 开始图片滚动
            }
        },
        downPage(){
            console.log("000")
        },
        showPage(){// 歌词页
            this.isShowlrc = true
        },
        hidePage(){// 歌词页
            this.isShowlrc = false
        },
        timeupdate(event){// 获取事件的事件
            let audio = event.target;
            // audio.currentTime:当前播放事件
            // audio.duration: 音乐总时长
            // console.log(audio.currentTime,audio.duration)
            let currentTime = audio.currentTime;
            // let durationTime = audio.duration;
            // 循环遍历歌词 判断 当前播放时间 >= 当前歌词的时间 并且 当前歌词的时间 <= 下一条歌词的时间  当前歌词播放
            for(let i in this.newLrcArr){
                let lrcTime = this.newLrcArr[i].time; //获取歌词的时间
                var i2=parseInt(i)+1;//下标 是字符串 "0" +1 "1" +1
                if(currentTime >= lrcTime && currentTime<this.newLrcArr[i2].time){
                    this.lrcCurrentIndex=i;
                    break;
                }
            }
        }
    },
    watch:{
        musicID(val){
            // this.$refs.musicPlay.play();
            // 获取歌曲
            this.$http.get("/song/detail?ids="+val).then(data=>{
                this.songDetail = data.data.songs[0]
                // console.log(data,"0000")
            })

            // 临时更改baseUrl的地址
            this.$http.defaults.baseURL="http://music.kele8.cn";
            // 获取歌词
            this.$http.get("/lyric?id="+val).then(data=>{
                // console.log(data)
                let lrcDatas = data.data.lrc.lyric;

                // 对歌词进行处理
                // 对换行符进行处理 返回一个新数组
                let lrcArr = lrcDatas.split(/\n/);
                // 对时间 和 歌词进行处理
                // 写一个正则匹配公式 匹配[, 匹配数组 匹配: 匹配数字 匹配. 匹配]   +代表子匹配
                let reg=/\[(\d+):(\d+\.\d+)\](.+)/
                // console.log(reg)
                this.newLrcArr = lrcArr.map(lc=>{
                    reg.test(lc)
                    return{
                        time:parseInt(RegExp.$1*60) + parseFloat(RegExp.$2),
                        lyric:RegExp.$3
                    }
                })
                // console.log(this.newLrcArr,11)
            })
            // 改回来
            this.$http.defaults.baseURL="http://musicapi.leanapp.cn/";

            return val;
        }
    }
}
</script>
<style lang="less" scoped>
    .player{
        width: 100%;
        height: 55px;
        audio{
            width: 100%;
            height: 100%;
        }

        .myPlayer{
            width: 100%;
            height: 55px;
            line-height: 55px;
            padding: 0px 20px;
            box-sizing: border-box;
            display: flex;
            text-align: left;
            background: #aaa;
            position: fixed;
            bottom: 0;
            z-index: 2;
            img{
                vertical-align: middle;
            }
            span{
                display: inline-block;
            }
            i{
                font-style: normal;
                display: inline-block;
            }
            .fl{
                flex: 1;
                display: flex;
                .head{
                    width: 38px;
                    height: 38px;
                    // line-height: 30px;
                    border-radius: 50%;
                    margin-right: 8px;
                    animation: rollImg 3s infinite linear;
                    // vertical-align: top;
                    // margin-top: -12px;
                }
                span.son{
                    flex: 1;
                    display: flex;
                    align-content: center;
                    .song{
                        max-width: 100px;
                        color: #fff;
                        font-size: 15px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-right: 5px;
                    }
                    .name{
                        flex: 1;
                        color:hsla(0,0%,100%,.6);
                        font-size: 13px;
                        line-height: 55px;
                    }
                }
            }
            .fr{
                width: 25%;
                // text-align: right;
                img{
                    width: 30px;
                    height: 30px;
                    &:nth-of-type(1){
                        margin-right: 10px;
                    }
                span{
                    display: inline-block;
                }
                }
            }
        }

        // 歌词
        .lyricPage{
            width: 100vw;
            height: 100vh;
            box-sizing: border-box;
            padding: 15px;
            // background: pink;
            position: fixed;
            z-index: 1;
            top: 0;
            // display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: space-between;

            animation: move 1.5s linear;
            .bgc{
                width: 100%;
                height: 100%;
                filter: blur(20px);
                position: absolute;
                top: 0;
                left: 0;
            }
            .pageTop{
                width: 100%;
                height: 50px;
                display: flex;
                margin-bottom: 45%;
                position: absolute;
                top: 15;
                left: 0;
                padding: 0px 15px;
                z-index: 3;
                div{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    flex-wrap: wrap;
                    span{
                        display: inline-block;
                        // width: 100%;
                        &:nth-of-type(1){
                            margin: 0px auto;
                            width: 160px;
                            color: #fff;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            margin-bottom: 5px;
                        }
                        &:nth-of-type(2){
                            color: hsla(0,0%,100%,.6);
                        }
                    }
                }
                img{
                    width: 25px;
                    height: 25px;
                    margin-top: 10px;
                    vertical-align: bottom;
                }
            }
            .lyric{
                // flex: 1;
                width: 100%;
                height: 50vh;
                overflow: hidden; 
                position: relative;
                z-index:3;
                bottom: 0;
                transform: (translateY(55%));
                ul{
                    li{
                        color: hsla(0,0%,100%,.1);
                        color: rgba(0, 0, 0, .9);
                        text-align: center;
                        margin-bottom: 8px;
                        height: 25px;
                        &.active{
                            color: #fff;
                        }
                    }
                }
            }
        }
    }

    @keyframes rollImg{
        from{
            transform: rotate(0);
        }
        to{
            transform: rotate(360deg);
        }
    }
    @keyframes move{  
        0% {   
            top: 100vh;   
        }   
        100% {   
            top: 0;   
        }   
    } 
    @keyframes downMove{  
        0% {   
            top: 100vh;   
        }   
        100% {   
            top: 0;   
        }   
    } 
</style>