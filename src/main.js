import Vue from 'vue' //const Vue = require('vue')
import MINT from 'mint-ui' //导入饿了吗插件
import VueRouter from 'vue-router' //导入路由
import VueResource from 'vue-resource' //导入网络请求的包
import moment from 'moment'//导入时间格式化的包
import VuePreview from 'vue-preview'
import Vuex from 'vuex'

//使用基于Vue的第三方包
Vue.use(MINT)
Vue.use(VueRouter) //给Vue实例添加 $router $route
Vue.use(VueResource) //给Vue实例添加 $http
Vue.use(VuePreview)
Vue.use(Vuex) //给Vue实例添加 $store

//导入需要的css
//todo，上线的时候改掉
//import 'mint-ui/lib/style.css'//导入mint-ui
import '../node_modules/mint-ui/lib/style.css'
import './statics/mui/css/mui.min.css'//导入mui的css
import './statics/css/site.css'//导入自己的样式


//定义的全局过滤器
//时间格式化过滤器
//参数1：过滤器的名称
//参数2：过滤器执行的函数
Vue.filter('dateFmt',(input,formatString)=>{
    const lastFormatString = formatString || "YYYY-MM-DD HH:mm:ss"

    //moment中接的,要格式化的原始数据,如果不传，就格式化当前时间
    //format格式化成什么样子,如果不传，就是原始的样子
    return moment(input).format(lastFormatString)
})

import App from './App.vue' //es6的导入模块写法，相当于es5的require

//导入我们的所有组件
import home from './components/home/home.vue'
import category from './components/category/category.vue'
import shopcart from './components/shopcart/shopcart.vue'
import mine from './components/mine/mine.vue'
import newslist from './components/news/newslist.vue'
import newdetail from './components/news/newsdetail.vue'
import photolist from './components/photo/photolist.vue'
import photoinfo from './components/photo/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import pictureAndText from './components/goods/pictureAndText.vue'
import goodscomment from './components/goods/goodscomment.vue'

//创建路由对象，设置路由规则
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/category',component:category},
        {path:'/shopcart',component:shopcart},
        {path:'/mine',component:mine},
        {path:'/news/newslist',component:newslist},
        {path:'/news/newsdetail/:newsId',component:newdetail},
        {path:'/photo/photolist',component:photolist},
        {path:'/photo/photoinfo/:photoId',component:photoinfo},
        {path:'/goods/goodslist',component:goodslist},
        {path:'/goods/goodsinfo/:goodsId',component:goodsinfo},
        {name:'pictureAndText',path:'/goods/pictureAndText',component:pictureAndText},
        {path:'/goods/goodscomment',component:goodscomment}
    ]
})

//创建一个仓库，用来处理购物车的数据
const store = new Vuex.Store({
    state:{
        goodsList:[]//存放选择的商品的，以及删除的时候从这里删除
    },
    getters:{//获取仓库中的值
        getGoodsTotalCount(state){ //用于徽标显示
            let totalCount = 0
            for(var i=0;i<state.goodsList.length;i++){ 
                totalCount+=state.goodsList[i].count
            }

            return totalCount
        },
        getGoodsList(state){
            return state.goodsList
        }
    },
    mutations:{ //同步更改仓库中的值
        /**
         * goods传递过来的是对象 {goodsId:"87",count:2}
         */
        addGoods(state,goods){
            state.goodsList.push(goods)
        },
        deleteGoods(state,goodsId){
            for(var i=state.goodsList.length-1;i>=0;i--){
                if(state.goodsList[i].goodsId==goodsId){
                    state.goodsList.splice(i,1)
                }
            }
        }
    },
    actions:{//异步更改仓库中的值
        addGoodsAction(context,goods){
            context.commit('addGoods',goods)
        }
    }
})

//创建一个Vue的根实例
new Vue({
    el:"#app",
    router,
    store,
    //es6简化的写法
    render:h=> h(App), //告诉我们Vue实例，到时候启动项目，渲染的就是我们App.vue
    //es5的写法
    // render:function(createElement){
    //     return createElement(App) //告诉我们Vue实例，到时候启动项目，渲染的就是我们App.vue
    // }//根实例将那个组件渲染到id=app的div中去
    data:{
        newBus : new Vue()
    }
})
