<template>
    <div class="swiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="mini-pagination"></div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
    import 'swiper';
    import '../style/swiper.css';
    import Tool from '../utils/Tool';
    export default {
        data () {
            return {
                mySwiper:{},
                setting:{
                    autoplay:5000,
                    pagination:'.mini-pagination',
                    active:0,
                }
            }
        },
        componentName:"swiper",
        created:function(){
            this.$on("init",this.init)
        },
        methods:{
            init:function(options){
                if(!$.isEmptyObject(this.mySwiper)) {
                    this.mySwiper.destroy && this.mySwiper.destroy();
                };
                this.extrace(options);//加载额外的配置
                this.mySwiper = new Swiper(this.$el,this.setting);
            },
            extrace:function(options){
                for(var attr in options){
                    this.setting[attr] = options[attr];
                }
            }
        },
        destroyed:function(){
            this.mySwiper.destroy();//销毁swiper对象
        }
    }
</script>
<style lang="less">
    .swiper{
        position:relative;
        .mini-pagination{
            position:absolute;
            left:0rem!important;
            bottom:-2.4rem;
            transform:translate3d(0,-50%,0);
            .swiper-pagination-bullet{
                height:0.2rem;
                width:0.2rem;
            }
            .swiper-pagination-bullet-active{
                background-color:#00bffe;
            }
        }
    }
</style>