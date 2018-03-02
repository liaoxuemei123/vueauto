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
                                <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="http://mp.weixin.qq.com/s/GRSRXtl4w9T4Ky13uelWtQ">你的油耗总比别人高，问题出在这儿！</a></div>
                                <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="http://mp.weixin.qq.com/s/GRSRXtl4w9T4Ky13uelWtQ">你的油耗总比别人高，问题出在这儿！</a></div>
                                <div class="swiper-slide" flex="dir:left cross:center main:left"><a href="http://mp.weixin.qq.com/s/okvpE8rTOLhfLwIO-rNMmw">学会这几招，雨天行车心不慌！</a></div>
                            </swiper>
                        </div>
                        <div class="user-center" @click="userCenter" data-intro="点击图标查询订单详情">
                            <i class="iconfont icon-usercenter"></i>
                            <span class="unpay-order" v-if="orderUnPayCount > 0">{{orderUnPayCount > 9 ? orderUnPayCount : orderUnPayCount}}</span>
                        </div>
                    </div>
                    <div class="consult-tel" tel="tel:023-67595966" @click="stopPropagationA">咨询时间：9:00-21:00&nbsp;&nbsp;&nbsp;&nbsp;电话：<span class="    telnum" >023-67595966</span> </div>
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
    import { Toast, MessageBox } from 'mint-ui';
    import { mapMutations, mapState } from 'vuex';
    import Advert from '../components/Advert';
    import store from '../model';
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
                token:'',
                defauleCache:true,
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
                orderUnPayCount: ({
                    mixin
                }) => mixin.orderUnPayCount,
                config:({
                    packageinfo
                }) => packageinfo.config,

            })
        },
        methods:{
            stopPropagationA:function (event) {
                event.stopPropagation();
                // window.open(event.currentTarget.href);
                
                window.open(event.currentTarget.getAttribute("tel"), '_self');
            },
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
                Tool.get('wbinterface/getWbYwpzList',{flg:1,Qd:this.wbyQd},data => {
                    data.data.map( (v,i) => {
                        BISINESS_CONST.map((sv) => {
                            if(v.wbyId.indexOf(sv.wbyId) > -1) {
                                var wbArr = v.wbyId.split('-');
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
                    this.$nextTick(()=>{
                        if (this.manmodel.id) {
                            if(this.bisinessItems.length==1){
                                // if((this.bisinessItems[0].view=='CommercialSet' && this.manmodel.typeName == this.manmodel.typeName == '长安汽车') || (this.bisinessItems[0].view=='MinniSet' && this.manmodel.typeName == this.manmodel.typeName != '长安汽车')){
                                //     this.setModuleInfo({});
                                //     return;
                                // }else{
                                //     this.changeActive(0,false);
                                //     this.broadcast('xscroller','page',{oldVal:0,newVal:0});
                                // }
                            }
                            else if(this.manmodel.typeName != '长安汽车'){
                                this.changeActive(1,false);
                            }
                            else if(this.manmodel.typeName == '长安汽车'){
                                this.changeActive(0,false);
                            }
                        }
                    })
                })
            },
            ...mapMutations({
                setBisinessConfig: 'SET_CONFIG',
                reset: 'UPDATE_RESET',
                proSure: 'UPDATE_SURE',
                setStoreInfo: 'SET_STORE_INFO',
                updateUserInfo: 'UPDATE_USER_INFO',
                setRefereeStoreInfo: 'SET_REFEREE_STOREINFO',
                setModuleInfo: 'SET_MODULE_INFO',
                setQd:'SET_QD',
                addUservehicle: 'ADD_USERVEHICLE',
                hasgetedViheche: 'UPDATE_GETEDVEHICHE',
                updateOrderTip: 'UPDATE_ORDERTIP',
                setReceiptInfo: 'SET_RECEIPT_INFO',
                updateTwoTags:'UPDATE_TWOTAGS',
            })
        },
        created:function(){
            this.getBisinessList();
            // this.$nextTick(()=>{
            //     this.broadcast('swiper','init',{
            //         direction : 'vertical',
            //     })
            // })
            if($.isEmptyObject(this.modelInfo)) {
                this.manmodel = Tool.localItem('manmodel') ? JSON.parse(Tool.localItem('manmodel')):'';
                if((this.$route.query.wbyQd =="oushang"&& this.manmodel.typeName == '长安汽车') || (this.$route.query.wbyQd =="QJJFCJ"&&this.manmodel.typeName != '长安汽车')){
                    return;
                }
                if (this.manmodel.id) {
                    this.setModuleInfo(this.manmodel);
                }
            }
            // this.$nextTick(()=>{
            //     if(!Tool.localItem('agentLogo')&&Tool.localItem('wbyQd') && Tool.localItem('wbyQd')=='JJRFX'){
            //         MessageBox({
            //           title: '提示',
            //           message: '该推荐二维码已失效，但仍可正常购买，本订单视为无效推荐。'
            //         });
            //     }
            // })
        },
        activated:function(){
            if(Tool.localItem('isUserCenterBack')){
                this.manmodel = Tool.localItem('manmodel') ? JSON.parse(Tool.localItem('manmodel')):'';
                if(this.bisinessItems.length==1){
                    if (this.manmodel.id) {
                        if ((this.bisinessItems[0].view=='CommercialSet' && this.manmodel.typeName == '长安汽车') || (this.bisinessItems[0].view=='MinniSet' && this.manmodel.typeName != '长安汽车')) {
                            Tool.removeLocalItem('manmodel');
                        }
                        else{
                            this.setModuleInfo(this.manmodel);
                        }
                    }                    
                    // 不匹配就直接删除
                }
                else {
                    this.defauleCache = true;
                    this.manmodel = Tool.localItem('manmodel') ? JSON.parse(Tool.localItem('manmodel')):'';
                    if (this.manmodel.id) {
                        this.setModuleInfo(this.manmodel);
                    }
                }
                
            }
            this.manmodel = Tool.localItem('manmodel') ? JSON.parse(Tool.localItem('manmodel')):'';
            if (this.firstCache && Tool.localItem('isUserCenterBack')){
                this.$nextTick(()=>{
                    if (this.manmodel.id) {
                        if(this.bisinessItems.length==1){
                            // if((this.bisinessItems[0].view=='CommercialSet' && this.manmodel.typeName == this.manmodel.typeName == '长安汽车') || (this.bisinessItems[0].view=='MinniSet' && this.manmodel.typeName == this.manmodel.typeName != '长安汽车')){
                            //     this.setModuleInfo({});
                            //     return;
                            // }else{
                            //     this.changeActive(0,false);
                            //     this.broadcast('xscroller','page',{oldVal:0,newVal:0});
                            // }
                        }
                        else if(this.manmodel.typeName != '长安汽车'){
                            this.changeActive(1,false);
                        }
                        else if(this.manmodel.typeName == '长安汽车'){
                            this.changeActive(0,false);
                        }
                    }
                })
            }
            else if(!this.firstCache){
                // this.getBisinessList();
                this.$nextTick(()=>{
                    this.firstCache = true;
                    this.broadcast('swiper','init',{
                        direction : 'vertical',
                    })
                })
            }
            this.reset(true);
            this.proSure(false);
            this.setStoreInfo({});
            this.updateUserInfo({refereeType:'',referee:''});
            this.setRefereeStoreInfo({});
            Tool.removeLocalItem('selectCarData');
            Tool.removeLocalItem('isUserCenterBack');
            Tool.removeLocalItem('vehicleInfo');
            Tool.removeLocalItem('isSelectCarBack');
            this.hasgetedViheche(false);
            this.updateOrderTip(true);
            this.updateTwoTags(false);
            this.addUservehicle({});
            // this.setReceiptInfo({needReceipt:1,selectTitle:'0',receiver:'',receMobile:'',zip:'',selectAddr:'',addressCont:'',comName:'',receiptCode:''});
            this.token = Tool.localItem('userInfo') ? JSON.parse(Tool.localItem('userInfo')).token :'';


        },
        mounted:function(){
            this.bisinessItems.map((v,i)=>{
                v.route ? (this.$route.path == v.route ? this.activeBusiness = i : '') : '';
            })
            // 有则存，无则清空确保不会残留数据
            // if(this.$route.query.agentLogo){
            //     // this.setAgentLogo(this.$route.query.agentLogo);
            // }
            // // else this.setAgentLogo('');
            // console.log('mountedhhhhhhhhhhhhhhhhhhh');

            // if(this.$route.query.agentLogo){
            //     Tool.localItem('agentLogo',this.$route.query.agentLogo);
            // }
            // else Tool.removeLocalItem('agentLogo');
            // 不能随便删除
        },
        beforeRouteEnter: (to, from, next) => {
            var preTrue = false;
            if (to.query.tel) {

                // Tool.removeLocalItem('modelInfo');
                Tool.removeLocalItem('receiverInfo');
                Tool.removeLocalItem('selectCarData');
                Tool.removeLocalItem('vehicleInfo');
                Tool.removeLocalItem('manModelName');
                Tool.removeLocalItem('manModel');
                Tool.removeLocalItem('manmodelName');
                Tool.removeLocalItem('manmodel');
                Tool.removeLocalItem('userData');

                Tool.removeLocalItem('userInfo');
                var tel = to.query.tel;
                var vin = to.query.vin;
                var motorId = to.query.motorId;
                Tool.get('queryUserInfo',{
                    tel:tel
                },(data) => {
                    if(data.result != -1){
                        var userInfo = data.data;
                        userInfo.token = data.data.token;
                        Tool.localItem('userInfo',userInfo);
                        // next({path:'/maintainset'});
                        // var wbyQdtwo = 'weixin';
                        // next({path:'/maintainset', query:{wbyQd:String(wbyQdtwo)}});
                        if(to.query.wbyQd){
                            next({path:'/maintainset', query:{wbyQd:String(to.query.wbyQd)}});
                        }else{
                            if(to.query.hasOwnProperty('wbyQd')){
                                Tool.localItem('wbyQd','');
                            }
                            if(Tool.localItem('wbyQd')){
                                next({path:'/maintainset',query:{wbyQd:Tool.localItem('wbyQd')}});
                            }else{
                                next({path:'/maintainset'});
                            }
                        }  
                    }else{
                        Toast({
                            message:"用户登录过期了",
                            duration:1000,
                        })
                        Tool.localItem('wbyQd',to.query.wbyQd);
                        store.commit('POP_PAGE',1);//在进入login之前把已进栈但是没有被访问的页面清理出栈\
                        // next({name:'login',params:{to:to.path}});
                        next({name:'login'});
                    }
                });
            }
            else if (to.query.token) {   // have token 
                Tool.removeLocalItem('userInfo');
                // Tool.removeLocalItem('modelInfo');
                Tool.removeLocalItem('receiverInfo');
                Tool.removeLocalItem('selectCarData');
                Tool.removeLocalItem('vehicleInfo');
                Tool.removeLocalItem('manModelName');
                Tool.removeLocalItem('manModel');
                Tool.removeLocalItem('manmodelName');
                Tool.removeLocalItem('manmodel');
                Tool.removeLocalItem('userData');
                // this.addUservehicle({}); 
                // this.hasgetedViheche(false); //是否获取过默认车辆，置为初值
                // 这时候获取不到this

                var preToken = to.query.token; 
                var preOid = to.query.oid?to.query.oid:''; //if have oid
                Tool.get('queryUserInfo',{
                    userToken:preToken,oid:preOid
                },(data) => {
                    if(data.result != -1){
                        var userInfo = data.data;
                        userInfo.token = data.data.token;
                        Tool.localItem('userInfo',userInfo);
                        // next({path:'/maintainset'});
                        // var wbyQdtwo = 'weixin';
                        // next({path:'/maintainset', query:{wbyQd:String(wbyQdtwo)}});
                        if(to.query.wbyQd){
                            next({path:'/maintainset', query:{wbyQd:String(to.query.wbyQd)}});
                             // next(); 
                        }else{
                            if(to.query.hasOwnProperty('wbyQd')){
                                Tool.localItem('wbyQd','');
                            }
                            if(Tool.localItem('wbyQd')){
                                next({path:'/maintainset',query:{wbyQd:Tool.localItem('wbyQd')}});
                            }else{
                                next({path:'/maintainset'});
                            }
                        }  
                    }else{
                        Toast({
                            message:"用户登录过期了",
                            duration:1000,
                        })
                        Tool.localItem('wbyQd',to.query.wbyQd);
                        store.commit('POP_PAGE',1);//在进入login之前把已进栈但是没有被访问的页面清理出栈\
                        // next({name:'login',params:{to:to.path}});
                        next({name:'login'});
                    }
                });
            }
            else{
                if(to.query.wbyQd){
                    // create的时候渠道存在了本地
                    if (to.query.wbyQd == 'JJRFX'&&to.query.agentLogo) {
                        Tool.get('agentStatusQuery',{
                            oid:to.query.agentLogo
                        },(data) => {
                            if (data.code==0) { // 依旧有效
                                Tool.localItem('agentLogo',to.query.agentLogo);
                                next({path:'/maintainset',query:{wbyQd:String(to.query.wbyQd)}});

                            }
                            else{  // 二维码已失效
                                Tool.removeLocalItem('agentLogo');
                                MessageBox({
                                  title: '提示',
                                  message: '该推荐二维码已失效，但仍可正常购买，本订单视为无效推荐。'
                                });
                                next({path:'/maintainset',query:{wbyQd:String(to.query.wbyQd)}});

                                // MessageBox({
                                //   title: '提示',
                                //   message: '该经纪人的二维码已失效，无法获得推荐订单，不影响用户下单'
                                // });
                                // Toast({
                                //     message:"该经纪人的二维码已失效，无法获得推荐订单，不影响用户下单",
                                //     duration:2000,
                                // })
                            }
                        });
                    }
                    else if(to.query.wbyQd != 'JJRFX') {
                        Tool.removeLocalItem('agentLogo');
                        next();
                    }
                    else next();
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
                    width:50%;
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
                .telnum{
                    display:inline-block;
                    color:blue;
                    text-decoration:underline;
                }
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
                    background-color:#fff;
                    line-height:1.9rem;
                    text-align:center;
                    position:relative;
                    i.iconfont{
                        font-size: 1.2rem;
                        border-radius: 1.6rem;
                        color: #fff;
                        padding: 0.2rem;
                        background-color:#00bffe;
                    }
                    .unpay-order{
                        position:absolute;
                        color:#fff;
                        background-color:#ed3f14;
                        line-height:1.3em;
                        padding:0 0.3em;
                        right:0.2rem;
                        top:0.2rem;
                        border-radius:1.2em;
                        font-size:0.47rem;
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