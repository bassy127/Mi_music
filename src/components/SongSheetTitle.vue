<template>
<!-- 歌单 的标题组件 -->
    <h3><slot></slot></h3>
</template>
<style lang="less" scoped>
    h3{
        height: 23px;
        line-height: 23px;
        padding: 0 10px;
        font-size: 12px;
        color: #666;
        background-color: #eeeff0;
        text-align: left;
    }
</style>