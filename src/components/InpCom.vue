<template>
    <div class="inp-com" flex="dir:left box:first cross:center" @click="onClick">
        <div class="input-label">
            <i class="iconfont" :class="icon"></i><span>{{title}}</span>
        </div>
        <div flex="dir:left box:last cross:center">
            <input :type="type" :maxlength="maxlength" :placeholder="placeholder" :class="{'arrow':rightArrow}" @blur="onBlur" @input="onInput" :value="value" :readonly="readonly">
            <i class="iconfont icon-go arrow" v-if="rightArrow"></i>
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
            value:{
                type:String,
                default:'',
            },
            readonly:{
                type:Boolean,
                default:false,
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
            },
            maxlength:{
                type:String,
                default:''
            },
            rightArrow:{
                type:Boolean,
                default:false
            },
            onClick:{
                type:Function,
                default:function(){
                    return;
                }
            },
            onInput:{
                type:Function,
                default:function(){
                    return;
                }
            },
            onBlur:{
                type:Function,
                default:function(){
                    return;
                }
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
        .input-label{
            width:40%;
        }
        input{
            border:none;
            height:100%;
            width:90%;
            background-color:transparent;
            font-size:0.57rem;
            text-align:right;
            padding:0.2rem 10% 0.2rem 0%;
            outline: none;
        };
        input.arrow{
            padding-right:0;
        }
        span{
            font-size:0.68rem;
            color:#333;
        };
        i.iconfont{
            font-size:0.68rem;
            margin:0 0.2rem 0 0.32rem;
            color:#00bffe;
        }
        i.iconfont.arrow{
            color:#cfcfcf;
            margin:0;
            margin-right:0.2rem;
            font-size:0.7rem;
        }
    }
</style>