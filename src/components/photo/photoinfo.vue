<template>
    <div class="tmpl">
        <!-- 1.0 标题区域的信息 -->
        <div class="title">
            <h4>{{photoInfo.title}}</h4>
            <p>
                {{photoInfo.add_time | dateFmt('YYYY-MM-DD')}}&nbsp;&nbsp;{{photoInfo.click}}次浏览
            </p>
        </div>

        <!-- 2.0 图片信息的缩略图 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(item,index) in thumbImages" :key="item.src" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <img @click="$preview.open(index,thumbImages)" class="preview-img" width="100" height="100" :src="item.src">
                </li>
            </ul> 
		</div>

        <!-- 3.0 图片内容 -->
        <div class="content">
            <span v-html="photoInfo.content"></span>
        </div>

        <!-- 4.0 评论子组件 -->
        <subcomment :commentId="this.$route.params.photoId"></subcomment>
    </div>
</template>
    
<style scoped>
    .title,.content{
        padding: 5px;
    }

    h4{
        color: #0094ff;
    }

    .content{
        font-size: 13px;
        color: #666666;
    }
</style>
    
<script>
    import common from '../../common/common.js'

    //导入评论子组件
    import subcomment from '../subcomponents/subcomment.vue'
    
    export default {
        data() {
            return {
                photoInfo : {},
                thumbImages : []
            }
        },
        created() {
            //获取图片信息数据
            this.getPhotoInfoData()
            //获取我们图片信息的缩略图
            this.getThumbImagesData()
        },
        methods: {
            getPhotoInfoData(){
                const url = common.apihost+"api/getimageInfo/"+this.$route.params.photoId

                this.$http.get(url).then(response=>{
                    this.photoInfo = response.body.message[0]
                })
            },
            getThumbImagesData(){
                const url = common.apihost+"api/getthumimages/"+this.$route.params.photoId

                this.$http.get(url).then(response=>{
                    response.body.message.forEach(item=>{
                        item.w=600
                        item.h=400
                    })
                    this.thumbImages = response.body.message
                })
            }
        },
        components:{
            subcomment
        }
    }
</script>