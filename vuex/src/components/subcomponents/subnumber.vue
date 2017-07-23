<template>
   <div class="numberStyle">
        <div @click="subtract" class="left">-</div>
        <div class="middle">{{count}}</div>
        <div @click="add" class="right">+</div>
   </div>
</template>
    
<style scoped>

    .left,.middle,.right{
        display: inline-block;
        border: 1px solid rgba(92,92,92,0.3);
        text-align: center;
        vertical-align: top;
        height: 33px;
        line-height: 33px;
    }

    .left,.right{
        width: 35px;
    }

    .middle{
        width: 45px;
    }
</style>
    
<script>
    import common from '../../common/common.js'
    
    export default {
        data() {
            return {
                count:1
            }
        },
        created() {
            
        },
        methods: {
            subtract(){
                if(this.count<=1){
                    return
                }

                this.count--

                this.notify()
            },
            add(){
                this.count++

                this.notify()
            },
            notify(){
                /**
                * 参数1：要触发的事件名称
                * 参数2：传递的值
                */
                this.$emit('numberChange',this.count)
            }
        }
    }
</script>