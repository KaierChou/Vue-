<template>
    <div class="tmpl">
        <!-- 渲染新闻列表 -->
        <div class="mui-content">
            <ul class="mui-table-view">
				<li v-for="item in newslistArray" :key="item.id" class="mui-table-view-cell mui-media">
					<router-link :to="'/news/newsdetail/'+item.id">
                        <!-- 图片 -->
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
                            <!-- 标题 -->
                            <p class="titleStyle">
							    {{item.title}}
                            </p>
							<p class='mui-ellipsis'>
                                <!-- 时间 -->
                                <span>{{item.add_time | dateFmt("YYYY-MM-DD HH:mm")}}</span>

                                <!-- 点击数 -->
                                <span class="right">点击数{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
        </div>
    </div>
</template>

<style scoped>

    .mui-table-view-cell{
        height: 80px;
    }

    .mui-media-object.mui-pull-left{
        height: 64px;
        min-width:64px;
    }

    .titleStyle{
        font-size: 14px;
        color: gray;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .mui-ellipsis{
        margin-top: 20px;
        font-size: 12px;
        color:#0094ff;
    }

    .right{
        float: right;
    }
</style>


<script>
    //导入common.js的对象
    import common from '../../common/common.js'

    //导出
    export default{
        data(){
            return {//模型
                newslistArray:[]
            }
        },
        created(){//做网络请求
            //console.log("newslist created")
            this.getNewsListArrayData()
        },
        // mounted(){
        //     console.log("newslist mounted")
        // },
        // updated(){
        //     console.log("newslist updated")
        // },
        // beforeDestroy(){
        //     console.log("newslist beforeDestroy")
        // },
        // destroyed(){
        //     console.log("newslist destroyed")
        // },
        methods:{
            getNewsListArrayData(){
                //1.url
                const url = common.apihost+"api/getnewslist"

                //2.发送请求获取新闻列表数据
                this.$http.get(url).then(response=>{
                    this.newslistArray = response.body.message
                })
            }
        }
    }
</script>