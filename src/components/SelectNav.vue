<template>  
    <div class="select-nav" flex="die:left box:first">
        <div class="left-button button" @click="goBack">
            <i class="iconfont icon-back"></i>
        </div>
        <div class="select-bar">
            <input :type="type" :placeholder="placeholder" :value="value" @input="onInput"/>
            <i class="iconfont icon-little-arrow" @click="onDropDown"></i>
        </div>
        <div class="right-button button" @click="goOrder">
            <i class="iconfont icon-order"></i>
        </div>
    </div>
</template>
<script>
    import router from '../router'
    export default {
        data () {
            return {
            }
        },
        props:{
            type:{
                type:String,
                default:'text'
            },
            placeholder:{
                type:String,
                default:''
            },
            onDropDown:{
                type:Function,
                default:function(){
                    return;
                }
            },
            value:{
                type:String,
                default:'',
            },
            onInput:{
                type:Function,
                default:function(){
                    return;
                }
            },
            goBack:{
                type:Function,
                default:function(){
                    router.go(-1);
                }
            }
        },
        methods:{
            goOrder:function(){
                this.$router.push({name:'myorder'})
            }
        }
    }
</script>
<style lang="less" scoped>
    .select-nav{
        height:2.1rem;
        background-color:#fff;
        border-bottom:1px solid #cfcfcf;
        z-index:1;
        .button{
            height: 2.1rem;
            line-height:2.1rem;
            text-align:left;
            width:10%;
            font-size:0.6rem;
            .iconfont{
                margin-left:0.3rem;
                font-size:0.8rem;
            }
        }
        .select-bar{
            font-size: 0.64rem;
            margin: 0;
            height: 2.1rem;
            line-height: 2.1rem;
            width:90%;
            overflow:hidden;
            position:relative;
            z-index:1;
            input{
                font-family: "Microsoft YaHei";
                width:88%;
                padding:0.32rem 0.64rem;
                border:none;
                border-radius: 0.2rem;
                background-color:#eee;
                text-align: left;
                outline:none;
            }
            .iconfont{
                position:absolute;
                z-index:2;
                top:0;
                right:0.3rem;
            }
        }
    }
</style>