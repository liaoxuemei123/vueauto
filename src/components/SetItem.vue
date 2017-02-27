<template>
    <div class="set-container" @click="onClick" flex="dir:top box:first">
        <div class="set-image">
            <div class="image-container">
                <img v-lazy="item.url">
            </div>
        </div>
        <div class="set-info" flex="dir:top cross:top box:mean">
            <div class="line">
                <span class="times">{{item.times}}</span>
                <span class="des1">{{item.des1}}</span>
            </div>
            <div class="line">
                <span class="des2">{{item.des2}}</span>
            </div>
            <div class="line">
                <span class="range">{{item.range}}</span>
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
                    return ;
                }
            }
        }
    }
</script>
<style scoped lang="less">
    .set-container{
        height:100%;
        width:100%;
        position:relative;
        .set-image{
            background-color:#ccc;
            .image-container{
                height:5.1rem;
                width:100%;
                position:relative;
                img{
                    width:100%;
                    height:100%;;
                }
                img[lazy=loading] {
                    position:absolute;
                    top:37.5%;
                    left:37.5%;
                    width:25%;
                    height:25%;
                }
            }
        }
        .set-info{
            height:1.2rem;
            padding:0.2rem 0.5rem;
            background-color:#fff;
            .times{
                font-size:0.43rem;
                color:#fff;
                background-color:#fc4c1d;
                padding:0rem 0.1rem;
                border-radius:0.1rem;
            }
            .des1{
                font-size:0.64rem;
                color:#333;
            }
            .des2{
                font-size:0.51rem;
                color:#333;
            }
            .range{
                color:#fc4c1d;
                width:100%;
            }
        }
    }
</style>