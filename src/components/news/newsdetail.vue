<template>
    <div class='tmpl'>
        <!-- 1.0 标题块 -->
        <div class="title">
            <h3>{{newsInfo.title}}</h3>
            <p>
                {{newsInfo.add_time | dateFmt}}&nbsp;&nbsp;
                {{newsInfo.click}}次浏览&nbsp;&nbsp;分类:民生经济
            </p>
        </div>

        <!-- 2.0 内容块 -->
        <div class="content">
            <div v-html="newsInfo.content"></div>
        </div>
        
        <!-- 3.0 评论子组件 -->
        <subcomment :commentId="this.$route.params.newsId"></subcomment>
    </div>
</template>
<style scoped>
    .title , .content{
        padding: 6px;
    }

    .title h3{
        font-size: 16px;
        color:#0094ff;
    }

    .title p{
        font-size: 14px;
        color: #333333;
    }

    .title{
        border-bottom: 1px solid rgba(92,92,92,0.4)
    }
</style>
<script>
    //导入发送请求的apihost
    import common from '../../common/common.js'

    //导入评论子组件
    import subcomment from '../subcomponents/subcomment.vue'

    export default {
        data() {
            return {
                newsInfo : {}
            }
        },
        created() {
            this.getNewsDetailData()
        },
        methods: {
            getNewsDetailData(){
                //1.url
                const url = common.apihost+"api/getnew/"+this.$route.params.newsId

                //2.发送请求
                this.$http.get(url).then(response=>{
                    //console.log(response.body.message)
                    this.newsInfo = response.body.message[0]
                })
            }
        },
        components:{//在这里注册子组件
            //属性名称在父组件的template中使用,值就是子组件
            //subcomment : subcomment
            subcomment
        }
    }
</script>