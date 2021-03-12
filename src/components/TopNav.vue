<template>
<!-- 顶部导航组件 -->
    <ul class="topnav">
        <li><router-link to="/">推荐音乐</router-link></li>
        <li><router-link to="/hotmusic/1">热歌榜</router-link></li>
        <li><router-link to="/search">搜索</router-link></li>
    </ul>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    .topnav{
        display: flex;
        border-bottom: 1px solid #eeeeee;
        li{
            height: 40px;
            line-height: 40px;
            font-size: 15px;
            flex: 1;
            a{
                display: inline-block;
                text-decoration: none;
                color: #333333;
                &.router-link-exact-active{
                    color: #dd001b;
                    border-bottom: 2px solid #dd001b;
                }
            }
        }
    }
</style>
