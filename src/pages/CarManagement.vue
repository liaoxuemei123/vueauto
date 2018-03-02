<template>
    <div class="page-container">
        <div class="page select-plate-page">
            <div class="page-container" flex="dir:top box:justify">
                <nav-bar
                    title="车辆管理"
                    :goBack="goBack.bind(this)"
                />
                <div class="page-content">
                    <div class="car-list">
                        <div class="own-item"  v-for="(item,index) in ownList" flex="dir:left cross:center" @click.capture="listClick(index)">
                            <i class="iconfont icon-select active" v-if="active == index"></i>
                            <i class="iconfont icon-circle" v-else="active == index"></i>
                            <div class="car-series">{{item.vehicle_type}}</div>
                            <div class="car-plate">{{item.plate_no}}</div>
                            <div class="car-vin">{{item.vin}}</div>
                            <!-- <i class="iconfont icon-select active" v-if="active == index" @click="editcar"></i> -->
                            <div flex='dir:right cross:center' style="position:absolute;right:0;height:100%;width:2.5rem;" v-if="active == index"  @click="editcar" >
                                <i class="iconfont icon-go arrow" v-if="active == index"></i>
                            </div>
                            <!-- <i class="iconfont icon-go arrow" v-if="active == index"  @click="editcar" style="position:absolute;right:5%;"></i> -->
                            <!-- <i class="iconfont icon-weibiaoti2010102-copy" v-if="active == index" @click="editcar"></i> -->

                        </div>
                        <div class="add-car">
                        <!-- <div class="default-show" flex="dir:left cross:center" @click="active == -1?active = 0:active = -1"> -->
                            <div class="default-show" flex="dir:left cross:center" @click="addcardiv">
                                <i class="iconfont icon-select active" v-if="active == -1"></i>
                                <i class="iconfont icon-circle" v-else="active == -1"></i>
                                <div class="title">我要添加车辆</div>
                            </div>
                            <div class="drop-down-form" v-if="active == -1" flex="dir:top main:center">
	                            <mt-datetime-picker
				                    ref="datepicker"
				                    type="date"
				                    v-model="pickerVisible"
				                    @confirm="onDateConfirm"
				                    year-format="{value}年"
				                    month-format="{value}月"
				                    date-format="{value}日"
				                    :startDate="startDate"
				                    :endDate="endDate"
				                    >
				                </mt-datetime-picker>
                                <div class="input-control" @click="pickerShow=true" flex="dir:left">
                                	<div class="tipTitle">车型</div>
                                    <input type="text" placeholder="请选择车型" readonly :value="addInfo.carSeries">
                                    <i class="iconfont icon-little-arrow"></i>
                                </div>
                                <div class="input-control"  flex="dir:left">
                                	<div class="tipTitle">车架号</div>
                                    <input type="text" placeholder="请输入车架号(不限大小写)" :value="addInfo.vin" maxlength="17" @blur="updateVIN">
                                </div>
                                <div class="input-control"  flex="dir:left">
                                	<div class="tipTitle">发动机号</div>
                                    <input type="text" placeholder="输入发动机号后6位" :value="addInfo.motorId" @blur="updateMotorId" maxlength="6">
                                </div>
                                <!-- <div class="input-control"  flex="dir:left"  @click="selectTime">
                                	<div class="tipTitle">购车时间</div>
                                    <input type="text" placeholder="请选择购车时间"  :value="addInfo.buyTime" readonly>
                                    <i class="iconfont icon-little-arrow"></i>
                                </div> -->
                                <div class="input-control" flex="dir:left cross:center">
                                	<div class="tipTitle">车牌号</div>
                                    <input type="text" placeholder="请输入车牌，如:渝A12345" @blur="updatePlate" maxlength="7" :value="addInfo.plate">
                                </div>
                                <div  class="add-buttonbox">
                                    <div class="add-button add-car" @click="addCar">
                                        添加
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="add-car">
                        <!-- <div class="default-show" flex="dir:left cross:center" @click="active == -1?active = 0:active = -1"> -->
                            <div class="default-show" flex="dir:left cross:center" v-if="editactive == -1" @click="editactive = -1">
                                <!-- <i class="iconfont  active" ></i> -->
                                <div class="title">编辑车辆</div>
                            </div>
                            <div class="drop-down-form" v-if="editactive == -1" flex="dir:top main:center">

                                <div class="input-control" @click="pickerShow=true" flex="dir:left">
                                    <div class="tipTitle">车型</div>
                                    <input type="text" placeholder="请选择车型" readonly :value="addInfo.carSeries">
                                    <i class="iconfont icon-little-arrow"></i>
                                </div>
                                <div class="input-control"  flex="dir:left">
                                    <div class="tipTitle">车架号</div>
                                    <input type="text" placeholder="请输入车架号(不限大小写)" :value="addInfo.vin" maxlength="17" @blur="updateVIN">
                                </div>
                                <div class="input-control"  flex="dir:left">
                                    <div class="tipTitle">发动机号</div>
                                    <input type="text" placeholder="输入发动机号后6位" :value="addInfo.motorId" @blur="updateMotorId" maxlength="6">
                                </div>
                                <div class="input-control" flex="dir:left cross:center">
                                    <div class="tipTitle">车牌号</div>
                                    <input type="text" placeholder="请输入车牌，如:渝A12345" @blur="updatePlate" maxlength="7" :value="addInfo.plate">
                                </div>
                                <div  class="add-buttonbox">
                                    <div class="add-button del-car" @click="deletecar">
                                        删除
                                    </div>
                                    
                                    <div class="add-button edit-car" @click="addCar" style="margin-right: 0.7rem;">
                                        修改
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
            <div class="picker-container" v-show="pickerShow">
                <!-- <div class="toolbar" flex="dir:left cross:center main:justify">
                    <div class="left-button" @click="pickerShow = false">取消</div>
                    <div class="ri0ght-button" @click="pickerSure">确认</div>
                </div> -->
                <!-- <mt-picker :slots="carList" defaultIndex=0 valueKey="modelName" :itemHeight="itemHeight" @change="onValuesChange"></mt-picker> -->
                <!-- <mini-setmanage></mini-setmanage> -->
                <transition name="slide-up">
		            <div class="down-list"  v-show="pickerShow">
		                
		                <div class="toolbar" flex="dir:left box:mean">
		                    <div class="cancel" v-tap="closeDialog" flex="dir:left cross:center main:left">
		                        取消
		                    </div>
		                    <div class="sure" flex="dir:left cross:center main:right" @click="submitModelInfo">
		                        确定
		                    </div>
		                </div>
		                <div class="down-container">
		                    <mt-picker :slots="carSelectList" @change="onCarChange" valueKey="name"></mt-picker>
		                </div>
		            </div>
		        </transition>
            </div>
        </transition>
        <!-- <transition name="fade">
            <div class="addcar-mask" v-if="dailogShow" @click="dailogShow=false"></div>
        </transition>
        <transition name="slide-up">
            <div class="addcar-dailog" v-if="dailogShow" flex="dir:top">
                <div class="input-control" flex="dir:left">
                    是否确定删除该车辆？
                </div>
                <div class="button-group">
                    <div class="button cancel-button" @click="dailogShow=false">取消</div>
                    <div class="button sure-button" @click="addCarNumber">确定</div>
                </div>
            </div>
        </transition> -->
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import BtnCom from '../components/BtnCom';
    import { mapState, mapMutations } from 'vuex';
    import Tool from '../utils/Tool';
    import { Picker, Toast, MessageBox } from 'mint-ui';
    import Scroller from '../components/Scroller';
    import PackageItem from '../components/PackageItem';
    export default {
        data () {
            return {
                ownList:[],
                active:0,
                editactive: 0,
                pickerShow:false,
                carModel:{},
                carShow: true,
                carData:{},
                addInfo:{
                    carSeries:'',
                    code:'',
                    vin:'',
                    buyTime:'2015-10-26', //没有使用这个字段了，为了不影响，给了个默认值,不要给它赋值
                    motorId:'',
                    plate:'',
                    type:'',
                    id:'',
                    vehicle_type_id:'',
                },
                userId:'',
                editFlag:false,
                preCode:'',
                prePage:'',
                userToken:'',
                dailogShow:false,
                pickerValue:{},
                carSelectList: [{
                    flex:1,
                    defaultIndex:0,
                    values:[],
                    className:'slot1',
                },{
                    divider:true,
                    content:'-',
                },{
                    flex:1,
                    values:[],
                    className:'slot2',
                },{
                    divider:true,
                    content:'-',
                },{
                    flex:1,
                    values:[],
                    className:'slot3',
                }],
            }
        },
        computed:{
        	'startDate':function(){
                var now = new Date();
                // if((now.getHours() >= 17 && now.getMinutes()) > 30 || now.getHours() > 17){
                //     var tomorrow = new Date(new Date(Tool.formatDate(now)).getTime() + 25 * 1000 * 60 * 60);
                //     return new Date('1970-01-01');
                // }
                return new Date('1970-01-01');
            },
            pickerVisible:{
                // var now = new Date();
                // if((now.getHours() >= 17 && now.getMinutes()) > 30 || now.getHours() > 17){
                //     var tomorrow = new Date(new Date(Tool.formatDate(now)).getTime() + 25 * 1000 * 60 * 60);
                //     return Tool.formatDate(tomorrow,'time');
                // }
                // var date = new Date().getTime()-367 * 3 * 24 * 1000 * 60 * 60;
                // return Tool.formatDate(date,'time');
                // 让picker没那么空
                // return Tool.getCurrentDate('time');
                get: function(){
			      return Tool.getCurrentDate('time');
			    },
			    set: function (newValue) {
			      this.pickerValue = newValue
			    }
            },
            'endDate':function(){
                // var year = new Date().getFullYear();
                return new Date();
            },
            'startHour':function(){
                return 8;
            },
            'endHour':function(){
                return 18;
            },
            itemHeight:function(){
                return (document.documentElement.style.fontSize.replace("px",'') - 0) * 1.5;
            },
            ...mapState({
                carInfo:({
                    subscribe
                }) => subscribe.carInfo,
                carList1:({ 
                    packageinfo 
                }) => packageinfo.carList1,
                wbyQd: ({
                    pageconfig
                }) => pageconfig.qd,
            })
        },
        methods:{
            listClick: function(index){
                 this.active=index;
                 this.editactive = 0;
            },
            addcardiv: function(){
                this.active = -1;
                this.editactive = 0;
                var self = this;
                self.addInfo.plate = '';
                self.addInfo.carSeries = '';
                self.addInfo.code = '';
                self.addInfo.vin = '';

                self.addInfo.motorId = '';
                // self.addInfo.buyTime
                self.addInfo.type = '';
                self.addInfo.vehicle_type_id = '';
                self.addInfo.id = '';
            },
            editcar:function(){
                // this.ownList[this.active];
                var self = this;
                self.addInfo.plate = this.ownList[this.active].plate_no?this.ownList[this.active].plate_no:'';
                self.addInfo.carSeries = this.ownList[this.active].vehicle_type;
                self.addInfo.code = this.ownList[this.active].seriesCode;
                self.addInfo.vin = this.ownList[this.active].vin;

                self.addInfo.motorId = this.ownList[this.active].dl_engine_no?this.ownList[this.active].dl_engine_no:'';
                if(self.addInfo.motorId.length>6){
                    self.addInfo.motorId = (self.addInfo.motorId.slice(-6))
                }
                // self.addInfo.buyTime
                self.addInfo.type = this.ownList[this.active].dl_type;
                self.addInfo.vehicle_type_id = this.ownList[this.active].vehicle_type_id;
                self.addInfo.id = this.ownList[this.active].id;
                this.editFlag = true;
                // this.$nextTick(()=>{
                    self.editactive = -1;
                // });
                
            },
            deletecar:function(){
                var self = this;
                // MessageBox({
                //   title: '提示',
                //   message: '是否确认删除该车辆？',
                //   showCancelButton: true
                // });
                MessageBox.confirm('是否确认删除该车辆？').then(action => {
                    var delcarname = this.ownList[this.active].vehicle_type;
                    Tool.post("AaUserVehicleDelete",{
                        id:this.ownList[this.active].id,
                    },(data)=>{
                        if(data.code==200){
                            var delmanmodelName = Tool.localItem('manmodelName');
                            if(delmanmodelName && delmanmodelName == delcarname){
                                Tool.removeLocalItem('manmodelName');
                                Tool.removeLocalItem('manmodel');
                                Tool.removeLocalItem('manmodelBack');
                                
                            }//删除默认车辆
                            Toast({
                                duration:1000,
                                message:data.msg,
                            })
                            this.editactive = 0;//收起
                            self.getCarMamList(()=>{
                                for(var i=0;i<self.ownList.length;i++){
                                    if(self.preCode && self.preCode == self.ownList[i].vehicle_type_id){
                                        self.active = i;
                                        break;
                                    }
                                }
                            });
                        }
                        else{
                            Toast({
                                duration:1000,
                                message:data.msg,
                            })
                        }
                    })
                },() => {});
                
            },
            goBack:function(){
                Tool.localItem('isSelectCarBack',true);
                this.$router.back();
            },
            getCarMamList:function(callback){
                var self = this;
                var oid = (this.prePage == 'personinfo')?'':Tool.getUserInfo('oid');
                Tool.get('getCarNumberList',{
                    userId:Tool.getUserInfo('userId'),
                    oid:oid,
                    // userToken:this.userToken
                },function(data){
                    self.ownList = data.data;
                    if(data.data.length > 0){
                        self.active = data.data.length - 1;
                    }
                    callback && callback();
                }) 
            },
            selectTime:function(){
                this.$refs.datepicker.open();
            },
            updateVIN:function(e){
                this.addInfo.vin = $(e.target).val();
                // if(this.userVehicle.length > 0 && $(e.target).val() == this.userVehicle[0].vin){
                //     this.needVerify = false;
                // }else{
                //     this.needVerify = true;
                // }
            },
            updateMotorId:function(e){
            	this.addInfo.motorId = $(e.target).val();
            },
            onDateConfirm:function(val){
                // if((new Date(val).getHours() >= 17 && new Date(val).getMinutes() > 30) || (new Date(val).getHours() >= 18)){
                //     Toast({
                //         message:'预约时间不能大于17:30',
                //         duration:1000
                //     })
                //     return false;
                // }else if(new Date(val).getHours() < 9){
                //     Toast({
                //         message:'预约时间不能小于9:00',
                //         duration:1000
                //     })
                //     return false;
                // };
                var temptime = new Date(val).getTime();
                this.addInfo.buyTime = Tool.formatDate(temptime,'time').split(' ')[0];
            },
            closeDialog:function(){
                this.pickerShow = false;
            },
            getCarList:function(){
                Tool.get('queryCar',{},pData => {
                    const data = pData.data;
                    var type = [];
                    var serise = [];
                    var module = [];
                    data.map((v,i) => {
                        type.push({
                            name:v.typename,
                            index:i
                        })
                        serise[i] = [];
                        module[i] = [];
                        v.data.map((vs,j) => {
                            serise[i].push({
                                name: vs.seriesName,
                                type: vs.vehicleType,
                                index: {
                                    i,j
                                }
                            })
                            module[i][j] = [];
                            vs.modelName.map((vss,k) => {
                                module[i][j].push({
                                    name:vss[2],
                                    id:vss[0],
                                    code:vss[3],
                                })
                            })
                        })
                    })
                    var param = {
                        type,
                        serise,
                        module
                    }
                    this.setCarList1(param);
                    this.carSelectList[0].values = param.type;
                    this.carSelectList[2].values = param.serise[0];
                    this.carSelectList[4].values = param.module[0][0];
                })
            },
            onCarChange:function(picker,values){
                if(values[0] && values[1] && values[2]){
                    picker.setSlotValues(1,this.carList1.serise[values[0].index]);
                    picker.setSlotValues(2,this.carList1.module[values[1].index.i][values[1].index.j]);
                    this.carModel.displacement = values[2].name;
                    this.carModel.vehicleModel = values[1].name;
                    this.carModel.vehicleType = values[1].type;
                    this.carModel.typeName = values[0].name;
                    this.carModel.id = values[2].id;
                    this.carModel.code = values[2].code;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                }else if(values[1] && values[2]){
                    picker.setSlotValues(1,this.carList1.serise[0]);
                    picker.setSlotValues(2,this.carList1.module[values[1].index.i][values[1].index.j]);
                    this.carModel.displacement = values[2].name;
                    this.carModel.vehicleModel = values[1].name;
                    this.carModel.vehicleType = values[1].type;
                    this.carModel.typeName = values[0].name;
                    this.carModel.id = values[2].id;
                    this.carModel.code = values[2].code;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                }
            },
            submitModelInfo:function(){
                if(this.carModel.displacement){
                	this.addInfo.carSeries = this.carModel.pickerModel
                    this.addInfo.code = this.carModel.code;
                    this.addInfo.type = this.carModel.vehicleType;
                    this.addInfo.vehicle_type_id = this.carModel.id
                     // this.setModuleInfo(this.carModel);
                }else{
                    this.carModel.displacement = this.carList1.module[0][0][0].name;
                    this.carModel.id = this.carList1.module[0][0][0].id;
                    this.carModel.code = this.carList1.module[0][0][0].code;
                    this.carModel.vehicleModel = this.carList1.serise[0][0].name;
                    this.carModel.vehicleType = this.carList1.serise[0][0].type;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                    // this.setModuleInfo(this.carModel);
                    this.addInfo.carSeries = this.carModel.pickerModel
                    this.addInfo.code = this.carModel.code
                    this.addInfo.type = this.carModel.vehicleType;
                    this.addInfo.vehicle_type_id = this.carModel.id
                    
                }
                this.pickerShow = false;
                // if(this.carModel.typeName === '长安欧尚'){
                // 	debugger
                //     if(this.$parent.bisinessItems.length < 2){

                //     }else{
                //         this.$parent.changeActive(1,false);
                //     }
                // }
            },
            // onValuesChange:function(picker,values){
            //     this.pickerValue = picker.getValues();
            // },
            // pickerSure:function(){
            //     if(this.pickerValue[0]){
            //         this.addInfo.carSeries = this.pickerValue[0];
            //         this.pickerValue = {};//每次选择完成后重置pickerValue，不然下次没办法选择第一个选项
            //     }else{
            //         this.addInfo.carSeries = this.carList1[0].values[0];
            //         this.pickerValue = {};
            //     }
            //     this.pickerShow = false;
            // },
            updatePlate:function(e){
                var target = $(e.target);
                this.addInfo.plate = target.val().toLocaleUpperCase();
            },
            addCarNumber:function(e){

                const {vin,mileage,seriesCode,modelCode,confCode,vehicle_type} = this.ownList[this.active]
                var plate_no = this.$refs.dialogCarPlate.value;
                if(!plate_no){
                    Toast({
                        message:'请输入车牌',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }else if (!(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{0,1}$/.test(plate_no))){
                    Toast({
                        message:'车牌号有误,注意格式和大小写',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                } 
                Tool.post("AaUserVehicleAdd",{
                    user_id:Tool.getUserInfo('userId'),
                    vin,
                    mileage,
                    seriesCode,
                    modelCode,
                    confCode,
                    plate_no,
                    vehicle_type
                },(data)=>{
                    self.getCarMamList(()=>{
                        for(var i=0;i<self.ownList.length;i++){
                            if(self.preCode && self.preCode == self.ownList[i].vehicle_type_id){
                                self.active = i;
                                break;
                            }
                        }
                    });
                })
            },
            addCar:function(){
                this.addInfo.plate = this.addInfo.plate.trim();
                if(!this.addInfo.carSeries){
                    Toast({
                        message:'请选择车型',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!this.addInfo.vin){
                    Toast({
                        message:'请输入车架号',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{17}$/.test(this.addInfo.vin)){
                    Toast({
                        message:'车架号输入有误',
                        duration:1000,
                    });
                    return false;
                }
                if(!this.addInfo.motorId){
                    Toast({
                        message:'请输入发动机号',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }else if(!/^[0-9a-zA-Z]{6}$/.test(this.addInfo.motorId)){
                	Toast({
                        message:'发动机号输入有误',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!this.addInfo.buyTime){
                    Toast({
                        message:'请选择购车时间',
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
                this.addInfo.vin = this.addInfo.vin.toLocaleUpperCase();
                this.addInfo.motorId = this.addInfo.motorId.toLocaleUpperCase();
                if (this.editactive==-1) {
                    var editactivenum = this.ownList[this.active].seriesCode;
                    Tool.post("AaUserVehicleUpdate",{
                        id:self.addInfo.id,
                        plate_no:self.addInfo.plate,
                        Vehicle_type:self.addInfo.carSeries,
                        seriesCode:self.addInfo.code,
                        vin:self.addInfo.vin,
                        dl_engine_no:self.addInfo.motorId,
                        buyCarDate:self.addInfo.buyTime,
                        dl_type:self.addInfo.type,
                        vehicle_type_id:self.addInfo.vehicle_type_id
                    },(data)=>{
                        if (data.code==200) {
                            Toast({
                                duration:1000,
                                message:data.msg,
                            })
                            self.getCarMamList(()=>{
                                this.editactive = 0;
                                for(var i=0;i<self.ownList.length;i++){
                                    if(editactivenum && editactivenum == self.ownList[i].seriesCode){
                                        self.active = i;
                                        break;
                                    }
                                }
                            });
                        }
                        else{
                            Toast({
                                duration:1000,
                                message:data.msg,
                            })
                        }
                    })
                    return false;
                }
                Tool.post('AaUserVehicleAdd',{
                	user_id:Tool.getUserInfo('userId'),
                    plate_no:self.addInfo.plate,
                    Vehicle_type:self.addInfo.carSeries,
                    seriesCode:self.addInfo.code,
                    vin:self.addInfo.vin,
                    dl_engine_no:self.addInfo.motorId,
                    buyCarDate:self.addInfo.buyTime,
                    dl_type:self.addInfo.type,
                    vehicle_type_id:self.addInfo.vehicle_type_id
                },function(data){
                	if(data.code==200){
                    	self.getCarMamList(()=>{
                            for(var i=0;i<self.ownList.length;i++){
                                if(self.addInfo.code == self.ownList[i].seriesCode){
                                    self.active = i;
                                    break;
                                }
                            }
                        });
                	}
                	else{
                		Toast({
                            duration:1000,
                            message:data.msg,
                        })
                	}
                })
            },
            submitCarInfo:function(){
                if(!this.ownList[this.active] || !this.ownList[this.active].vin) {
                    Toast({
                        message:'请选择某一辆车',
                        duration:1000
                    });
                    return false
                }
                var data = {};
                data.plate = this.ownList[this.active].plate_no;
                data.seriesName = this.ownList[this.active].vehicle_type;
                data.vehicleTypeId = this.ownList[this.active].vehicle_type;
                data.vin = this.ownList[this.active].vin;
                data.lqsq = this.ownList[this.active].lqsq;
                data.mileage = this.ownList[this.active].mileage;
                data.seriesCode = this.ownList[this.active].seriesCode;
                data.dl_engine_no = this.ownList[this.active].dl_engine_no;
                data.dl_type = this.ownList[this.active].dl_type;
                data.id = this.ownList[this.active].vehicle_type_id;
                data.buyCarDate = this.ownList[this.active].buyCarDate;
                // this.$store.commit('SET_CARINFO',data);
                // 如果选的是默认值，那么this.carModel中的数据也得随着改
                // 选中的数据才是真的数据
                if (this.prePage=='personinfo') {
                    if(this.preCode!=data.id){
                        Toast({
                            message:'选择的车辆与购买车型不匹配!',
                            duration:1500
                        });
                        return false;
                    }
                    Tool.localItem('selectCarData',data);
                    // Tool.removeLocalItem('manmodelName');
                    // Tool.removeLocalItem('manmodel');
                    //  Tool.removeLocalItem('manmodelBack');
                     Tool.removeLocalItem('isSelectCarBack')
                	this.$router.back();
                }
                else{
                    this.carModel.displacement = data.seriesName.split(' ')[1];
                    this.carModel.vehicleModel = data.seriesName.split(' ')[0];
                    this.carModel.vehicleType = data.dl_type;
                    this.carModel.typeName = data.dl_type==0?"长安汽车":"长安欧尚";
                    this.carModel.id = data.id;
                    this.carModel.code = data.id;
                    this.carModel.pickerModel = data.seriesName
                    if (this.carModel.id) {
                        // this.setModuleInfo(this.carModel);
                        Tool.localItem('manmodel',this.carModel);
                        Tool.localItem('manmodelBack',this.carModel);
                    } //直接拉取出来的可能不在我们数据库里面所以首页不会有匹配
                    // 这个页面和usercenter都要
                    Tool.removeLocalItem('selectCarData');
                    Tool.localItem('manmodelName',data.seriesName);
                	this.$router.back();
                }
                
            },
            ...mapMutations({
                reset: 'UPDATE_RESET',
                setStoreInfo: 'SET_STORE_INFO',
                updateUserInfo: 'UPDATE_USER_INFO',
                setModuleInfo: 'SET_MODULE_INFO',
                setCarList1: 'SET_CARLIST1',
            })
        },
        components:{
            NavBar,
            BtnCom,
            Scroller,
            PackageItem,
        },
        activated:function(){
            // debugger
            var self = this;
            if(this.carSelectList[0].values.length==0){
                this.getCarList();
            }

            self.getCarMamList(()=>{
                for(var i=0;i<self.ownList.length;i++){
                    if(self.preCode && self.preCode == self.ownList[i].vehicle_type_id){
                        self.active = i;
                        break;
                    }
                }
            });
            // this.reset(true);
            // this.setStoreInfo({});
            this.updateUserInfo({refereeType:'',referee:''});
       //      if(this.$route.name == 'personinfo' || this.$route.path == '/personinfo'){
       //  		this.prePage = 'personinfo';
    			// this.preCode = this.$route.query.code; //确保前一个页面传过来的Code/车型车系与本页面选择的一致
       //      }else{
       //      	this.prePage = '';
       //      	this.preCode = '';
       //      }
            if (this.$route.query.code) {
                this.prePage = 'personinfo';
                this.preCode = this.$route.query.code; //确保前一个页面传过来的Code/车型车系与本页面选择的一致
            }else{
                this.prePage = '';
                this.preCode = '';
            }
        },
        beforeRouteEnter:(to,from,next)=>{
            if(Tool.localItem('userInfo') && Tool.getUserInfo('userId')){
                next();
            }else{
                store.commit('POP_PAGE',1);//在进入login之前把已进栈但是没有被访问的页面清理出栈
                next({name:'login',params:{to:to.path}});
            }
        },
        created:function(){
            // this.getCarList();
        },
        deactivated:function(){
            this.pickerShow = false;
        },
        
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
                color:#00bffe;
            }
        }
        .addcar-mask{
            position:absolute;
            top:0;
            bottom:0;
            left:0;
            right:0;
            background-color:rgba(0,0,0,0.5);
            z-index:1;
        }
        .addcar-dailog{
            position:absolute;
            background-color:#fff;
            width:60%;
            margin:0 20%;
            z-index:2;
            height:2.6rem;
            top:50%;
            transform:translate3d(0,-50%,0);
            padding:0.5rem 0;
            .input-control{
                input{
                    border:none;
                    font-size:0.56rem;
                    line-height:2em;
                    text-align:center;
                    outline:none;
                    width:94%;
                    border:1px solid #aaa;
                    margin: 0 3%;
                }
            }
            
            .button-group{
                position:absolute;
                bottom:0;
                height:1.2rem;
                width:100%;
                .button{
                    width:49.8%;
                    float:left;
                    background-color:rgb(0, 191, 254);
                    color:#fff;
                    font-size:0.56rem;
                    height:100%;
                    text-align:center;
                    line-height:1rem;
                    &+div{
                        margin-left:0.4%;
                    }
                }
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
                        position:relative;
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
                            margin-right:0.3rem;
                        }
                        .car-vin{
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
                            padding:0 5%;
                            .add-buttonbox{
                                margin-top:0.5rem;
                                text-align:center;
                                font-size:0.62rem;
                                color:#fff;
                                position:relative;
                                border-bottom:1px solid #efefef;
                                .add-button{
                                    float: right;
                                    height:1.2rem;
                                    width:2.2rem;
                                    line-height: 1.2rem;
                                    background-color:#fc4c1b; 
                                }
                               
                            }
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
                                .tipTitle{
                                    height:1.8rem;
                                    line-height:1.8rem;
                                    width: 22%;
                                    outline:none;
                                    border:none;
                                    background:transparent;
                                    margin-top: 2px;
                                }
                                .iconfont{
                                    position:absolute;
                                    right:0rem;
                                    line-height:1.8rem;
                                    font-size:1rem;
                                    color:#888;
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