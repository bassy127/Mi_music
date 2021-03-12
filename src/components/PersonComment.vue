<template>
<!-- 获取评论 组件 -->
    <li :key="user.commentId">
        <img :src="user.user.avatarUrl" class="head fl">
        <div class="middle">
            <div class="box">
                <div class="ubox">
                    <span class="nickname">{{user.user.nickname}}</span>
                    <i v-show="user.user.vipRights!=null"></i>
                    <div class="time">{{user.time | getFormatTime(this) }}</div>
                </div>
                <slot></slot>
            </div>
            <div class="desc">{{user.content}}</div>
        </div>
    </li>
</template>
<script>
export default {
    props:{
        user:Object,
    },
    filters:{
        getFormatTime(val,that){
            return that.formatTime(val);
        }
    },
    methods:{
        // 时间处理
        getNowTime(){//获取当前时间戳
            let date = new Date();
            // console.log(date,"当前时间")
            return date.getTime()
        },
        getLastDate: function(time){// 获取标准年月日
            var date = new Date(time);
            var month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return date.getFullYear() + "年" + month + "月" + day + "日";
        },
        formatTime(timestamp){// 格式化时间
            var now = this.getNowTime(); // 获取当前时间戳
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
                tip = this.getLastDate(timestamp);
            }
            return tip;
        }
    },
}
</script>
<style lang="less" scoped>
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