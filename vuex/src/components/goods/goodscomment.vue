<template>
   <div class='tmpl'>
        <subcomment :commentId="$route.query.goodsId"></subcomment>
   </div>
</template>
    
<style scoped>
    
</style>
    
<script>
    import common from '../../common/common.js'

    //导入评论子组件
    import subcomment from '../subcomponents/subcomment.vue'
    
    export default {
        components:{
            subcomment
        }
    }
</script>