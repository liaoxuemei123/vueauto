<template>
    <div class="page-container">
        <div class="page home-page" flex="dir:top box:first">
            <nav-bar
                title="个人中心"
                :goBack="goBack.bind(this)"
            />
            <div class="page-content" flex="dir:top box:last">
                <div class="user-info">
                    <div class="info-control" @click="myorder" flex="dir:left box:first">
                        <div class="label">
                            <span>我的订单</span>
                            <span class="unpay-order" v-if="orderUnPayCount > 0">{{orderUnPayCount > 9 ? orderUnPayCount : orderUnPayCount}}</span>
                        </div>
                        <div class="value">查看全部订单<i class="iconfont icon-go"></i></div>
                    </div>
                    <div class="info-control" @click="myCar" flex="dir:left box:first">
                        <div class="label">
                            <span>我的车辆</span>
                        </div>
                        <div class="value">{{manmodelName}}<i class="iconfont icon-go"></i></div>
                    </div>
                    <!-- <div class="info-control" @click="agentRecommend" flex="dir:left box:first">
                        <div class="label">
                            <span>推荐</span>
                        </div>
                        <div class="value">经纪人认证<i class="iconfont icon-go"></i></div>
                    </div> -->
                    
                    <!-- <div class="info-control" @click="myrecommendorder" flex="dir:left box:first">
                        <div class="label">
                            <span>我的推荐订单</span>
                        </div>
                        <div class="value">查看全部推荐订单<i class="iconfont icon-go"></i></div>
                    </div> -->
                    
                    <!--<div class="info-control" flex="dir:left box:first">
                        <div class="label"><span>昵称</span></div>
                        <div class="value">{{userInfo.nickName | nameFilter}}</div>
                    </div>
                    <div class="info-control" flex="dir:left box:first">
                        <div class="label"><span>性别</span></div>
                        <div class="value">{{userInfo.sex | sexFilter}}</div>
                    </div>-->
                    <!--<div class="info-control" flex="dir:left box:first">
                        <div class="label"><span>手机号</span></div>
                        <div class="value">{{userInfo.mobile | phoneFilter}}</div>
                    </div>-->
                </div>
                <div class="logout-button" @click="logout">
                    退出
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Xscroller from '../components/Xscroller';
    import Tool from '../utils/Tool';
    import { mapState, mapMutations } from 'vuex';
    export default{
        data () {
            return {
                userInfo:{
                    nickName:'',
                    sex:'',
                    mobile:'',
                },
                manmodelName:'',
            }
        },
        computed:{
            ...mapState({
                orderUnPayCount: ({
                    mixin
                }) => mixin.orderUnPayCount,
                userVehicle:({
                    packageinfo
                }) => packageinfo.userVehicle,
            })
        },
        components:{
            NavBar,
            Xscroller
        },
        activated:function(){
            console.log(this.userVehicle);
            const userData = JSON.parse(Tool.localItem('userData'));
            if(userData){
                this.userInfo = userData;
            }else{
                const userInfoLocal = JSON.parse(Tool.localItem('userInfo'));
                if(userInfoLocal){
                    Tool.get('queryUserInfo',{userToken:userInfoLocal.token},data => {
                        // const userCenter = JSON.parse(JSON.parse(data));
                        if(data.data){
                            this.userInfo = data.data;
                            Tool.localItem('userData',data.data);
                        }
                    });
                }
            }
            this.manmodelName = Tool.localItem('manmodelName')?Tool.localItem('manmodelName'):'车辆管理';
            this.manmodelBack = Tool.localItem('manmodelBack') ? JSON.parse(Tool.localItem('manmodelBack')):'';
            if (this.manmodelBack){
                Tool.localItem('manmodel',this.manmodelBack);
            }
            // if (this.manmodel.id) {
            //     this.setModuleInfo(this.manmodel);
            // }
        },
        methods:{
            goBack:function(){
                Tool.localItem('isUserCenterBack',true);
                this.$router.back();
            },
            logout:function(){
                Tool.removeLocalItem('userInfo');
                Tool.removeLocalItem('modelInfo');
                Tool.removeLocalItem('receiverInfo');
                Tool.removeLocalItem('selectCarData');
                Tool.removeLocalItem('vehicleInfo');
                Tool.removeLocalItem('manmodelName');
                Tool.removeLocalItem('manmodelBack');
                Tool.removeLocalItem('manmodel');
                Tool.removeLocalItem('manModelName');
                Tool.removeLocalItem('manModelBack');
                Tool.removeLocalItem('manModel');
                Tool.removeLocalItem('userData');
                Tool.removeLocalItem('manmodelName');
                Tool.removeLocalItem('manmodelBack');
                Tool.removeLocalItem('manmodel');
                this.$router.push({name:'login'});
                this.addUservehicle({});
                this.hasgetedViheche(false); //是否获取过默认车辆，置为初值
            },
            myrecommendorder:function() {
                this.$router.push({name:'myrecorder'});
            },
            myorder:function(){
                this.$router.push({name:'myorder'});
            },
            agentRecommend:function () {
                this.$router.push({name:'agentcertification'});
            },
            myCar: function(){
                this.$router.push({name:'carmanagement'});
            },
            ...mapMutations({
                addUservehicle: 'ADD_USERVEHICLE',
                hasgetedViheche: 'UPDATE_GETEDVEHICHE',
                setModuleInfo: 'SET_MODULE_INFO',
            })
        },
        filters: {
            phoneFilter:function(val) {
                var arr = (val+'').split('');
                arr.splice(3,4,'****');
                return arr.join('');
            },
            sexFilter:function(val) {
                if(!val) return '男'
                const sexArray = {
                    '1':'男',
                    '2':'女'
                }
                return sexArray[val];
            },
            nameFilter:function(val){
                if(!val) return '用户' + Math.ceil( Math.random() * 10000 );
                return val;
            }
        },
        beforeRouteEnter: (to, from, next) => {
            Tool.routerEnter(to,from,next);
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
            .info-control{
                height:1.8rem;
                line-height:1.8rem;
                background-color:#fff;
                padding:0 3%;
                margin-bottom:1px;
                .label{
                    width:4rem;
                    position:relative;
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
                .value{
                    text-align:right;
                    .iconfont{
                        font-size: 0.57rem;
                        margin-left:0.1rem;
                    }
                }
            }
            .logout-button{
                text-align:center;
                background-color:#ff3300;
                font-size:0.64rem;
                color:#fff;
                height:1.8rem;
                line-height:1.8rem;
            }
        }
    }
</style>