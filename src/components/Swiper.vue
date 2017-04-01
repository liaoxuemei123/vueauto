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
                mySwiper:{},
                setting:{
                    zoom:true,
                    zoomToggle:true,
                }
            }
        },
        methods:{
            init:function(options){
                if(!$.isEmptyObject(this.mySwiper)) return false;
                this.extrace(options);//加载额外的配置
                this.mySwiper = new Swiper('.swiper',setting)
            },
            extrace:function(options){
                for( attr in options){
                    this.setting[attr] = options[attr];
                }
            }
        },
        destroyed:function(){
            this.mySwiper.destroy();//销毁swiper对象
        }
    }
</script>
<style lang="less" scoped>
    
</style>