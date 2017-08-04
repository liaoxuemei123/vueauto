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
                            <component :is="currentView"></component>
                        </keep-alive>
                    </transition>
                </div>
                <div class="bottom">
                    <div class="bottom-banner" flex="dir:left box:last cross:center">
                        <div class="banner">
                            <swiper>
                                <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="http://mp.weixin.qq.com/s/KkjnWh9CEmtkgqn5Plp1zQ">爱车保养 | 立夏保养的正确方式是...</a></div>
                                <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="http://mp.weixin.qq.com/s/GRSRXtl4w9T4Ky13uelWtQ">你的油耗总比别人高，问题出在这儿！</a></div>
                                <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="http://mp.weixin.qq.com/s/okvpE8rTOLhfLwIO-rNMmw">学会这几招，雨天行车心不慌！</a></div>
                            </swiper>
                        </div>
                        <div class="user-center" @click="userCenter" data-intro="订单可在个人中心查看"><i class="iconfont icon-usercenter"></i></div>
                    </div>
                    <div class="consult-tel">咨询时间：9:00-21:00&nbsp;&nbsp;&nbsp;&nbsp;电话：<a href="tel:023-67595966">023-67595966</a> </div>
                </div>
            </div>
        </div>
        <div class="first-animate" v-if="firstAnimate">
            <div class="animate-mask">

            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Xscroller from '../components/Xscroller';
    import Swiper from '../components/Swiper';
    import emmiter from '../mixins/emmiter';
    import Tool from '../utils/Tool';
    import MinniSet from './home/MiniSet';
    import CommercialSet from './home/CommercialSet';
    import Subscribe from './home/Subscribe';
    import { mapMutations, mapState } from 'vuex';
    import Advert from '../components/Advert';
    const BISINESS_CONST = [
        {
            wbyId:'wcby',
            name:"保养套餐",
            wbyName:"微车保养",
            icon:require('../assets/changan_wc.png'),
            view:"MinniSet",
            type:1,
        },{
            wbyId:'scby',
            name:"保养套餐",
            wbyName:"商车保养",
            icon:require('../assets/changan_sy.png'),
            view:"CommercialSet",
            type:2,
        }
    ];
    export default{
        data () {
            return {
                bisinessItems:[],
                activeBusiness:0,
                mode:'push',
                currentView:'',
                firstAnimate: false,
            }
        },
        mixins: [emmiter],
        components:{
            NavBar,
            Xscroller,
            Swiper,
            CommercialSet,
            MinniSet,
            Subscribe,
            Advert
        },
        computed:{
            ...mapState({
                wbyQd: ({
                    pageconfig
                }) => pageconfig.qd,
            })
        },
        methods:{
            changeActive:function(index, reset) {
                const oldVal = this.activeBusiness;
                this.activeBusiness = index;
                if(oldVal < index) {
                    this.mode = 'left';
                    reset && this.setModuleInfo({});
                }
                if(oldVal > index) {
                    this.mode = 'right';
                    reset && this.setModuleInfo({});
                }
                if(this.bisinessItems[index].view){
                    this.currentView = this.bisinessItems[index].view;
                }
                if(this.bisinessItems.length < 3) return;
                this.broadcast('xscroller','page',{oldVal:oldVal,newVal:index});
            },
            userCenter:function() {
                this.$router.push({name:'usercenter'});
            },
            getBisinessList:function() {
                var qd = this.$route.query.wbyQd;
                if(qd != 'undefined' && !!qd){
                    this.setQd(qd);
                    Tool.localItem('wbyQd',qd);
                }else{
                    qd = Tool.localItem('wbyQd');
                    if(qd){
                        this.setQd(qd);
                    }
                }
                Tool.get('wbinterface/getWbYwpzList',{flg:1},data => {
                    data.data.map( (v,i) => {
                        BISINESS_CONST.map((sv) => {
                            if(v.wbyId.indexOf(sv.wbyId) > -1) {
                                var wbArr = v.wbyId.split('-');
                                if(this.wbyQd){
                                    if(wbArr.length > 1 && wbArr[1] == this.wbyQd && this.wbyQd){
                                        sv = Object.assign(sv,v);
                                        this.bisinessItems.push(sv);
                                    }
                                }else if(wbArr.length == 1){
                                    sv = Object.assign(sv,v);
                                    this.bisinessItems.push(sv);
                                }
                            }
                            this.$nextTick(()=>{
                                this.broadcast('xscroller','init');
                                this.currentView = this.bisinessItems[0].view;
                            })
                        })
                    })
                    this.setBisinessConfig(data.data);
                })
            },
            ...mapMutations({
                setBisinessConfig: 'SET_CONFIG',
                reset: 'UPDATE_RESET',
                setStoreInfo: 'SET_STORE_INFO',
                updateUserInfo: 'UPDATE_USER_INFO',
                setRefereeStoreInfo: 'SET_REFEREE_STOREINFO',
                setModuleInfo: 'SET_MODULE_INFO',
                setQd:'SET_QD',
            })
        },
        created:function(){
            this.getBisinessList();
            this.$nextTick(()=>{
                this.broadcast('swiper','init',{
                    direction : 'vertical',
                })
            })
        },
        activated:function(){
            this.reset(true);
            this.setStoreInfo({});
            this.updateUserInfo({refereeType:'',referee:''});
            this.setRefereeStoreInfo({});
        },
        mounted:function(){
            this.bisinessItems.map((v,i)=>{
                v.route ? (this.$route.path == v.route ? this.activeBusiness = i : '') : '';
            })
        },
        beforeRouteEnter: (to, from, next) => {
            if(to.query.wbyQd){
                next();
            }else{
                if(to.query.hasOwnProperty('wbyQd')){
                    Tool.localItem('wbyQd','');
                }
                if(Tool.localItem('wbyQd')){
                    next({path:'/maintainset',query:{wbyQd:Tool.localItem('wbyQd')}});
                }else{
                    next();
                }
            }  
        }
    }
</script>
<style lang="less" scoped>
    .page-container{
        height:100%;
        position:absolute;
        width:100%;  
        .first-animate{
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            z-index:9999;
            .animate-mask{
                position:absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                background-color:rgba(0,0,0,0.3);
            }
        }
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
                z-index: 10000;
                border-bottom: 1px solid #ccc;
            }
            .bisiness-list{
                width:100%;
                height:1.5rem;
                line-height:1.5rem;
                background-color:#fff;
                .bisiness-item{
                    width:8rem;
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
            .consult-tel{
                background-color:#fff;
                height:1rem;
                line-height:1rem;
                padding:0rem 3%;
                border-top:1px solid #efefef;
                text-align:left;
            }
            .bottom-banner{
                height:1.9rem;
                background-color:#fff;
                margin-top:1px;
                border-top:1px solid #ccc;
                z-index:10;
                width:97%;
                padding:0 0 0 3%;
                overflow:hidden;
                .user-center{
                    height:1.9rem;
                    width:1.9rem;
                    background-color:#54d2fc;
                    line-height:1.9rem;
                    text-align:center;
                    i.iconfont{
                        font-size:1rem;
                        color:#fff;
                    }
                }
                .banner{
                    height:100%;
                    .swiper-slide{
                        height:0.634rem;
                        text-align:left;
                        padding-left:0.5rem;
                        font-size:0.67rem;
                        a{
                            color:#ff9900;
                        }
                        a:visited{
                            color:#19be6b;
                        }
                    }
                }
            }
        }
    }
</style>