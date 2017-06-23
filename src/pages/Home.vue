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
                                <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="">更多精彩活动等你来！</a></div>
                                <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="">十三亿人看了都沉默了</a></div>
                                <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="">长安商城福利</a></div>
                            </swiper>
                        </div>
                        <div class="user-center" @click="userCenter"><i class="iconfont icon-usercenter"></i></div>
                    </div>
                    <div class="consult-tel">工作时间：9:00-22:00&nbsp;&nbsp;&nbsp;&nbsp;咨询电话：<a href="tel:023-67595966">023-67595966</a> </div>
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
    import Tool from '../utils/Tool';
    import MinniSet from './home/MiniSet';
    import CommercialSet from './home/CommercialSet';
    import Subscribe from './home/Subscribe';
    import { mapMutations } from 'vuex';
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
            }
        },
        mixins: [emmiter],
        components:{
            NavBar,
            Xscroller,
            Swiper,
            CommercialSet,
            MinniSet,
            Subscribe
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
                Tool.get('wbinterface/getWbYwpzList',{flg:1},data => {
                    data.data.map( (v,i) => {
                        BISINESS_CONST.map((sv) => {
                            if(v.wbyId === sv.wbyId) {
                                sv = Object.assign(sv,v);
                                this.bisinessItems.push(sv);
                            }
                            this.$nextTick(()=>{
                                this.broadcast('xscroller','init');
                                this.currentView = this.bisinessItems[0].view;
                            })
                        })
                    })
                    this.setBisinessConfig(data.data);
                    console.log(this.bisinessItems[0]);
                })
            },
            ...mapMutations({
                setBisinessConfig: 'SET_CONFIG',
                reset: 'UPDATE_RESET',
                setStoreInfo: 'SET_STORE_INFO',
                updateUserInfo: 'UPDATE_USER_INFO',
                setRefereeStoreInfo: 'SET_REFEREE_STOREINFO',
                setModuleInfo: 'SET_MODULE_INFO',
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
            console.log(this.bisinessItems);
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
                text-align:right;
            }
            .bottom-banner{
                height:1.9rem;
                background-color:#fff;
                margin-top:1px;
                border-top:1px solid #ccc;
                z-index:10;
                width:94%;
                padding:0 3%;
                overflow:hidden;
                .user-center{
                    height:1.6rem;
                    width:1.6rem;
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
                    .swiper-slide{
                        height:0.634rem;
                        text-align:left;
                        padding-left:0.5rem;
                        font-size:0.67rem;
                    }
                }
            }
        }
    }
</style>