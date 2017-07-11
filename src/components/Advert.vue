<template>
    <div class="advert-container">
        <div class="advert-mask">
        
        </div>
        <div class="advert-content">
            <slot class="advert"></slot>
            <div class="bottom"></div>
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
            background-color:rgba(255,255,255,0.1);
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
            background-color:rgba(240,240,240,0.9);
            overflow:hidden;
            position:relative;
            border:1px solid #999;
            box-shadow:0.5rem 0.5rem 1rem #aaa;
            .advert{
                position:absolute;
                left:0;
                right:0;
                bottom:2rem;
                top:0;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .bottom{
                position:absolute;
                bottom:0;
                height:2rem;
                width:100%;
                background-color:#54d2fc;
            }
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