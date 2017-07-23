<template>
    <mt-swipe :auto="lunbo_time">
        <mt-swipe-item v-for="item in lunboArray" :key="item.src">
            <a href="item.url">
                <img :src="item.img">
            </a>
        </mt-swipe-item>
    </mt-swipe>
</template>
    
<style scoped>
    /*1.0 轮播图样式*/
    .swipeStyle{
        z-index: 2;
    }

    img {
        height: 100%;
        width: 100%
    }

    .mint-swipe {
        height: 250px;
        width: 100%
    }
</style>
    
<script>
    import common from '../../common/common.js'
    
    export default {
        data() {
            return {
                lunboArray : []
            }
        },
        created() {
            this.getLunboData()
            this.timeInterval = parseInt(this.$httpabc)
        },
        methods: {
            getLunboData(){
                const url = common.apihost+this.lunbo_url

                this.$http.get(url).then(response=>{
                    this.lunboArray = response.body.message
                })
            }
        },
     
        //props:['lunbo_url','lunbo_time']
        //https://cn.vuejs.org/v2/api/?#props
        props:{'lunbo_url':String,'lunbo_time':{
            type: Number,
            required: true,
            validator: function (value) {
                return value >= 1000
            }
        }}
    }
</script>