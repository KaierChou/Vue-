<template>
    <div class="tmpl">
        <!--1.0 轮播图-->
        <subswipe lunbo_url="api/getlunbo"  :lunbo_time="time"></subswipe>

        <!--2.0 九宫格布局-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/news/newslist">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻咨询</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/photo/photolist">
                        <span class="mui-icon mui-icon-email">
                            <span class="mui-badge">5</span>
                        </span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/goods/goodslist">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    /*1.0 九宫格样式*/
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right: none;
        border-bottom: none;
    }

    .mui-icon-home::before,
    .mui-icon-email::before,
    .mui-icon-chatbubble::before,
    .mui-icon-location::before,
    .mui-icon-search::before,
    .mui-icon-phone::before{
        content:''
    }

    /** 设置我们背景图片的宽度与高度 */
    .mui-icon{
        width: 50px;
        height: 50px;
    }

    .mui-icon.mui-icon-home{
        background-image: url('../../statics/images/menu3.png');
        background-repeat: round;
    }

    .mui-icon.mui-icon-email{
        background-image: url('../../statics/images/menu4.png');
        background-repeat: round;
    }

    .mui-icon.mui-icon-chatbubble{
        background-image: url('../../statics/images/menu5.png');
        background-repeat: round;
    }

    .mui-icon.mui-icon-location{
        background-image: url('../../statics/images/menu6.png');
        background-repeat: round;
    }

    .mui-icon.mui-icon-search{
        background-image: url('../../statics/images/menu9.png');
        background-repeat: round;
    }

    .mui-icon.mui-icon-phone{
        background-image: url('../../statics/images/menu10.png');
        background-repeat: round;
    }
</style>

<script>
    //导入common.js的对象
    import common from '../../common/common.js'

    //导入子组件
    import subswipe from '../subcomponents/subswipe.vue'

    //module.exports = {} //es5
    //导出的是和我们home.vue这个组件对应的Vue实例
    //这个与home.vue对应的实例，是给我们home.vue组件的template中的标签或是指令提供数据的，如果，没有这个实例，那么我们的home.vue中的数据只能写死
    export default { //es6
        // data:function(){ //es6

        // }
        data() { //es6除了箭头函数另外一种写法 React中箭头函数用得最多
            return {
                time:3000
            }
        },
        //这个函数会自动调用，当组建创建完毕，还没有正式挂在到id=app的div
        components:{ //注册子组件
            subswipe     
        }
    }
</script>