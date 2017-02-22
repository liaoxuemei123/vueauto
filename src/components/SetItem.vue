<template>
    <div class="set-container" :style="{'background-image':'url(' + item.url + ')'}">
        <div class="set-info" flex="dir:top cross:top box:mean">
            <div class="line">
                <span class="car-type">{{item.carType}}</span>
                <span class="car-name">{{item.carName}}</span>
            </div>
            <div class="line">
                <span class="set-name">{{item.setName}}</span>
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
            }
        }
    }
</script>
<style scoped lang="less">
    .set-container{
        height:100%;
        width:100%;
        background-position:top center;
        background-repeat:no-repeat;
        background-size:60%;
        background-blend-mode:multiply;
        position:relative;
        .set-info{
            position:absolute;
            bottom:0;
            height:1.6rem;
            margin:0.6rem 0.5rem;
            .car-type{
                font-size:0.43rem;
                color:#fff;
                background-color:#fc4c1d;
                padding:0rem 0.1rem;
                border-radius:0.1rem;
            }
            .car-name{
                font-size:0.64rem;
                color:#333;
            }
            .set-name{
                font-size:0.51rem;
                color:#333;
            }
        }
    }
</style>