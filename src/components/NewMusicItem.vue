<template>
<!-- 最新音乐组件 -->
    <div>
        <ul class="newMusicList">
            <!-- 拆分到 MusicList组件 -->
            <!-- <router-link to="/" tag="li" v-for="mItem in newMusicList" :key="mItem.id">
                <div class="fl">
                    <div class="song">{{mItem.name}}</div>
                    <div class="singer">
                        <i v-if="mItem.song.privilege.maxbr >= 999000"></i>
                        <span v-for="(artist,index) in mItem.song.artists" :key="index">
                            <template v-if="index"> / </template>
                            {{artist.name}}
                        </span>
                    </div>
                </div>
                <div class="fr">
                    <span></span>
                </div>
            </router-link> -->
            
            <!-- 调用MusicList组件 -->
            <MusicList v-for="mItem in newMusicList" :mItem="mItem" :key="mItem.id" ></MusicList>
            <Loading v-if="newMusicList.length <=0"></Loading>
        </ul>    
    </div>
</template>
<script>
import Loading from "./Loading"
import MusicList from "./MusicList"
export default {
    name:"newMusicItem",
    // 组件传值
    props:{
            newMusicList:{
                type:Array,
                function(){
                    return []
                }
            },
        },
    // 组件
    components:{
        Loading,
        MusicList
    },
}
</script>
<style lang="less" scoped>
    ul{
        padding-bottom: 14px;
    }
</style>
