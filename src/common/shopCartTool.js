/**
 * 对我们本地存储的购物车的数据，进行增，删，查
 */
// export default {
//     addGoods:function(){
//         console.log("...addGoods...")
//     },
//     deleteGoodsById:function(){

//     },
//     getGoodsList:function(){

//     }
// }

const key = "goodsList"

//往localStorage中保存每一商品信息
export function addGoods(goods){
    //1.读取原先localStorage存储的数据
    const goodsList = JSON.parse(localStorage.getItem(key) || '[]')

    //2.将goods push到goodsList里面去
    goodsList.push(goods)

    //3.覆盖写入回去
    localStorage.setItem(key,JSON.stringify(goodsList))
}

//从localStorage中获取我们当时保存的商品数组
export function getLocalGoodsList(){
    return JSON.parse(localStorage.getItem(key) || '[]')
}

//获取我们localStorage中的商品总数量
export function getGoodsListCount(){
    //1.读取原先localStorage存储的数据
    const goodsList = JSON.parse(localStorage.getItem(key) || '[]')

    //2.搞一个变量
    let totalCount = 0

    goodsList.forEach(item=>{
        totalCount+=item.count
    })
    
    return totalCount
}

//根据id进行删除
export function deleteGoodsById(id){
    //1.读取原先localStorage存储的数据
    const goodsList = JSON.parse(localStorage.getItem(key) || '[]')

    //2.从后往前删除满足条件的项
    for(var i=goodsList.length-1;i>=0;i--){
        if(goodsList[i].goodsId==id){
            goodsList.splice(i,1)
        }
    }

    //3.覆盖写入回去
    localStorage.setItem(key,JSON.stringify(goodsList))
}