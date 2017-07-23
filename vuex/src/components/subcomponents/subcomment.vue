<template>
    <div>
        <!-- 1.0 提交评论 -->
        <div class="postCommentStyle">
            <h4>提交评论</h4>
            <div class="postCommentAreaStyle">
                <!-- 输入提交内容的框框 -->
                <textarea ref="textAreaRef" placeholder="请输入评论内容" rows="5">

                </textarea>

                <!-- 提交按钮 -->
                <mt-button @click="postComment" type="primary" size="large">提交评论</mt-button>
            </div>
        </div>
        
        <!-- 2.0 评论列表 -->
        <div class="commentListStyle">
            <h4>评论列表</h4>
            <div v-for="(item,index) in commentList" :key="index" class="commentItemStyle">
                <h5>{{item.content}}</h5>
                <p class="commentUserAndTimeStyle">
                    <span class="commentUserStyle">{{item.user_name}}</span>
                    <span class="commentTimeStyle">{{item.add_time | dateFmt}}</span>
                </p>
            </div>
             <!-- 加载更多 -->
            <mt-button class="loadMoreStyle" @click="loadMore" type="danger" plain size="large">加载更多</mt-button>
        </div>
    </div>
</template>
<style scoped>
    .postCommentStyle,.commentListStyle{
        padding: 5px;
    }

    h4{
        padding:5px 5px 10px 5px;
        border-bottom: 1px solid rgba(92,92,92,0.4); 
    }

    h5{
        color: black;
    }

    .commentItemStyle{
        padding: 5px;
        min-height: 70px;
        overflow: auto;
    }

    .commentUserAndTimeStyle{
        margin-top: 15px;
        color:#0094ff;
        border-bottom: 1px solid rgba(92,92,92,0.4); 
        padding-bottom: 5px;
        overflow: hidden;
    }

    .commentUserStyle{
        float: left;
        width: 50%;
    }

    .commentTimeStyle{
        float: right;
    }

    .loadMoreStyle{
        margin-top: 20px;
        margin-bottom: 10px;
    }

</style>
<script>
    import common from '../../common/common.js'

    import { Toast } from 'mint-ui'

    import $ from 'jquery'

export default {
    data() {
        return {
            pageIndex:1, //页码
            commentList:[] //评论列表 每一页返回的数据都是10条
        }
    },
    created() {
        this.getCommentListByPageIndex()
    },
    // mounted(){
    //     console.log("subcomment mounted")
    // },
    // updated(){
    //     console.log("subcomment updated")
    // },
    // beforeDestroy(){
    //     console.log("subcomment beforeDestroy")
    // },
    // destroyed(){
    //     console.log("subcomment destroyed")
    // },
    methods: {
        //1.0 根据页码来获取当前页的数据
        getCommentListByPageIndex(){
            if(this.commentId==null || this.commentId==undefined){

                return
            }
            //url 
            const url = common.apihost+"api/getcomments/"+this.commentId+"?pageindex="+this.pageIndex

            //发送请求
            this.$http.get(url).then(response=>{
                

                if(this.pageIndex==1){//加载第一页
                    if(response.body.message.length<=0){
                        Toast({
                            message: '还没有评论,可以抢占沙发...',
                            position: 'middle',
                            duration: 3000
                        })
                    }

                    this.commentList = response.body.message
                }else{//加载更多
                    if(response.body.message.length<=0){
                        Toast({
                                message: '没有数据啦,已经到底啦...',
                                position: 'middle',
                                duration: 3000
                        })
                    }
                    this.commentList = this.commentList.concat(response.body.message)
                }
            })
        },
        //2.0 加载更多
        loadMore(){
            //页码累加
            this.pageIndex++

            //调用发送请求的方法
            this.getCommentListByPageIndex()
        },
        //3.0 提交评论
        postComment(){
            //1. 获取评论的数据
            const contentValue = this.$refs.textAreaRef.value

            if(contentValue==null || contentValue.length<=0){
                Toast({
                    message: '请输入评论内容,但别瞎评论!!!',
                    position: 'middle',
                    duration: 3000
                })

                return 
            }

            //发送请求
            const url = common.apihost+"api/postcomment/"+this.commentId

            this.$http.post(url,{content:contentValue},{emulateJSON:true}).then(response=>{
                //1.清空原有的评论消息
                this.$refs.textAreaRef.value = ''

                //2.提示评论成功
                Toast({
                    message: '提交成功',
                    position: 'middle',
                    duration: 3000
                })

                //3.重新加载第一页的数据
                this.pageIndex = 1
                this.getCommentListByPageIndex()
            },err=>{
                console.log("评论失败")
            })
        }
    },
    props:['commentId'] //子组件用来接收父组件传递过来值的属性名称
}
</script>