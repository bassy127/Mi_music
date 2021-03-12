<template>
<!-- 评论区 子组件 -->
    <div class="comment">
        <div>
            <SongSheetTitle class="h3" v-show="hotCommentDatas.length !=0 ">精彩评论({{hotCommentDatas.length}})</SongSheetTitle>
            <!-- <button @click="click">1111</button> -->
            <ul>
                <PersonComment v-for="(user,i) in hotCommentDatas" :key="user.commentId" :user="user" class="personcom">
                    <div class="up" @click="hotLike(i,user.commentId)">
                        <span class="count"><i v-if="user.likedCount!=0">{{user.likedCount}}</i></span>
                        <span class="love dislike" v-if="!user.liked">❤</span>
                        <span class="love like" v-else >❤</span>
                    </div>
                </PersonComment>
            </ul>
        </div>
        <div>
            <SongSheetTitle class="h3" >最新评论({{commentDatas.length}})</SongSheetTitle>
            <!-- <button @click="click">1111</button> -->
            <ul>
                <PersonComment v-for="(user,i) in commentDatas" :key="user.commentId" :user="user"  class="personcom">
                <div class="up" @click="ordinaryLike(i,user.commentId)">
                    <span><i v-if="user.likedCount!=0">{{user.likedCount}}</i></span>
                    <span class="love dislike" v-if="!user.liked">❤</span>
                    <span class="love like" v-else >❤</span>
                </div>
                </PersonComment>
            </ul>
        </div>
    </div>
</template>
<script>
import SongSheetTitle from "../components/SongSheetTitle"
import PersonComment from "../components/PersonComment"
export default {
    components:{
        SongSheetTitle,
        PersonComment
    },
    // 引入父组件的值
    props:{
        commentDatas:Array,
        hotCommentDatas:Array
    },
    data(){
        return{
            // commentDatas:[],
            // hotCommentDatas:[],
            likedId: [],
        }
    },
    methods:{
        ordinaryLike(index,id){
            let list=[]
            list = this.likedId
            // console.log(index)
            if(list.indexOf(id) ==-1){ //在数组中没找到，点赞
                // console.log("meyou"),
                this.likedId.push(id)// 添加到数组
                // console.log(this.likedId);
                this.commentDatas[index].likedCount+=1;
                this.commentDatas[index].liked = true;
            }else{//取消点赞
                // console.log("you"),
                this.commentDatas[index].likedCount-=1;
                this.commentDatas[index].liked = false;
                // 循环遍历，找到取消点赞 并删除
                for(let i in this.likedId){
                    if(this.likedId[i] == id){
                        this.likedId.splice(i, 1);
                    }
                }
            }
        },
        hotLike(index,id){
            let list=[]
            list = this.likedId
            // console.log(index)
            if(list.indexOf(id) ==-1){ //在数组中没找到，点赞
                // console.log("meyou"),
                this.likedId.push(id)// 添加到数组
                // console.log(this.likedId);
                this.hotCommentDatas[index].likedCount+=1;
                this.hotCommentDatas[index].liked = true;
            }else{//取消点赞
                // console.log("you"),
                this.hotCommentDatas[index].likedCount-=1;
                this.hotCommentDatas[index].liked = false;
                // 循环遍历，找到取消点赞 并删除
                for(let i in this.likedId){
                    if(this.likedId[i] == id){
                        this.likedId.splice(i, 1);
                    }
                }
            }
        },
        // getData(){
        //     this.$http.get("/comment/playlist?id="+this.$route.params.musicID).then(data=>{
        //         this.commentDatas = data.data.comments
        //         this.hotCommentDatas = data.data.hotComments
        //         console.log(data)
        //     })
        // }

    },
    // mounted(){
    //     this.getData();
    // },
    // beforeRouteEnter(from,to,next){
    //     console.log(123123)
    //     next(vm=>{
    //         if(typeof vm.$route.params.musicID == 'undefined'){
    //             vm.commentDatas=[],
    //             vm.hotCommentDatas=[]
    //         }
    //         vm.getData()
    //     })
    // }
}
</script>
<style lang="less" scoped>
    .h3{
        font-style: italic;
    }
    .personcom{
        .up{
            min-width: 90px;
            text-align: right;
            margin-right: 10px;
            padding-left: 5px;
            span.count{
                min-width: 60px;
            }
            span{
                text-align: right;
                display: inline-block;
                i{
                    line-height: 22px;
                    font-size: 11px;
                    color: #999;
                    font-style: normal;
                }
            }
            
            .love{
                padding-left: 5px;
                height: 30px;
                margin-right: 10px;
                text-align: right;
                // color: cadetblue;
            }
            .like{
                color: #eb3941;
            }
        }
    }
</style>