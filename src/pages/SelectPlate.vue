<template>
    <div class="page-container">
        <div class="page select-plate-page">
            <div class="page-container" flex="dir:top box:justify">
                <nav-bar
                    title="选择车辆"
                />
                <div class="page-content">
                    <div class="car-list">
                        <div class="own-item" v-for="(item,index) in ownList" flex="dir:left cross:center" @click="active=index">
                            <i class="iconfont icon-select active" v-if="active == index"></i>
                            <i class="iconfont icon-circle" v-else="active == index"></i>
                            <div class="car-series">{{item.vehicle_type}}</div>
                            <div class="car-plate">{{item.plate_no}}</div>
                        </div>
                        <div class="add-car">
                            <div class="default-show" flex="dir:left cross:center" @click="active = -1">
                                <i class="iconfont icon-select active" v-if="active == -1"></i>
                                <i class="iconfont icon-circle" v-else="active == -1"></i>
                                <div class="title">我要添加车辆</div>
                            </div>
                            <div class="drop-down-form" v-if="active == -1" flex="dir:top main:center">
                                <div class="input-control" @click="pickerShow=true">
                                    <input type="text" placeholder="请选择车系" readonly :value="addInfo.carSeries.modelName">
                                    <i class="iconfont icon-little-arrow"></i>
                                </div>
                                <div class="input-control" flex="dir:left cross:center main:justify">
                                    <input type="text" placeholder="请输入车牌" @blur="updatePlate">
                                    <div class="add-button" @click="addCar">
                                        确定添加
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-control">
                    <btn-com
                        title="确定"
                        background="#00bffe"
                        :onClick="submitCarInfo"
                    />
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="picker-mask" v-if="pickerShow" @click="pickerShow=false"></div>
        </transition>
        <transition name="slide-up">
            <div class="picker-container" v-if="pickerShow">
                <div class="toolbar" flex="dir:left cross:center main:justify">
                    <div class="left-button" @click="pickerShow = false">取消</div>
                    <div class="ri0ght-button" @click="pickerSure">确认</div>
                </div>
                <mt-picker :slots="carList" defaultIndex=0 valueKey="modelName" :itemHeight="itemHeight" @change="onValuesChange"></mt-picker>
            </div>
        </transition>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import BtnCom from '../components/BtnCom';
    import { mapState } from 'vuex';
    import Tool from '../utils/Tool';
    import { Picker, Toast } from 'mint-ui';
    export default {
        data () {
            return {
                ownList:[],
                active:0,
                pickerShow:false,
                carList:[{
                    flex:1,
                    values:[],
                    className:'car-item',
                    textAlign:'center',
                }],
                addInfo:{
                    carSeries:'',
                    plate:'',
                },
                pickerValue:{},
                mobile:'',
                userToken:'',
            }
        },
        watch:{
            'active':function(val){
                if(this.active == -1 && this.carList[0].values.length == 0){
                    this.getPickerList();
                }
            }
        },
        methods:{
            getCarList:function(callback){
                var self = this;
                Tool.get('getCarNumberList',{
                    userId:this.mobile,
                    userToken:this.userToken
                },function(data){
                    self.ownList = data.data;
                    if(data.data.length > 0){
                        self.active = data.data.length - 1;
                    }
                    callback && callback();
                }) 
            },
            getPickerList:function(){
                var self = this;
                Tool.get('getCarList',{},function(data){
                    for(var i=0;i<data.data.length;i++){
                        self.carList[0].values.push({modelName:data.data[i][3],modelId:data.data[i][0],id:data.data[i][0]});
                    }
                })
            },
            onValuesChange:function(picker,values){
                this.pickerValue = picker.getValues();
            },
            pickerSure:function(){
                if(this.pickerValue[0]){
                    this.addInfo.carSeries = this.pickerValue[0];
                    this.pickerValue = {};//每次选择完成后重置pickerValue，不然下次没办法选择第一个选项
                }else{
                    this.addInfo.carSeries = this.carList[0].values[0];
                    this.pickerValue = {};
                }
                this.pickerShow = false;
            },
            updatePlate:function(e){
                var target = $(e.target);
                this.addInfo.plate = target.val();
            },
            addCar:function(){
                if(!this.addInfo.carSeries.id){
                    Toast({
                        message:'请选择车型',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!this.addInfo.plate){
                    Toast({
                        message:'请输入车牌',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }else if (!(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{0,1}$/.test(this.addInfo.plate))){
                    Toast({
                        message:'车牌号有误',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                } 
                var self = this;
                console.log(self.addInfo);
                Tool.post('AaUserVehicleAdd',{
                    user_id:this.mobile,
                    plate_no:self.addInfo.plate,
                    vehicle_type_id:self.addInfo.carSeries.modelId,
                    Vehicle_type :self.addInfo.carSeries.modelName
                },function(data){
                    self.getCarList();
                })
            },
            submitCarInfo:function(){
                var data = {};
                data.plate = this.ownList[this.active].plate_no;
                data.seriesName = this.ownList[this.active].vehicle_type;
                data.vehicleTypeId = this.ownList[this.active].vehicle_type_id;
                this.$store.commit('SET_SUBCARINFO',data);
                this.$router.back();
            }
        },
        components:{
            NavBar,
            BtnCom
        },
        activated:function(){
            if(Tool.localItem('userCache')){
                this.mobile = JSON.parse(Tool.localItem('userCache')).mobile;
                this.userToken = JSON.parse(Tool.localItem('userCache')).userToken;
                this.getCarList(()=>{
                    for(var i=0;i<this.ownList.length;i++){
                        if(this.$store.getters.subscribeInfo.carInfo.vehicleTypeId == this.ownList[i].vehicle_type_id){
                            this.active = i;
                            break;
                        }
                    }
                });
            }
        },
        computed:{
            itemHeight:function(){
                return (document.documentElement.style.fontSize.replace("px",'') - 0) * 1.5;
            }
        }
    }
</script>
<style lang="less">
    .page-container{
        height:100%;
        position:absolute;
        width:100%;
        .picker-mask{
            position:absolute;
            top:0;
            bottom:0;
            left:0;
            right:0;
            background-color:rgba(0,0,0,0.5);
            z-index:1;
        }
        .picker-container{
            position:absolute;
            background-color:#fff;
            width:100%;
            bottom:0;
            z-index:2;
            .toolbar{
                padding:0 5%;
                height:1.5rem;
                font-size:0.76rem;
                color:#389cf2;
            }
        }
    }
    .page{
        height:100%;
        position:absolute;
        width:100%;
        .page-container{
            height:100%;
            .page-content{
                background-color: #efefef;
                height:100%;
                overflow: auto;
                .car-list{
                    font-size:0.67rem;
                    .own-item{
                        height:2rem;
                        background-color:#fff;
                        border-bottom:1px solid #efefef;
                        padding:0 3%;
                        .iconfont{
                            font-size:0.76rem;
                            margin-right:0.3rem;
                        }
                        .iconfont.active{
                            color:#fc4c1d;
                        }
                        .car-series{
                            margin-right:0.3rem;
                        }
                        .car-plate{
                            font-size:0.57rem;
                            color:#888;
                        }
                    }
                    .add-car{
                        .default-show{
                            height:1.8rem;
                            background-color:#fff;
                            border-bottom:1px solid #efefef;
                            padding:0 3%;
                            .iconfont{
                                font-size:0.76rem;
                                margin-right:0.3rem;
                            }
                            .iconfont.active{
                                color:#fc4c1d;
                            }
                        }
                        .drop-down-form{
                            padding:0 10%;
                            background-color:#fff;
                            .input-control{
                                position:relative;
                                border-bottom:1px solid #efefef;
                                input{
                                    font-family:'Microsoft Yahei';
                                    height:1.8rem;
                                    line-height:1.8rem;
                                    outline:none;
                                    border:none;
                                    background:transparent;
                                }
                                .iconfont{
                                    position:absolute;
                                    right:0rem;
                                    line-height:1.8rem;
                                    font-size:1rem;
                                    color:#888;
                                }
                                .add-button{
                                    padding:0.3rem 0.3rem;
                                    background-color:#fc4c1b;
                                    font-size:0.51rem;
                                    color:#fff;
                                }
                            }
                        }
                    }
                }
            }
            .button-control{
                background-color:#efefef;
                color:#fff;
                font-size:0.77rem;
                overflow:hidden;
                border-radius:3px;
            }
        }
    }
</style>