<template>
<!-- 搜索结果组件 -->
    <ul>
        <MusicList v-for="mItem in findMusic" :key="mItem.id" :mItem="mItem" class="ml"></MusicList>
        <Loading v-show="findMusic.length == 0"></Loading>
    </ul>    
</template>
<script>
import MusicList from "../components/MusicList"
import Loading from "../components/Loading"
export default {
    props:[
        "findMusic"
    ],
    components:{
        MusicList,
        Loading
    }
}
</script>
<style lang="less">
    .ml{
        .song{
            color:#507daf,
        }
        .singer{
            span:nth-child(3){
                color:#507daf,
            }
        }
    }
</style>