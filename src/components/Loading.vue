<template>
<!-- 加载组件 -->
    <div class="loading">
        <div>
            <i></i>
            <i></i>
            <i></i>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20vh;
        div{
            width: 30px;
            height: 30px;
            display: flex;
            i{
                display: inline-block;
                width: 6px;
                height: 30px;
                background-color: red;
                margin-right: 5px;
                transform-origin: center center;
                // animation: 动画名称 时间 运动曲线 延迟时间 无线循环 反向运动
                animation: loading 0.6s linear -0.4s infinite alternate-reverse;
                &:first-child{
                    animation-delay: -0.2s; // 延迟时间 负数直接跳过 -> 0.2s
                }
                &:last-child{
                    animation-delay: -0.6s; // 延迟时间 负数直接跳过 -> 0.6s
                }
            }
        }
    }
    @keyframes loading{
        from{
            transform: scaleY(0.2);
        }
        to{
            transform: scaleY(1);
        }
    }
</style>
