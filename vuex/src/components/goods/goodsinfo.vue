<template>
   <div class='tmpl'>
       <!-- 1.0 轮播图 -->
       <div class="lunboStyle">
            <subswipe :lunbo_url="'api/getthumimages/'+$route.params.goodsId" :lunbo_time="time"></subswipe> 
       </div>
       
       <!-- 2.0 商品的描述 -->
       <div class="goodsInfoStyle">
            <h4>{{goodsInfo.title}}</h4>
            <p>市场价:￥<s>{{goodsInfo.market_price}}</s>&nbsp;&nbsp;销售价:￥<span>{{goodsInfo.sell_price}}</span></p>
            <!-- 数字选择子组件 -->
            <subnumber v-on:numberChange="getSubNumberCount" class="subNumberStyle"></subnumber>
            <mt-button size="small" type="primary">立即购买</mt-button>
            <mt-button @click="addToShopCart" size="small" type="danger">加入购物车</mt-button>
       </div>

       <!-- 3.0 参数描述 -->
       <div class="goodsParamsStyle">
            <h5>商品参数</h5>
            <ul>
                <li>商品货号:{{goodsInfo.goods_no}}</li> 
                <li>库存情况:剩余 {{goodsInfo.stock_quantity}} 件</li>  
                <li>上架时间:{{goodsInfo.add_time | dateFmt}}</li>     
            </ul>
       </div>

       <!-- 4.0 图文信息和商品评论 -->
       <div class="pictureAndTextStyle">
            <mt-button @click="goPictureAndText" plain size="large" type="primary">图文介绍</mt-button>

            <mt-button @click="goGoodsComment" class="goodsCommentStyle" plain size="large" type="danger">商品评论</mt-button>
       </div>
   </div>
</template>
    
<style scoped>
    .lunboStyle,.goodsInfoStyle,.goodsParamsStyle,.pictureAndTextStyle{
        margin: 10px;
        padding: 10px;
        border: 1px solid rgba(92,92,92,0.3);
        border-radius: 5px;
    }

    .goodsInfoStyle h4{
        font-size: 16px;
        color:#0094ff;
        border-bottom: 1px solid rgba(92,92,92,0.2);
        padding-bottom: 10px;
    }

    .goodsInfoStyle p span{
        font-size: 16px;
        color: red;
        font-weight: 700;
    }

    .goodsParamsStyle h5{
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.2);
    }

    .goodsParamsStyle ul{
        padding-left: 0px;
    }

    .goodsParamsStyle li{
        list-style: none;
        font-size: 15px;
    }

    .goodsCommentStyle{
        margin-top: 20px;
    }

    .subNumberStyle{
        margin-bottom: 5px;
    }
</style>
    
<script>
    import common from '../../common/common.js'

    //导入子组件
    import subswipe from '../subcomponents/subswipe.vue'
    import subnumber from '../subcomponents/subnumber.vue'

    //导入公共的Vue对象
    //mport bus from '../../common/commonvue.js'

    import {Toast} from 'mint-ui'

    import {addGoods,name} from '../../common/shopCartTool.js'
    
    export default {
        data() {
            return {
                time:2000,//轮播的时间
                goodsInfo : {},
                myCount:1 //数量
            }
        },
        created() {
            this.getGoodsInfoData()
        },
        methods: {
            //1.0 获取商品明细的数据
            getGoodsInfoData(){
                const url = common.apihost+"api/goods/getinfo/"+this.$route.params.goodsId

                this.$http.get(url).then(response=>{
                    this.goodsInfo = response.body.message[0]
                })
            },

            //2.0 去图文介绍
            goPictureAndText(){ 
                //编程式导航
                this.$router.push({ name: 'pictureAndText', params: { goodsId: this.$route.params.goodsId }})
            },
            //3.0 去商品评论组件
            goGoodsComment(){
                // 带查询参数，变成 /register?plan=private
                this.$router.push({ path: '/goods/goodscomment', query: { goodsId: this.$route.params.goodsId }})
            },
            //4.0 当触发了changeNumber事件之后执行的函数
            getSubNumberCount(count){
                this.myCount = count
            },
            //5.0 点击了加入购物车
            addToShopCart(){
                //1.提示，添加成功
                Toast({
                    message: '添加成功',
                    position: 'middle',
                    duration: 2000
                })

                //2.更改购物车徽标的值
                //bus.$emit('goodsCount',this.myCount)
                //this.$root.newBus.$emit('goodsCount',this.myCount)

                //3.将商品和数量添加到localstorage
                const goods={
                    goodsId : this.$route.params.goodsId,
                    count : this.myCount
                }
                //addGoods(goods)

                //使用Vuex保存到仓库中
                //this.$store.commit('addGoods',goods)
                //下面的了解
                // this.$store.commit({
                //     type:'addGoods',
                //     goods:goods
                // })
                const _this = this
                setTimeout(function(){
                    console.log("1111111")
                    _this.$store.dispatch('addGoodsAction',goods)
                },2000)
            }
        },
        components:{ //注册子组件
            subswipe,
            subnumber     
        }
    }
</script>