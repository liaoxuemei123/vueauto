<template>
    <div class="self-search" flex="dir:left cross:center">
        <div class="search-bar">
            <form @submit.prevent="search">
                <input :type="type" :placeholder="placeholder" :value="key" ref='search'/>
            </form>
        </div>
    </div>
</template>
<script>
    import router from 'router';
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
            },
            search:{
                type:Function,
                default:function(key){
                }
            },
            goBack:{
                type:Function,
                default:function(){
                    router.go(-1);
                }
            }
        },
    }
</script>
<style scoped lang="less">
    .self-search{
        height:2.1rem;
        background-color:#fff;
        border-bottom:1px solid #cfcfcf;
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
            margin: 0 auto;
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