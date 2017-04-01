<template>
    <div class="page-container"><!-- 测试vue中封装swiper -->
        <div class="page swiper-page" flex="dir:top box:first">
            <nav-bar
                title="测试Swiper"
            />
            <div class="page-content">
                <swiper ref="myswiper">
                    <div class="swiper-slide">
                        <img src="http://service.mall.changan.com.cn/static/package/packageinfos_5_2.jpg" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="http://service.mall.changan.com.cn/static/package/packageinfos_5_1.jpg" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="http://service.mall.changan.com.cn/static/package/packageinfos_8_2.jpg" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="http://service.mall.changan.com.cn/static/package/packageinfos_8_1.jpg" alt="">
                    </div>
                </swiper>
            </div>
        </div>
    </div>
</template>
<script>
    //Swiper 测试文件
    import Swiper from '../components/Swiper';
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    export default {
        data () {
            return {
                orderList:[],
            }
        },
        components:{
            Swiper,
            NavBar,
        },
        activated:function(){
            this.$refs.myswiper.init();
        }
    }
</script>
<style lang="less" scoped>
    .page-container{
        height:100%;
        position:absolute;
        width:100%;
    }
    .page{
        height:100%;
        position:absolute;
        width:100%;
        .page-content{
            background-color: #efefef;
            height:100%;
            overflow: hidden;
            position:relative;
        }
    }
</style>