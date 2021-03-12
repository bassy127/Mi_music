<template>
<!-- 获取 歌曲列表 子组件 -->
    <li :key="mItem.id" @click="playMusic">
        <!-- 插槽 -->
        <slot></slot>
        <div class="fl">
            <div class="song">{{mItem.name}}</div>
            <div class="singer">
                <i v-if="mItem.song.privilege.maxbr >= 999000"></i>
                <span v-for="(artist,index) in mItem.song.artists" :key="index">
                    <template v-if="index"> / </template>
                    {{artist.name}}
                </span>
                <span v-if="mItem.song.album.name">- {{mItem.song.album.name}}</span>
            </div>
        </div>
        <div class="fr">
            <span></span>
        </div>
    </li>
</template>
<script>
export default {
    name: "MusicList",
    props:{
        mItem: Object
    },
    methods:{
        playMusic(){
            // 把mItem的id传递给vue实例里面的playMusic属性
            this.$root.playMusic.musicID = this.mItem.id
            this.$root.playMusic.isPlay = true
        }
    }
}
</script>
<style lang="less" scoped>
    li{
        padding-left: 10px;
        display: flex;
        .fl{
            padding: 6px 0px;
            flex: 1;
            text-align: left;
            .song{
                font-size: 17px;
                padding-bottom: 5px;
            }
            .singer{
                font-size: 12px;
                color: #888;
                i{
                    width: 12px;
                    height: 8px;
                    display: inline-block;
                    background-image: url(../assets/images/index_icon_2x.png);
                    background-position: 0px 0px;
                    background-size: 166px 97px;
                    margin-right: 4px;
                }
            }
        }
        .fr{
            padding: 0px 10px;
            display: flex;
            align-items: center;
            span{
                display: inline-block;
                width: 22px;
                height: 22px;
                background-image: url(../assets/images/index_icon_2x.png);
                background-size: 166px 97px;
                background-position: -24px 0px;
            }
        }

    }
</style>