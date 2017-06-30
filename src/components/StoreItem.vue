<template>
    <div class="item-container" flex="dir:left cross:center box:first" v-tap="onClick">
        <div class="select" flex="main:right cross:center">
            <i class="iconfont icon-select" v-if="active"></i>
            <i class="iconfont icon-circle active" v-else="active"></i>
        </div>
        <div class="store-info" flex="dir:left cross:center box:mean">
            <!--<div class="store-url">
                <img v-lazy="item.photoUrl"/>
            </div>-->
            <div class="info-content" flex="dir:top cross:top box:mean">
                <div class="line" flex="dir:left cross:center main:justify">
                    <span class="store-name">{{item.storeName}}</span>
                    <span class="store-distance">{{item.distance | distanceFilter}}</span>
                </div>
                <div class="line" flex="dir:left cross:center">
                    <span class="store-address">{{item.address}}</span>
                </div>
                <div class="line" flex="dir:left cross:center">
                    <span class="store-phone">联系电话：{{item.tel | telFilter}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        props:{
            item:{
                type:Object,
                default:{}
            },
            onClick:{
                type:Function,
                default:function(){
                    return 
                }
            },
            active:{
                type:Boolean,
                default:false
            }
        },
        filters:{
            distanceFilter:function(val){
                return (val/1000).toFixed(1) + 'km';
            },
            telFilter:function(val){
                if(!val) return '暂无';
                return val;
            }
        }
    }
</script>
<style scoped lang="less">
    .item-container{
        height: 3.42rem;
        border-bottom:1px solid #aaa;
        width:100%;
        overflow: hidden;
        background-color:#fff;
        .select{
            width: 1.3rem;
            height: 3.42rem;
            .iconfont{
                font-size: 0.85rem;
                color:#fc4c1d;
            }
            .active{
                color:#aaa;
            }
        }
        .store-info{
            margin-left:0.3rem;
            .store-url{
                height: 2.56rem;
                width: 2.56rem;
                border-radius: 5px;
                overflow: hidden;
                background-color:#ccc;
                img{
                    width: 100%;
                    height: 100%;
                }
                img[lazy=loading] {
                    width:50%;
                    height:50%;
                    margin-left:25%;
                    margin-top:25%;
                }
            }
            .info-content{
                height: 2.6rem;
                margin-left:0.3rem;
                position:relative;
                .line{
                    color:#4b4b4b;
                    width: 100%;
                    .store-name{
                        font-size: 0.64rem;
                        margin-right: 0.3rem;
                        font-weight: bold;
                        white-space: nowrap;
                        display: inline-block;
                        overflow: hidden;
                    }
                    .store-distance{
                        font-size: 0.56rem;
                        color: #a2a2a2;
                        display: inline-block;
                        position:absolute;
                        right:0.3rem;
                        background-color:#fff;
                        padding-left:0.2rem;
                    }
                    .store-address{
                        white-space: nowrap;
                        display: inline-block;
                        font-size: 0.51rem;
                        margin-right: 0.3rem;
                        max-width: 15rem;
                        overflow: auto;
                    }
                    .store-phone{
                        font-size:0.51rem;
                        margin-right:0.3rem
                    }
                }
            }
        }

    }
</style>