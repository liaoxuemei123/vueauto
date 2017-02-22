<template>
    <div class="inp-com" flex="dir:left box:mean cross:center">
        <div>
            <i class="iconfont" :class="icon"></i><span>{{title}}</span>
        </div>
        <div>
            <input :type="type" :placeholder="placeholder">
        </div>
    </div>
</template>
<script>
    export default{
        data () {
            return {

            }
        },
        props:{
            icon:{
                type:String,
                default:'',
            },
            title:{
                type:String,
                default:''
            },
            type:{
                type:String,
                default:'text'
            },
            placeholder:{
                type:String,
                default:''
            }
        }
    }
</script>
<style scoped lang="less">
    .inp-com{
        height: 1.9rem;
        line-height: 1.9rem;
        background-color:#fff;
        width: 100%;
        input{
            border:none;
            height:100%;
            width:90%;
            background-color:transparent;
            font-size:0.5rem;
            text-align:right;
            padding:0.2rem 5%;
            outline: none;
        };
        span{
            font-size:0.68rem;
            color:#333;
        };
        i.iconfont{
            font-size:0.68rem;
            margin:0 0.2rem 0 0.32rem;
            color:#ff5500;
        }
    }
</style>