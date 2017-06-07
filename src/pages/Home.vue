<template>
    <div class="page-container">
        <div class="page home-page" flex="dir:top">
            <div class="page-content" flex="dir:top box:justify">
                <div class="tbbar" flex="dir:left cross:center">
                    <div class="bisiness-list">
                        <xscroller>
                            <div class="bisiness-item x-item" v-tap="changeActive.bind(this,index)" :class="{'active':activeBusiness == index}" v-for="(item,index) in bisinessItems" flex="dir:left cross:center main:center">
                                <i class="icon-image" v-if="item.icon" :style="{'background-image':'url('+item.icon+')'}"></i>{{item.name}}
                            </div>
                        </xscroller>
                    </div>
                </div>
                <div class="tab-content">
                    <transition :name="mode">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </div>
                <div class="bottom-banner" flex="dir:left box:first cross:center">
                    <div class="user-center" @click="userCenter"><i class="iconfont icon-usercenter"></i></div>
                    <div class="banner">
                        <swiper>
                            <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="">更多精彩活动等你来！</a></div>
                            <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="">十三亿人看了都沉默了</a></div>
                            <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="">长安商城福利</a></div>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Xscroller from '../components/Xscroller';
    import Swiper from '../components/Swiper';
    import emmiter from '../mixins/emmiter';
    export default{
        data () {
            return {
                bisinessItems:[{
                    name:"保养套餐",
                    icon:require('../assets/changan_wc.png'),
                    route:"/home/miniset",
                    type:1,
                },{
                    name:"保养套餐",
                    icon:require('../assets/changan_sy.png'),
                    route:"/home/commercialset",
                    type:2,
                },{
                    name:"预约保养",
                    icon:'',
                    type:3,
                },{
                    name:"万友合作",
                    icon:'',
                    type:3,
                }],
                activeBusiness:0,
                mode:'push',
            }
        },
        mixins: [emmiter],
        components:{
            NavBar,
            Xscroller,
            Swiper
        },
        methods:{
            changeActive:function(index) {
                const oldVal = this.activeBusiness;
                this.activeBusiness = index;
                if(oldVal < index) {
                    this.mode = 'left';
                }
                if(oldVal > index) {
                    this.mode = 'right'
                }
                if(this.bisinessItems[index].route){
                    this.$router.push(this.bisinessItems[index].route);
                }
                this.broadcast('xscroller','page',{oldVal:oldVal,newVal:index});
            },
            userCenter:function() {
                this.$router.push({name:'usercenter'});
            }
        },
        activated:function(){
            this.broadcast('xscroller','init');
            this.broadcast('swiper','init',{
                direction : 'vertical',
            })
        },
        mounted:function(){
            this.bisinessItems.map((v,i)=>{
                v.route ? (this.$route.path == v.route ? this.activeBusiness = i : '') : '';
            })
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
            overflow: auto;
            .tbbar{
                z-index: 10;
                border-bottom: 1px solid #ccc;
            }
            .bisiness-list{
                width:100%;
                height:1.5rem;
                line-height:1.5rem;
                background-color:#fff;
                .bisiness-item{
                    width:5.4rem;
                    float:left;
                    color:#333;
                    &.active{
                        color:#00bffe;
                    }
                    .icon-image{
                        width:1.1rem;
                        height:1.2rem;
                        background-size:cover;
                    }
                }
            }
            .tab-content{
                position:relative;
            }
            .bottom-banner{
                height:1.9rem;
                background-color:#fff;
                z-index:10;
                margin-top:1px;
                border-top:1px solid #ccc;
                width:94%;
                padding:0 3%;
                .user-center{
                    height:1.6rem;
                    border-radius:0.8rem;
                    background-color:#54d2fc;
                    i.iconfont{
                        font-size:1rem;
                        color:#fff;
                        &:before{
                            padding:0.3rem;
                            position:relative;
                            top:0.15rem;
                        }
                    }
                }
                .banner{
                    height:100%;
                    margin-left:0.3rem;
                    .swiper-slide{
                        height:0.634rem;
                        text-align:left;
                        font-size:0.67rem;
                    }
                }
            }
        }
    }
</style>