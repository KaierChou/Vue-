<template>
    <div class='tmpl'>
        <!-- 1.0 顶部的菜单栏 -->
         <div class="photoCategoryStyle"> 
            <ul ref="photoCategoryUlRef">
                <li @click="getPhotoListByCategoryId(0)">全 部</li>
                <li @click="getPhotoListByCategoryId(item.id)" v-for="item in photoCategoryList" :key="item.id">{{item.title}}</li>
            </ul>
         </div> 

        <!-- 2.0 图片列表 -->
        <div class="photoListStyle">
            <ul>
                <li v-for="item in photoList" :key="item.id">
                    <router-link :to="'/photo/photoinfo/'+item.id">
                        <img :src="item.img_url"> 
                        <p class="titleAndZhaiyaoStyle">
                            <span class="title">
                                {{item.title}}
                            </span>
                            <br/>
                                {{item.zhaiyao}}
                        </p>
                    </router-link>
                </li>    
            </ul>
        </div>
    </div>
</template>
<style scoped>
    /* 1.0 图片分类菜单样式 */
    .photoCategoryStyle{
         overflow-x: auto; 
        /* padding-bottom: 8px; */
    }

    .photoCategoryStyle ul{
        padding: 0px;
        margin: 5px 0px;
        /* overflow-x: auto;  */
        white-space: nowrap;
        padding:0px 0px 10px 0px;
        /* width:1200px; */
    }

    .photoCategoryStyle li{
        list-style: none;
        display: inline;
        color: #0094ff;
        margin:0px 5px;
    }

    /* 2.0 图片列表样式 */
    .photoListStyle ul{
        padding: 0px;
        margin: 0px;
    }

    .photoListStyle li{
        list-style: none;
        padding: 1px 3px;
        position: relative;
        width: 99%;
    }

    .photoListStyle img{
        width: 100%;
        height: 400px;
    }

    .titleAndZhaiyaoStyle{
        background-color: rgba(0,0,0,0.2);
        color:white;
        position: absolute;
        left: 5px;
        bottom: 0px;
        right: 5px;
    }

    .title{
        font-size: 16px;
        font-weight: 900;
    }
</style>
<script>
    import common from '../../common/common.js'

    import { Indicator } from 'mint-ui'

    export default {
        data() {
            return {
                photoCategoryList : [],//图片分类菜单列表
                photoList:[] //图片列表数据
            }
        },
        created() {
            //获取我们分类菜单数据
            this.getPhotoCategoryData()

            //根据分类id获取下面的图片列表数据
            this.getPhotoListByCategoryId('0')
        },
        methods: {
            //1.0 获取图片分类数据
            getPhotoCategoryData(){
                const url = common.apihost+"api/getimgcategory"

                this.$http.get(url).then(response=>{
                    this.photoCategoryList = response.body.message

                    //设置我们顶部菜单的宽度
                    //this.$refs.photoCategoryUlRef.style.width=(response.body.message.length+1)*76+'px'
                })
            },

            //2.0 根据分类id获取该分类下面的图片列表数据
            getPhotoListByCategoryId(categoryId){
                Indicator.open({
                    text:'正在拼命加载中...',
                    spinnerType:'triple-bounce'
                })

                const url = common.apihost + "api/getimages/"+categoryId

                this.$http.get(url).then(response=>{
                    Indicator.close()
                    this.photoList = response.body.message
                },err=>{
                    Indicator.close()
                })
            }
        }
    }
</script>