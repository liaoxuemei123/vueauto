<template>
    <div class="page-container">
        <div class="index-page page" flex="dir:top box:justify">
            <nav-bar 
                title="经纪人认证"
                :onRight="onRight"
                rightContent="说明"
            />
            <div class="page-content">
                <div class="input-control" v-if="!hasCode">
                    <inp-com title="姓名" type="text" placeholder="请输入姓名"  :onBlur="updateName.bind(this)"  :value="name"/>
                </div>
                <div class="input-control" v-if="!hasCode">
                    <inp-com title="手机号码" type="tel" placeholder="请输入手机号码"  :onBlur="updatePhone.bind(this)"  :value="phone" maxlength="11" />
                </div>
                <div class="input-control" v-if="!hasCode">
                    <inp-com title="身份证" type="text" placeholder="请输入身份证" :onBlur="updateId.bind(this)" :value="idCard" maxlength="18" />
                </div>
                <div class="input-control" v-if="!hasCode">
                    <inp-com title="开户行" type="text" placeholder="请输入开户行" :onBlur="updateBank.bind(this)" :value="bank"/>
                </div>
                <div class="input-control" v-if="!hasCode">
                    <inp-com title="开户行卡号" type="tel" placeholder="请输入开户行卡号" :onBlur="updateCardNumber.bind(this)" maxlength="19" :value="cardNumber"/>
                </div>
                <div class="input-control" v-if="!hasCode" @click="cityShow = !cityShow" style="position:relative;">
                    <inp-com title="开户行省市" type="text" placeholder="请选择开户行省市" readonly :value="addr"/>
                    <span style="position:absolute;right:0.2rem;top: 0.6rem;">  
                        <i class="iconfont icon-up" v-if="cityShow"></i>
                        <i class="iconfont icon-down" v-else="cityShow"></i>
                    </span>
                </div>
                <!-- <div class="qrCode" v-if="hasCode" style="position:relative;">
                    
                    <div class="box" v-if="hasCode">
                        
                        <img :src="qrCodeStr" alt="">
                    </div>
                </div> -->
                <div class="qrCode" v-if="hasCode" style="position:relative;">
                    <div style="text-align: center;font-size: 1rem;color:white;position:absolute;top:0.1rem;width: 100%;"  @click="myrecommendorder"><i style="text-decoration: underline">查看我的推荐订单</i></div>
                    <div class="box" v-if="hasCode">
                        <div style="text-align: center;font-size: 1rem;color:white;position:absolute;top:-1.25rem;width: 100%;"><div>我的推荐二维码</div></div>
                        <img :src="qrCodeStr" alt="">
                    </div>
                </div>
            </div>
            
            <div class="button-control" v-show="!hasCode">
                <btn-com
                    title="确定"
                    :onClick="sureCert"
                    background="#00bffe"
                />
            </div>
        </div>
        <transition name="fade">
            <div class="down-list-mask" v-if="cityShow" @click="cityShow=false"></div>
        </transition>
        <transition name="slide-up">
            <div class="down-list" v-show="cityShow">
                <div class="toolbar" flex="dir:left box:mean">
                    <div class="cancel" @click="cityShow=false" flex="dir:left cross:center main:left">
                        取消
                    </div>
                    <div class="sure" @click="selectCity" flex="dir:left cross:center main:right">
                        确定
                    </div>
                </div>
                <mt-picker :slots="citylist" @change="onCityChange" valueKey="name"></mt-picker>
            </div>
        </transition>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import BtnCom from '../components/BtnCom';
    import InpCom from '../components/InpCom';
    import { mapMutations, mapState } from 'vuex';
    import Tool from '../utils/Tool';
    import { Indicator, Toast, MessageBox } from 'mint-ui';
    import store from '../model';
    export default{
        data () {
            return {
                name:'',
                phone:'',
                idCard:'',
                cardNumber:'',
                addr:'',
                city:'',
                province :'',
                bank:'',
                hasCode:false,
                qrCodeStr:'',
                dealerId:'',
                cityShow:false,
                citylist:[
                    {
                        flex:1,
                        defaultIndex:0,
                        values:[],
                        className:'province',
                    },{
                        divider:true,
                        content:'-'
                    },{
                        flex:1,
                        values:[],
                        className:'city'
                    }
                ],
                cityData:{},
                cityInfo:{},
                defaultLocation:'',
                isSelect:false,
            }
        },
        computed:{
            ...mapState({
                subscribeInfo:({
                    subscribe
                }) => subscribe,
            })
        },
        filters:{
            mileFilter:function(val){
                val = (val + '').replace(/[a-zA-Z]/g,'');
                if(val){
                    return val + 'KM';
                }else{
                    return val;
                }
            }
        },
        mounted:function(){
            
        },
        activated:function(){
            // 进入页面先获取是否通过认证，没有才显示填写
            var self = this;
            var oid = Tool.localItem('oid')?Tool.localItem('oid'):Tool.getUserInfo('oid');
            Tool.get('agentIdentQuery',{
                oid:oid
            },(data) => {
                if(data.code == 0){
                 // 未认证

                    self.hasCode=false;
                    self.getCityList(()=>{
                        self.citylist[0].values = self.cityData.provinces;
                        self.citylist[2].values = self.cityData.citys[0];
                    });
                    self.cityInfo = {};
                    // self.addr = '';
                    // this.defaultLocation = this.geolocation.address.province + ' ' + this.geolocation.address.city;
                }else{
                    // 'https://cloud.mall.changan.com.cn/maintainpackage/#/maintainset&agentLogo='
                    var Str = encodeURIComponent("http://47.92.32.44:9990/maintainpackage/#/maintainset?wbyQd=JJRFX&agentLogo="+data.data);
                    this.qrCodeStr = "http://pan.baidu.com/share/qrcode?w=301&h=301&url="+Str;
                    this.hasCode=true;
                    // code == 1
                }
            });
        },
        created:function(){

        },
        beforeRouteEnter:(to,from,next)=>{
            // dealerId（认证用） 清除缓存 oid（已认证的情况下直接查看）
            if (to.query.dealerId) {
                Tool.localItem('dealerId',to.query.dealerId);
            }else{
                if (from.name=='login' || from.name=='myrecorder' || from.name=='agentexplain' || !from.name) {}
                else Tool.removeLocalItem('dealerId');
            }
            if (to.query.oid) { //如果有单独传的oid则表示由管理那面直接跳过来不用管其他
                Tool.localItem('oid',to.query.oid);
                // var tempInfo = JSON.parse(Tool.localItem('userInfo'));
                // tempInfo.oid = to.query.oid;
            }
            else {
                if (from.name=='myrecorder' || from.name=='agentexplain' || !from.name) {}
                else Tool.removeLocalItem('oid');
            }
            if (to.query.huncun) {  //直接去重新登录
                Tool.removeLocalItem('userInfo');
                Tool.removeLocalItem('userData');
                // Tool.removeLocalItem('oid');
                // 记得将dealerid传过去
            }
            Tool.routerEnter(to,from,next);
        },
        methods:{
            myrecommendorder:function() {
                this.$router.push({name:'myrecorder'});
            },
            onRight:function(){
                var me = this;
                // MessageBox({
                //   title: '说明',
                //   message: '<p style="text-indent:1rem;">推荐人通过实名认证后，将获取专属保养套餐推荐二维码，被推荐人通过该二维码成功购买且7日内未退款，推荐人将获取一定的现金奖励，奖励标准50元/单，活动时间2017年12月1日至2017年12月31日。激励通过为次月发放上月推荐人需正确填写各项实名认证信息，该信息将作为现金发放的依据。如因信息错误，导致奖励发放有误，由推荐人自行负责。</p>',
                // });
                this.$router.push({name:'agentexplain'});
                
            },
            onCityChange:function(picker,values){
                if(values[1]){
                    if(!values[0]){
                        this.cityInfo.province = this.cityData.provinces[0].name;
                        values[0] = {};
                        values[0].name = this.cityData.provinces[0].name
                        values[0].index = 0;
                    }else{
                        this.cityInfo.province = values[0].name;
                    }
                    this.cityInfo.city = values[1].name;
                    // this.cityInfo.code = values[1].id;
                    picker.setSlotValues(1,this.cityData.citys[values[0].index]);
                }
            },
            selectCity:function(){
                this.isSelect = true;
                if(!this.cityInfo.province){
                    this.cityInfo.province = this.cityData.provinces[0].name;
                    this.cityInfo.city = this.cityData.citys[0][0].name;
                    // this.cityInfo.code = this.cityData.citys[0][0].id;
                }
                this.addr = this.cityInfo.province + ' ' + this.cityInfo.city;
                this.city = this.cityInfo.city;
                this.province = this.cityInfo.province;
                this.cityShow = false;
            },
            getCityList:function(callback){
                var self = this;
                Tool.get("getCitys",{},(data)=>{
                    var provinceList = [];
                    for(var i=0;i<data.data.length;i++){
                        provinceList.push({name:data.data[i].province,index:i})
                    }
                    var cityList = [];
                    for(var i=0;i<data.data.length;i++){
                        cityList[i] = [];
                        for(var j=0;j<data.data[i].city.length;j++){
                            cityList[i].push({name:data.data[i].city[j]})
                        }
                    }
                    var param = {
                        provinces:provinceList,
                        citys:cityList
                    }
                    self.cityData = param;
                    callback && callback();
                })
            },
            updateName:function(e){
                var target = $(e.target);
                this.name = target.val();
            },
            updatePhone:function(e){
                var target = $(e.target);
                this.phone = target.val();
            },
            updateId:function(e){
                var target = $(e.target);
                this.idCard = target.val();
            },
            updateCardNumber:function(e){
                var target = $(e.target);
                this.cardNumber = target.val();
            },
            updateBank:function(e){
                var target = $(e.target);
                this.bank = target.val();
            },
            sureCert:function(){
                var self = this;
                var data = {};
                if (Tool.localItem('dealerId')) {
                    this.dealerId = Tool.localItem('dealerId');
                }
                data.dealerId = this.dealerId;
                data.name = this.name;
                data.phone = this.phone;
                data.idCard = this.idCard;
                data.cardNumber = this.cardNumber;
                data.addr = this.addr;
                data.city = this.city;
                data.province = this.province;
                data.bank = this.bank;
                if(!data.name){
                    Toast({
                        message:'请输入姓名',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                
                if(!data.phone){
                    Toast({
                        message:'请输入电话号码',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!(/^1\d{10}$/.test(data.phone))){
                    Toast({
                        message:'手机号码不正确',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.idCard){
                    Toast({
                        message:'请输入身份证号',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                var isID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
                if(isID.test(data.idCard) === false) 
                { 
                    Toast({
                        message:'身份证输入不合法',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.bank){
                    Toast({
                        message:'请输入开户行',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.cardNumber){
                    Toast({
                        message:'请输入开户行卡号',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                var iscard = /^[1-9]\d{15,18}$/;
                if(iscard.test(data.cardNumber) === false) 
                { 
                    Toast({
                        message:'开户行卡号输入不合法',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.addr){
                    Toast({
                        message:'请选择开户行省市',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                
                data.oid = Tool.localItem('oid')?Tool.localItem('oid'):Tool.getUserInfo('oid');
                // data.userId = Tool.getUserInfo('userId');
                Tool.get('agentIdent',{
                    name:data.name,
                    phone:data.phone,
                    idCard:data.idCard,
                    cardNumber:data.cardNumber,
                    city:data.city,
                    province:data.province,
                    bank:data.bank,
                    oid:data.oid,
                    dealerId:data.dealerId,
                },(data) => {
                    if(data.code == 200){
                        Toast({
                            message:'认证完成',
                            duration:1000,
                        });


                        // 'https://cloud.mall.changan.com.cn/maintainpackage/#/maintainset&agentLogo='
                        var Str = encodeURIComponent("http://47.92.32.44:9990/maintainpackage/#/maintainset?wbyQd=JJRFX&agentLogo="+data.data);
                        this.qrCodeStr = "http://pan.baidu.com/share/qrcode?w=301&h=301&url="+Str;
                        this.hasCode=true;
                    }else{
                        this.hasCode=false;
                        Toast({
                            message:data.msg,
                            duration:1000,
                        });
                    }
                });
                // 
                
            },
            ...mapMutations([
                'updateSubscribeInfo',
            ])
        },
        deactivated:function(){
            this.cityInfo.code = '';
            this.cityShow = false;
            this.isSelect = false;
        },
        // beforeRouteLeave:function(to,from,next){
        //     if(!Tool.localItem('userCache')&&(to.name == 'orderhistory' || to.path == '/orderhistory' || to.name == 'selectplate' || to.path == '/selectplate' ||to.name == 'storeorder' || to.path == '/storeorder')){
        //         Toast({
        //             message:'用户登录过期了',
        //             duration:1000,
        //         });
        //         return;
        //     }
        //     else{
        //         next();
        //     }
        // },
        components:{
            NavBar,
            BtnCom,
            InpCom,
        }
    }
</script>
<style scoped lang="less">
    .page-container{
        height:100%;
        position:absolute;
        width:100%;

        .order-notice-mask{
            position:absolute;
            z-index:2;
            top:2rem;
            bottom:0;
            left:0;
            right:0;
            background-color:rgba(0,0,0,0.4);
        }
        .order-notice{
            height:6rem;
            width:60%;
            margin:0 20%;
            position:absolute;
            z-index:3;
            top:50%;
            margin-top:-5rem;
            background-color:#fff;
            font-size:0.67rem;
            .content{
                padding:0.5rem;
                text-align:left;
                line-height:1.5em;
            }
            .toolbar{
                height:1rem;
                .button{
                    background-color:rgb(0, 191, 254);
                    color:#fff;
                    line-height:1rem;
                    text-align:center;
                }
                .confirm-button{
                    margin-right:1px;
                }
            }
        }
        .down-list-mask{
            width:100%;
            height:100%;
            background-color:rgba(0,0,0,0.5);
            position:absolute;
            z-index:1;
        }
        .down-list{
            z-index:1;
            position:absolute;
            bottom:0rem;
            width:100%;
            background-color:#fff;
            .toolbar{
                height:1.5rem;
                font-size:0.67rem;
                color:#00bffe;
                .cancel{
                    padding-left:1.5rem;
                }
                .sure{
                    padding-right:1.5rem;
                }
            }
        }
    }
    .page{
        height:100%;
        position:absolute;
        width:100%;
        .qrCode{
            position:absolute;
            top: 0;
            bottom:0;
            left: 0;
            right: 0;
            background-color:rgba(0,0,0,0.5);
            width: 100%;
            height: 100%;
            .box{
                position: fixed;
                top: 50%;
                left: 50%;
                -webkit-transform: translate3d(-50%, -50%, 0);
                transform: translate3d(-50%, -50%, 0);
                background-color: #fff;
                width: 301px;
                height: 301px;
                border-radius: 3px;
                font-size: 16px;
                -webkit-user-select: none;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                -webkit-transition: .2s;
                transition: .2s;
            }
        }
        .page-content{
            background-color: #efefef;
            position:relative;
            height:100%;
            overflow: auto;
            .input-control{
                margin-bottom:1px;
            }
        }
        .button-control{
            margin:0.3rem;
            color:#fff;
            font-size:0.77rem;
            overflow:hidden;
            border-radius:3px;
        }
    }
</style>