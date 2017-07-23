<template>
  <div>
      <!--1.0 头部导航条-->
      <mt-header class="headerStyle" fixed title="买买买"></mt-header>

      <!-- 全局返回按钮 -->
      <div v-show="isShowBack" @click="goBack" class="backStyle">&lt;返回</div>
      
      <!--2.0 中间内容-->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>

      <!--3.0 底部的TabBar-->
      <mt-tabbar fixed :class="isShowTabBar ? '' : 'tabBarStyleHidden' ">
        <router-link class="mint-tab-item" to="/home">
          <mt-tab-item>
            <img src="http://img07.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
          </mt-tab-item>
        </router-link>
        <router-link class="mint-tab-item" to="/category">
          <mt-tab-item>
            <img src="http://img06.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
          </mt-tab-item>
        </router-link>
        <router-link class="mint-tab-item" to="/shopcart">
          <mt-tab-item>
            <img src="http://img06.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
            <span id="badgeId" class="badgeStyle">{{count}}</span>
          </mt-tab-item>
        </router-link>
        <router-link class="mint-tab-item" to="/mine">
          <mt-tab-item>
            <img src="http://img08.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">
          </mt-tab-item>
        </router-link>
      </mt-tabbar>
  </div>
</template>

// scoped样式只会在App.vue中起作用
<style scoped>
    .headerStyle{
      z-index:5
    }

    /* 隐藏TabBar的样式 */
    .tabBarStyleHidden{
      display: none;
    }

    .mint-tabbar > .mint-tab-item.is-selected{
        background-color: #fafafa;
    }

    img{
      width:42px;
      height: 35px;
    }

    /* 返回按钮的样式 */
    .backStyle{
      font-size: 14px;
      color:#fff;
      font-weight: 900;
      position: fixed;
      /* width: 50px;
      height: 30px; */
      left: 10px;
      top:10px;
      z-index: 20;
    }

    /* 2.0 购物车徽标样式 */
    .mint-tab-item-label .badgeStyle{
          font-size: 11px;
          line-height: 1.3;  
          position: absolute;
          top: 9px;
          left: 63%;
          text-align: center;
          padding: 1px 5px; 
          color: #fff;
          border-radius: 11px; 
          background: red;
    }
</style>

<script>
  //导入公共的Vue对象
  import bus from './common/commonvue.js'

  import {getGoodsListCount} from './common/shopCartTool.js'

  export default{
    data(){
      return {
        isShowBack : false,
        isShowTabBar : true,
        count : 0
      }
    },
    created(){
      this.isShowOrHiddenBackAndTarBar(this.$route.path)

      //使用中央事件总线，来监听我们的自定义事件
      //http://www.cnblogs.com/zsongs/p/6388932.html
      // bus.$on('goodsCount',(goodsCount)=>{
      //     this.count+=goodsCount
      // })
      //参考：https://segmentfault.com/a/1190000008018314
      // this.$root.newBus.$on('goodsCount',(goodsCount)=>{
      //     this.count+=goodsCount
      // })
    },
    updated(){
      this.getLocalGoodsCount()
    },
    methods:{
      goBack(){
        //路由返回
        this.$router.go(-1)
      },
      //显示还是隐藏返回按钮
      isShowOrHiddenBackAndTarBar(path){
          if(path=='/home'){
              this.isShowBack = false //隐藏返回按钮
              this.isShowTabBar = true //显示TarBar
          }else{
              this.isShowBack = true //显示隐藏按钮
              this.isShowTabBar = false
          }
      },
      getLocalGoodsCount(){
         console.log("66666666666666")
          //this.count = getGoodsListCount()
          this.count = this.$store.getters.getGoodsTotalCount
      }
    },
    watch:{
      //监控路由的更改
      '$route':function(newValue,oldVal){
          this.isShowOrHiddenBackAndTarBar(newValue.path)
      }
    }
  }
</script>
