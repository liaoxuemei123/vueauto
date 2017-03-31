<template>
    <div class="swiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import 'swiper';
    import '../style/swiper.css';
    import Vue from 'vue';
    export default {
        data () {
            return {
                mySwiper:{}
            }
        },
        methods:{
            init:function(options){
                this.mySwiper = new Swiper('.swiper',{
                    zoom:true,
                })
            }
        },
    }
</script>
<style lang="less" scoped>
    
</style>