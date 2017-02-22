<template>
    <div class="nav-bar" flex="main:left cross:center">
        <div class="left-button button" @click="goBack">
            <i class="iconfont icon-back"></i>
        </div>
        <div class="title">
            {{title}}
        </div>
        <div class="right-button button" @click="onRight">
        </div>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
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
            }
            
        },
        methods:{
            goBack:function(){
                var self = this;
                this.popPage(self);
            },
            ...mapMutations([
                'popPage'
            ])
        }
    }
</script>
<style scoped lang="less">
    .nav-bar{
        height:2.1rem;
        background-color:#fff;
        .button{
            height: 2.1rem;
            line-height:2.1rem;
            text-align:center;
            width:20%;
        }
        .title{
            text-align:center;
            width:60%;
            font-size:0.8rem;
        }
    }
</style>