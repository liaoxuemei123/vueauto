<template>  
    <div class="select-nav" flex="die:left box:first">
        <div class="left-button button" @click="goBack">
            <i class="iconfont icon-back"></i>
        </div>
        <div class="select-bar">
            <input :type="type" :placeholder="placeholder" @input="changeSearch" :value="items[menuValue].label"/>
            <i class="iconfont icon-little-arrow" @click="menuShow=!menuShow"></i>
            <div class="drop-down-menu">
                <div class="drop-down-item" flex="dir:left cross:center" :class="{'active':index==menuValue}" v-for="(item,index) in items" v-show="menuShow" @click="selectItem(index)">
                    {{item.label}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                menuShow:false,
                menuValue:0,
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
            items:{
                type:Array,
                default:function(){
                    return [
                        {
                            value:1,
                            label:'车型1'
                        },
                        {
                            value:2,
                            label:'车型2'
                        },
                        {
                            value:3,
                            label:'车型3'
                        },
                        {
                            value:4,
                            label:'车型4'
                        },
                    ]
                }
            }
        },
        methods:{
            goBack:function(){
                this.$router.go(-1);
            },
            changeSearch:function(){

            },
            selectItem:function(index){
                this.menuValue = index;
                setTimeout(() => {
                    this.menuShow = false;
                },300)
            }
        }
    }
</script>
<style lang="less" scoped>
    .select-nav{
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
        .select-bar{
            font-size: 0.64rem;
            margin: 0;
            height: 2.1rem;
            line-height: 2.1rem;
            width:90%;
            overflow:hidden;
            margin-right:0.5rem;
            position:relative;
            z-index:1;
            input{
                font-family: "Microsoft YaHei";
                width:90%;
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
                right:0.1rem;
            }
            .drop-down-menu{
                position:fixed;
                right:0.5rem;
                top:2.1rem;
                width:50%;
                color:#fff;
                border-radius:0.2rem;
                text-align:left;
                background-color:rgba(0,0,0,0.8);
                overflow:hidden;
                .drop-down-item{
                    width:84%;
                    margin:0.2rem 5%;
                    padding:0 3%;
                    border:none;
                    height:1.5rem;
                    border-radius:0.2rem;
                }
                .drop-down-item.active{
                    background-color:rgba(180,180,180,0.9);
                }
            }
        }
    }
</style>