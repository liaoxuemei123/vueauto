<template>
    <div class="btn-com" @click="onClick" :style="{'background-color':background}">
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
            },
            background:{
                type:String,
                default:"#fc4c1d"
            }
        }
    }
</script>
<style scoped lang="less">
    .btn-com{
        height:2.1rem;
        width:100%;
        line-height: 2.1rem;
        text-align: center;
        border-radius:3px;
        outline:none;
    }
</style>