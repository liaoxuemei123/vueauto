<template>
    <div class="advert-container">
        <div class="advert-mask">
        
        </div>
        <div class="advert-content">
            <slot name="advert" class="advert"></slot>
            <slot name="bottom" class="bottom"></slot>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .advert-container{
        width:100%;
        height:100%;
        position:absolute;
        .advert-mask{
            width:100%;
            height:100%;
            background-color:rgba(0,0,0,0.5);
            position:absolute;
            z-index:10001;
        }
        .advert-content{
            width:13rem;
            height:18rem;
            position:absolute;
            top:50%;
            left:50%;
            transform:translate3d(-50%,-50%,0);
            z-index:10003;
            border-radius:5px;
            background-color:rgba(240,240,240,1);
            overflow:hidden;
            position:relative;
            border:1px solid #999;
            .advert{
                position:absolute;
                left:0;
                right:0;
                bottom:0rem;
                top:0;
                img{
                    width:100%;
                    height:100%;
                }
            }
            // .bottom{
            //     position:absolute;
            //     bottom:0;
            //     height:2rem;
            //     width:100%;
            //     background-color:#54d2fc;
            //     line-height:2rem;
            //     color:#fff;
            //     font-size:0.58rem;
            //     text-align:center;
            // }
        }
    }
</style>
<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>