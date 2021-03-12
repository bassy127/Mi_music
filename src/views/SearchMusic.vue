<template>
    <div class="search">
        <form @submit.stop.prevent="key(searchKeyword)">
            <div class="inp">
                <i></i>
                <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="searchKeyword">
                <i @click="del"></i>
            </div>
        </form>

        <!-- 输入框 内容为空时 显示气泡   && hotkey.length !=0-->
        <div class="hotSearch" v-show="this.bubbles">
            <p>热门搜索</p>
            <ul>
                <li class="item" v-for="(hotkey,i) in hotkey" :key="i" @click="click">{{hotkey.first}}</li>
            </ul>
        </div>
        
        <!-- 历史记录列表 -->
        <SuggestList :suggests="historykey" @toSearchMusic="key" v-show="bubbles">{{historykey.name}}
            <i class="clock_icon search_icon" slot="search_icon"></i>
            <i class="del_icon" slot="del_icon" @click="delthis"></i>
        </SuggestList>

        <!-- 搜索提示 -bool -->
        <SuggestList :suggests="suggests" @toSearchMusic="key" v-show="this.bool ">

            <!-- 定义一个搜索插槽 -->
            <span class="search_sm" slot="search" >搜索“{{searchKeyword}}”</span>
            <!-- 定义一个搜索图标 -->
            <i class="search_icon" slot="search_icon"></i>
            <Loading class="loading" slot="load" v-show="this.loading && this.searchKeyword!='' "></Loading>
        </SuggestList>
        <!-- 搜索结果 -show -->
        <SearchResult :findMusic="findMusic" v-show="this.show" @playMusic="playMusic"></SearchResult>
    </div>
</template>
<script>
// 引入组件
import SuggestList from "../components/SuggestList"
import Loading from '../components/Loading.vue'
import SearchResult from '../components/SearchResult'

export default {
    name: "SearchMusic",
    // 注册组件
    components:{
        SuggestList,
        Loading,
        SearchResult,
    },
    data(){
        return{
            searchKeyword:"",
            // 存放 气泡里面的关键字
            hotkey:[],
            // 存放归并歌曲、歌手、专辑 的关键字列表
            suggests:[],
            // 存放 点击 搜索的歌曲
            findMusic:[],

            // 存放 历史搜索的关键字
            historykey:[],
            

            loading: false, // Loading显示状态
            show: false, // 搜索结果 显示状态
            bool: false, // 搜索提示 显示状态
            bubbles:true,

            timer:null, 
        }
    },
    methods:{
        playMusic(id){
      this.$emit("playMusic",id)
    },
        // 点击气泡
        click(e){
            this.show = true;
            this.bubbles = false;
            let val = e.target.innerText;
            // 添加历史记录关键子
            this.historykey.unshift({
                name:val
            });
            // console.log(this.historykey);

            // document.getElementsByTagName("input").value = val;

            // this.searchKeyword = val;
            this.$http.get("/search?keywords="+val).then(datas=>{
                // console.log(datas.data)
                this.findMusic = datas.data.result.songs.map(data=>{
                    return{
                        id: data.id,
                        name: data.name,// 歌曲名称
                        song:{
                            artists:data.artists, //歌手名称
                            privilege:{
                                maxbr:999000,
                            },
                            album:data.album
                        }
                    }
                })
            })
        },
        // 点击 输入框的删除
        del(){
            this.searchKeyword = "",
            // 点击按钮 清除所有状态
            this.show=false,
            this.bool=false,
            this.loading=false;
            this.bubbles = true;
            this.findMusic=[];
        },
        // 搜索结果
        key(keyValue){
            // this.searchKeyword = keyValue;
            // 添加历史记录关键子
            this.historykey.unshift(({
                name:keyValue,
            }));
            // console.log(this.historykey);

            // console.log(keyValue)
            // 搜索 结果
            this.show = true;
            this.bool = false;
            this.bubbles=false;

            this.$http.get("/search?keywords="+keyValue).then(datas=>{
                this.findMusic = datas.data.result.songs.map(data=>{
                    return{
                        id: data.id,
                        name: data.name,// 歌曲名称
                        song:{
                            artists:data.artists, //歌手名称
                            privilege:{
                                maxbr:999000,
                            },
                            album:data.album // 专辑名称
                        }
                    }
                })
                // console.log(datas.data,"this.find")
            })
        },
        // 点击 历史记录删除
        delthis(e){
            e.target.parentElement.remove();
            // console.log(this.historykey);
        }
    },
    watch:{
        // 监听 搜索关键字/搜索建议
        searchKeyword(value){
            this.show=false;
            this.bool=true;
            this.loading=true;
            this.bubbles=false

            if(this.searchKeyword == ""){
                this.suggests=[];
                this.bool=false;
                this.bubbles=true;
            }
            // 发起 请求
            this.$http.get("/search/suggest?keywords="+value).then(data=>{
                if(data.data.code == 200 && data.data.result.order !="undefined"){
                    // 获取数据
                    let result = data.data.result;
                    // console.log(result);
                    // result.order.reduce() 归并order里面存在的 命令
                    // order是一个数组，里面的数据  ==> data.data.result的key值
                    let res = result.order.reduce((prev,curVal)=>{
                        // 使用concat连接数组，没有改变原数组，接收重新赋值给prev
                        // 取出result里面的数据 再赋值给 prev前置值 
                        return prev.concat(result[curVal]);//对象取值，此时key是一个变量 所以要使用[]取值
                    },[]);
                    // console.log(res,"res");
                    this.suggests = res;
                    // console.log(this.suggests,"su")
                    // this.loading = false;
                }
            }).finally(()=>{
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    this.loading = false;
                },500)
            });
        }
    },
    beforeRouteEnter(to,from,next){
        // 热搜列表(简略)
        next(vm=>{
            vm.$http.get("/search/hot").then(function(data){
                vm.hotkey = data.data.result.hots
                // console.log(vm.hotkey)
            })
        })
    },
}
</script>
<style lang="less" scoped>

    .search{
        margin-bottom: 65px;
        position: relative;
            .inp{
                margin: 15px 10px;
                display: flex;
                background-color: #ebecec;
                border-radius: 30px;
                align-items: center;
            input{
                height: 30px;
                width: 100%;
                // padding: 0 10px;
                border:none;
                outline: none;
                color: #333;
                background-color: transparent;
                flex: 1;
            }
            i{
                display: inline-block;
                margin: 0px 8px;
                &:first-child{
                    width: 13px;
                    height: 13px;
                    background-image: url(../assets/images/search_icon.svg)
                    // background-size: 100%;
                }
                &:last-child{
                    width: 14px;
                    height: 14px;
                    background-image: url(../assets/images/delet.svg)
                }
            }
        }
        .hotSearch{
            border-top: 1px solid rgba(0,0,0,.1);
            padding: 15px 10px 0px;
            p{
                color: #666;
                font-size: 12px;
                line-height: 12px;
                text-align: left;
            }
            ul{
                margin: 10px 0px 7px;
                display: flex;
                flex-wrap: wrap;
                li.item{
                    font-size: 14px;
                    text-align: left;
                    height: 32px;
                    line-height: 32px;
                    padding: 0px 14px;
                    border: 1px solid rgba(0,0,0,.1);
                    display: inline-block;
                    border-radius: 32px;
                    margin-right: 8px;
                    margin-bottom: 8px;
                }
            }
        }
        // SuggestList组件添加的插槽样式
        .search_sm{
            display: block;
            text-align: left;
            color: #507daf;
            line-height: 50px;
            font-size: 15px;
            margin-left: 10px;
            padding-right: 10px;
            text-decoration: underline;
        }
        .search_icon{
            background: url(../assets/images/search_icon.svg);
        }
        .clock_icon{
            background: url(../assets/images/clock.svg);
        }

        .loading{
            height: 65px;
        }
    }

</style>
