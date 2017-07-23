<template>
    <div class="tmpl">
        <!-- 1.0 商品信息的列表 -->
        <div class="goodsListStyle">
            <div class="everyItemStyle" v-for="(item,index) in goodsList" :key="item.id">
                <!-- 1.0 开关 -->
                <mt-switch @change="statisticsTotalCountAndTotalPrice" v-model="switchValues[index]"></mt-switch>

                <!-- 2.0 缩略图 -->
                <img :src="item.thumb_path">

                <!-- 3.0 商品价格和数量的信息 -->
                <div class="priceAndCountStyle">
                    <h5>{{item.title}}</h5>
                    <p>
                        <span>{{item.sell_price}}</span>&nbsp;&nbsp;商品数量{{item.count}}
                    </p>
                </div>

                <!-- 4.0 删除按钮 -->
                <mt-button :disabled="!switchValues[index]" @click="deleteGoods(index)" class="deleteGoodsStyle" size="small" type="danger">删 除</mt-button>
            </div>
        </div>

        <!-- 2.0 关于商品的统计信息 -->
        <div class="goodsListStatisticsInfoStyle">
            <h5>总计(不含运费)</h5>
            <p>已经勾选商品 <span>{{totalCount}}</span> 件,总价 <span>{{totalPrice}}</span> 元</p>

            <mt-button class="checkStyle" size="small" type="danger">去结算</mt-button>
        </div>
    </div>
</template>

<style scoped>
    /* 1.0 商品数量列表样式 */
    .goodsListStyle{
        padding: 6px;
    }

    .everyItemStyle{
        display: flex;
        height: 100px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
        align-items:center;
    }

    .everyItemStyle img{
        width: 65px;
        height: 65px;
        border: 1px solid rgba(92,92,92,0.3);
        padding: 5px;
        border-radius: 8px;
        margin-left: 10px;
    }

    .priceAndCountStyle{
        margin-left: 8px;
        flex:1;
    }

    .priceAndCountStyle h5{
        color: #0094ff;
    }

    .priceAndCountStyle p{
        margin-top: 8px;
    }

    .priceAndCountStyle p span{
        font-size: 16px;
        color: red;
    }

    .deleteGoodsStyle{
        width: 55px;
    }

    /* 2.0 商品统计信息的样式 */
    .goodsListStatisticsInfoStyle{
        height: 100px;
        background-color: rgba(92,92,92,0.3);
        padding-left: 15px;
        padding-top: 20px;
        position: relative;
    }

    .goodsListStatisticsInfoStyle h5{
        font-size: 16px;
        color: black;
        font-weight: 700;    
    }

    .goodsListStatisticsInfoStyle p{
        margin-top: 10px;

    }

    .goodsListStatisticsInfoStyle span{
        font-size: 16px;
        color: red;
    }
    
    .checkStyle{
        position: absolute;
        top: 35px;
        right: 15px;
    }

</style>

<script>
    import {getLocalGoodsList,deleteGoodsById} from '../../common/shopCartTool.js'

    import common from '../../common/common.js'

    import { MessageBox } from 'mint-ui';

    export default{
        data(){
            return {
                goodsList : [],
                totalCount : 0, //统计时的总数量
                totalPrice : 0,//统计时的总价格
                switchValues:[]//开关的状态
            }
        },
        created(){
            this.getGoodsListData()
        },
        methods:{
            //1.去服务器获取需要的商品信息，并且组装成我们需要的数据
            getGoodsListData(){
                //1.去先从localStorage中获取我们所有原先保存的商品数组
                /***
                 * [
                 *  {goodsId:"87",count:2},
                 *  {goodsId:"88",count:3},
                 *  {goodsId:"87",count:3}
                 * ]
                 * 
                 * **/
                //const localGoodsList = getLocalGoodsList()
                const localGoodsList = this.$store.getters.getGoodsList

                if(localGoodsList==null || localGoodsList.length<=0){
                    console.log("购物车中没有数据...")
                    return
                }
                
                //2.把里面id相同的每一项合并,合并成对象
                const localObject = {}
                for(var i = 0;i<localGoodsList.length;i++){
                    var everyItem = localGoodsList[i]
                    if(localObject[everyItem.goodsId]){
                        localObject[everyItem.goodsId]+=everyItem.count
                    }else{//原先对象中还没有 everyItem.goodsId这个属性
                        localObject[everyItem.goodsId] = everyItem.count
                    }
                }

                //3.从合并之后的数组中，取出每一项的id [87,88] ===> 87,88
                const tempArray = []
                for(var key in localObject){
                    tempArray.push(key)
                }

                const idsString = tempArray.join(',') //=> 87,88

                //4.发送网络请求
                const url = common.apihost + "api/goods/getshopcarlist/"+idsString

                this.$http.get(url).then(response=>{
                    //遍历服务器返回的数组的每一项，给他动态添加一个count属性
                    //巧妙的利用这里的循环，给我们的switchValues赋值
                    response.body.message.forEach(item=>{
                        item.count = localObject[item.id]
                        //给switchValues赋值
                        this.switchValues.push(true)
                    })

                    this.goodsList = response.body.message
                   
                    //1.刚进来，获取到数据及给switchValues都赋值了之后，我们就可以统计了
                    this.statisticsTotalCountAndTotalPrice()
                })
            },
            statisticsTotalCountAndTotalPrice(){
                let tempCount = 0
                let tempPrice = 0

                //循环的目的是为了获取哪个索引需要统计，而我们switchValues和goodsList的索引是一样的
                this.switchValues.forEach((item,i)=>{
                    if(item){
                        tempCount+=this.goodsList[i].count
                        tempPrice+=this.goodsList[i].count * this.goodsList[i].sell_price
                    }
                })

                //赋值给totalCount和totalPrice
                this.totalCount = tempCount
                this.totalPrice = tempPrice
            },
            //删除商品
            deleteGoods(index){
                MessageBox.confirm('确定删除该商品吗?').then(action => {
                    //1.更改徽标的值
                    // const changeCount = this.goodsList[index].count

                    // this.$root.newBus.$emit('goodsCount',-changeCount)

                    //2.删除localStorage中对应id的值
                    // deleteGoodsById(this.goodsList[index].id)
                    this.$store.commit('deleteGoods',this.goodsList[index].id)

                    //3.删除goodsList & switchValues中对应索引的数据
                    this.goodsList.splice(index,1)
                    this.switchValues.splice(index,1)

                    //4.重新统计
                    this.statisticsTotalCountAndTotalPrice()
                },cancel=>{
                    
                })
            }
        }
    }
</script>