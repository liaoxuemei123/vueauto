<template>
    <div class="index-page page" flex="dir:top box:justify">
        <nav-bar 
            title="添加预约订单"
            rightIcon="icon-history"
            :onRight="goHistory"
        />
        <div class="page-content">
            <mt-datetime-picker
                ref="datepicker"
                type="datetime"
                v-model="pickerValue"
                @confirm="onDateConfirm">
            </mt-datetime-picker>
            <div class="input-control">
                <inp-com title="车牌号" type="text" icon="icon-plate" :readonly="true" placeholder="请输入车牌号" :onClick="selectPlate.bind(this)" :value="subscribeInfo.carInfo.plate"/>
            </div>
            <div class="input-control">
                <inp-com title="预约时间" :readonly="true" type="text" icon="icon-time" placeholder="请选择到店时间" :onClick="selectTime" :value="subscribeInfo.showTime"/>
            </div>
            <div class="input-control">
                <inp-com title="4S店选择" type="text" icon="icon-store" placeholder="请选择服务商" :onClick="goStore" :value="subscribeInfo.storeInfo.storeName"/>
            </div>
            <div class="input-control">
                <inp-com title="预约里程" type="number" icon="icon-mile" placeholder="请输入里程KM" :onBlur="updateMile.bind(this)" :value="subscribeInfo.mile"/>
                <transition name="drop-down">
                    <div class="explain" v-if="subscribeInfo.fcmc">
                        <div class="atention" flex="dir:left">保养项目：<div class="red">以下保养项目按照官方保养守则推荐具体以到店为准</div></div>
                        <div class='fcmc-list'>
                            <div class="fcmc-item" v-for="(item,index) in subscribeInfo.fcmc" flex="dir:left box:last" v-if="index < 2 || fcmcExpand">
                                <div class="info">{{index + 1}}.{{item.fcmcDesc}}</div>
                                <div class="expand" v-if="index == 1" @click="fcmcExpand = !fcmcExpand">
                                    <div v-if="fcmcExpand">收起<i class="iconfont icon-up"></i></div>
                                    <div v-else="fcmcExpand">展开更多<i class="iconfont icon-down"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="input-control">
                <inp-com title="联系人" type="text" icon="icon-contact" placeholder="请输入联系人" :onBlur="updateContact.bind(this)" :value="subscribeInfo.contact"/>
            </div>
            <div class="input-control">
                <inp-com title="联系电话" type="number" icon="icon-phone" placeholder="请输入联系电话" :onBlur="updatePhone.bind(this)" :value="subscribeInfo.phone"/>
            </div>
            <div class="input-control" flex="dir:top">
                <inp-com title="预约描述" :onClick="expandDes" placeholder="预约描述..." type="text" icon="icon-comment" :readonly='true'/>
                <div class="text-control" flex="dir:top"  v-if="desExpand">
                    <textarea rows="5" maxlength='100' placeholder="请输入预约描述" @input="updateDes" :value="subscribeInfo.description"></textarea>
                    <div class="show-length">
                        {{subscribeInfo.description.length}}/100
                    </div>
                </div>
            </div>
        </div>
        <div class="button-control">
            <btn-com
                title="确定预约"
                :onClick="addOrder"
                background="#00bffe"
            />
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import BtnCom from '../components/BtnCom';
    import InpCom from '../components/InpCom';
    import { mapMutations, mapState } from 'vuex';
    import Tool from '../utils/Tool';
    import { Toast } from 'mint-ui';
    export default{
        data () {
            return {
                pickerValue:Tool.getCurrentDate('time'),
                fcmc:[],
                fcmcExpand:false,
                des:'1212',
                desExpand:false,
            }
        },
        computed:{
            ...mapState([
                'subscribeInfo',
            ])
        },
        mounted:function(){
        },
        methods:{
            goStore:function(){
                this.$router.push({name:'store'});
            },
            selectTime:function(){
                this.$refs.datepicker.open();
            },
            updateMile:function(e){
                var self = this;
                var target = $(e.target);
                this.subscribeInfo.mile = target.val();
                if(!self.subscribeInfo.carInfo.vehicleTypeId){
                    Toast({
                        message:'请选择爱车',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                Tool.get('getCommodityList',{
                    mileage:target.val() || 0,
                    cartype:self.subscribeInfo.carInfo.vehicleTypeId,
                },function(data){
                    self.subscribeInfo.fcmc = data.data;
                })
            },
            updateContact:function(e){
                var target = $(e.target);
                this.subscribeInfo.contact = target.val();
            },
            updatePhone:function(e){
                var target = $(e.target);
                this.subscribeInfo.phone = target.val();
            },
            updateDes:function(e){
                var target = $(e.target);
                this.subscribeInfo.description = target.val();
            },
            expandDes:function(){
                this.desExpand = true;
            },
            onDateConfirm:function(val){
                this.subscribeInfo.time = new Date(val).getTime();
                this.subscribeInfo.showTime = Tool.formatDate(val,'time');
            },
            selectPlate:function(val){
                this.$router.push({name:'selectplate'})
            },
            addOrder:function(e){
                var self = this;
                var data = {}
                data.carNumber = this.subscribeInfo.carInfo.plate;
                data.reservationDateTimestamp = this.subscribeInfo.time;
                data.userId = 1;
                data.storeId = this.subscribeInfo.storeInfo.id;
                data.mileage = this.subscribeInfo.mile;
                data.linkman = this.subscribeInfo.contact;
                data.phone = this.subscribeInfo.phone;
                data.description = this.subscribeInfo.description;
                if(!data.carNumber){
                    Toast({
                        message:'请输入车牌号',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.reservationDateTimestamp){
                    Toast({
                        message:'请选择保养时间',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.storeId){
                    Toast({
                        message:'请选择服务商',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.mileage){
                    Toast({
                        message:'请输入里程',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.linkman){
                    Toast({
                        message:'请输入联系人',
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
                if(!(/^1[34578]\d{9}$/.test(data.phone))){
                    Toast({
                        message:'手机号码不正确',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                Tool.post('ReservationOrderAdd',data,function(res){
                    Toast({
                        message:res.msg,
                        duration:1000,
                    });
                    self.$store.commit('RESET_SUBSCRIBE');
                })
            },
            goHistory:function(){
                this.$router.push({name:'orderhistory'});
            },
            ...mapMutations([
                'updateSubscribeInfo',
            ])
        },
        components:{
            NavBar,
            BtnCom,
            InpCom,
        }
    }
</script>
<style scoped lang="less">
    .page{
        height:100%;
        position:absolute;
        width:100%;
        .page-content{
            background-color: #efefef;
            height:100%;
            overflow: auto;
            .input-control{
                overflow:hidden;
                border-radius:3px;
                box-shadow:0px 2px 3px #ccc;
                .explain{
                    background-color:#f8f8f8;
                    padding:0.43rem 0.43rem 0.43rem 1.28rem;
                    font-size:0.51rem;
                    color:#6b6b6b;
                    line-height: 1.5em;
                    .atention{
                        white-space:nowrap;
                        text-overflow:ellipsis;
                        .red{
                            color:#fc4c1d;
                            font-size:0.51rem;
                            text-overflow: ellipsis;
                        }
                    }
                    .fcmc-list{
                        .fcmc-item{
                            white-space:nowrap;
                            .info{
                                text-overflow:ellipsis;
                            }
                            .expand{
                                width:3rem;
                                text-align:right;
                                color:#fc4c1d;
                                .iconfont{
                                    font-size:0.51rem;
                                }
                            }
                        }
                    }
                }
                .text-control{
                    position:relative;
                    textarea{
                        resize:none;
                        outline:none;
                        border:none;
                        padding:0;
                        background-color:#f8f8f8;
                        font-size:0.58rem;
                        padding:0.43rem 0.43rem 0.43rem 1.28rem;
                    }
                    .show-length{
                        position:absolute;
                        bottom:0.43rem;
                        right:0.43rem;
                        font-size:0.51rem;
                        color:#08a9ef;
                    }
                }
               
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