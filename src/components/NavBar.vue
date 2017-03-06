<template>
    <div class="nav-bar" flex="main:left cross:center">
        <div class="left-button button" @click="goBack">
            <i class="iconfont icon-back"></i>
        </div>
        <div class="title">
            {{title}}
        </div>
        <div class="right-button button" @click="onRight" :class="{'other':otherClass}">
            <i class="iconfont" v-if="rightIcon" :class="rightIcon"></i>
            {{rightContent}}
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        props:{
            title:String,
            onRight:{
                type:Function,
                default:function(){
                    return ;
                }
            },
            rightContent:{
                type:String,
                default:''
            },
            rightIcon:{
                type:String,
                default:''
            },
            otherClass:{
                typs:Boolean,
                default:false,
            }
        },
        methods:{
            goBack:function(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped lang="less">
    .nav-bar{
        height:2.1rem;
        background-color:#fff;
        border-bottom:1px solid #cfcfcf;
        .button{
            height: 2.1rem;
            line-height:2.1rem;
            text-align:left;
            width:20%;
            font-size:0.6rem;
            .iconfont{
                margin-left:0.3rem;
                font-size:0.8rem;
            }
        }
        .right-button{
            .iconfont{
                float:right;
                margin-right:0.6rem;
                font-weight:bold;
            }
        }
        .right-button.other{
            text-align:right;
            position:relative;
            right:0.5rem;
            color:#379bf3;
        }
        .title{
            text-align:center;
            width:60%;
            font-size:0.7rem;
        }
    }
</style>