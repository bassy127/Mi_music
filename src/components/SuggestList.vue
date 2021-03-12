<template>
<!-- 搜索 歌曲组件 -->
    <div class="searchList">
        <slot name="search" class="search_sm"></slot>
        <ul>
            <li v-for="mList in suggests" :key="mList.id">
                <slot name="search_icon" class="search_icon"></slot>
                <div class="song" @click="$emit('toSearchMusic',mList.name)">{{mList.name}}</div>
                <slot name="del_icon" class="del_icon"></slot>
            </li>
        </ul>
        <slot name="load"></slot>
    </div>
</template>
<script>
export default {
    name:"SuggestList",
    // 引入父组件的值
    props:{
        suggests:{
            typeof: Array,
            return:{
                suggests:[],
            }
        },
    },
}
</script>
<style lang="less" scoped>
    .searchList{
            ul li{
                height: 45px;
                line-height: 45px;
                text-align: left;
                display: flex;
                align-items: center;
                .search_icon{
                    font-style: normal;
                    width: 15px;
                    height: 15px;
                    display: inline-block;
                    margin: 0px 10px;
                    // background: url(../assets/images/clock.svg);
                }
                .song{
                    flex: 1;
                    border-bottom: 1px solid rgba(0,0,0,.1);
                    position: relative;
                    padding-right: 10px;
                }

                .del_icon{
                    width: 32px;
                    height: 32px;
                    display: inline-block;
                    line-height: 32px;
                    // position: absolute;
                    // right: 0;
                    // top: 50%;
                    // transform: translateY(-50%);
                    &::before{
                        content: "";
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        background: url(../assets/images/del.svg);
                    }
                }
            }
        }
</style>