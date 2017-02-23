<template>
    <div class="search" flex="dir:left cross:center">
        <div class="left-button button" @click="goBack">
            <i class="iconfont icon-back"></i>
        </div>
        <div class="search-bar">
            <form @submit.prevent="search">
                <input :type="type" :placeholder="placeholder" :value="key" @input="changeSearch"/>
            </form>
        </div>
        <div class="right-button button" @click="onRight">
        </div>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    export default {
        data () {
            return {
                key:''
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
            onRight:{
                type:Function,
                default:function(){
                    return ;
                }
            }
        },
        methods:{
            goBack:function(){
                this.popPage(this);
            },
            search:function(){
                console.log(this.key);
            },
            changeSearch:function(e){
                var target = $(e.target);
                this.key = target.val();
            },
            ...mapMutations([
                'popPage'
            ])
        }
    }
</script>
<style scoped lang="less">
    .search{
        height:2.1rem;
        background-color:#fff;
        box-shadow: 0px 1px 5px #aaa;
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
        .search-bar{
            font-size: 0.64rem;
            margin: 0;
            height: 2.1rem;
            text-align: center;
            line-height: 2.1rem;
            width:80%;
            input{
                font-family: "Microsoft YaHei";
                width:90%;
                padding:0.32rem 0.64rem;
                border:none;
                border-radius: 0.85rem;
                background-color:#eee;
                text-align: center;
                outline:none;
            }
        }
    }
</style>