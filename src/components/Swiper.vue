<template>
    <div class="swiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
    import 'swiper';
    import '../style/swiper.css';
    export default {
        data () {
            return {
                mySwiper:{},
                setting:{
                    autoplay:5000,
                    pagination:'.swiper-pagination',
                }
            }
        },
        componentName:"swiper",
        created:function(){
            this.$on("init",this.init)
        },
        methods:{
            init:function(options){
                if(!$.isEmptyObject(this.mySwiper)) return false;
                this.extrace(options);//加载额外的配置
                this.mySwiper = new Swiper('.swiper',this.setting);
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
        padding-right:0.5rem;
        .swiper-pagination{
            position:absolute;
            right:0rem!important;
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