<template>
    <div class="btn-com" @click="onClick">
        <i class="iconfont" :class="icon"></i><span>{{title}}</span>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        props:{
            onClick:{
                type:Function,
                default:function(){
                    return 
                }
            },
            icon:{
                type:String,
                default:""
            },
            title:{
                type:String,
                default:'确定'
            }
        }
    }
</script>
<style scoped lang="less">
    .btn-com{
        height:1.9rem;
        width:100%;
        line-height: 1.9rem;
        text-align: center;
    }
</style>