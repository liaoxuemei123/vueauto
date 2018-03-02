<!--module是保留字，以后可能不能使用-->
<template>
    <div class="sub-page" key="miniset">
        <div class="select-car" v-tap="toggleShow">
            <div class="label">{{modelInfo.pickerModel | modelFilter}}</div>
        </div>
        <transition name="fade">
            <div class="down-list-mask" v-show="carShow" @click="carShow=false"></div>
        </transition>
        <transition name="slide-down">
            <div class="down-list" v-show="carShow">
                <div class="down-container">
                    <mt-picker :slots="carSelectList" @change="onCarChange" valueKey="name"></mt-picker>
                </div>
                <div class="toolbar" flex="dir:left box:mean">
                    <div class="cancel" v-tap="closeDialog" flex="dir:left cross:center main:left">
                        取消
                    </div>
                    <div class="sure" flex="dir:left cross:center main:right" @click="submitModelInfo">
                        确定
                    </div>
                </div>
            </div>
        </transition>
        <scroller>
            <transition name="fade">
                <div class="show-content">
                    <div class="product-class" v-for="( item , index ) in products" v-if="item.wbpkName">
                        <div class="up-title title">
                            <span>{{item.wbpkName}}</span>
                        </div>
                        <div class="up">
                            <div class="set-item" v-for="(sitem, sindex) in item.wbProducts">
                                <package-item :item="sitem"/>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </scroller>
    </div>
</template>
<style lang="less" scoped>
    .float-bottom{
        top:80%;
    }
    .sub-page{
        position: absolute;
        width:100%;
        height:100%;
        .select-car{
            position:absolute;
            top:0;
            left:0;
            right:0;
            background-color:rgba(255,255,255,0.6);
            height:1.6rem;
            line-height:1.6rem;
            text-align:center;
            z-index:1000;
            border-bottom:1px solid #d5d5d5;
            .label{
                background-color:rgba(235,235,235,0.6);
                height:1.2rem;
                margin:0.2rem 0.3rem;
                border-radius:0.15rem;
                border:1px solid #dfdfdf;
                line-height:1.2rem;
                color:#444;
            }
        }
        .down-list-mask{
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            z-index:998;
            background-color:rgba(0,0,0,0.4);
        }
        .down-list{
            position:absolute;
            top:0;
            left:0;
            right:0;
            z-index:999;
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
        .show-content{
            padding-top:1.5rem;
            .title{
                height:1.5rem;
                line-height:1.5rem;
                width:94%;
                padding:0 3%;
                text-align: center;
                font-weight: bold;
                span{
                    position:relative;
                }
                span::before,span::after{
                    content:" ";
                    display:block;
                    width:1rem;
                    height:2px;
                    background-color:#444;
                    position:absolute;
                    top:50%;
                }
                span::before{
                    left:-1.1rem;
                }
                span::after{
                    right:-1.1rem;
                }
            }
            .set-item{
                border-bottom:1px solid #efefef;
            }
        }
    }
</style>
<script>
    import Scroller from '../../components/Scroller';
    import PackageItem from '../../components/PackageItem';
    import Tool from '../../utils/Tool';
    import { mapState, mapMutations } from 'vuex';
    import { Toast } from 'mint-ui';
    import { introJs } from 'intro';
    export default {
        data () {
            return {
                products:[
                    {
                        wbpkName:'',
                        wbpkMemo:'',
                        wbpkId:'',
                        wbProducts:[
                            {
                                wbResource:{},
                            }
                        ],
                    }
                ],
                carModel:{},
                carShow: false,
                carData:{},
                carSelectList: [{
                    flex:1,
                    defaultIndex:0,
                    values:[],
                    className:'type',
                },{
                    divider:true,
                    content:'-',
                },{
                    flex:1,
                    values:[],
                    className:'serise',
                },{
                    divider:true,
                    content:'-',
                },{
                    flex:1,
                    values:[],
                    className:'moudle',
                }],
                intro:null,
            }
        },
        computed:{
            ...mapState({
                carList:({ 
                    packageinfo 
                }) => packageinfo.carList,
                modelInfo:({
                    packageinfo
                }) => packageinfo.modelInfo,
                wbyQd: ({
                    pageconfig
                }) => pageconfig.qd,
            })
        },
        components:{
            Scroller,
            PackageItem
        },
        methods:{
            closeDialog:function(){
                this.carShow = false;
            },
            getPackageList:function(wbplCx){
                var tid = this.$parent.bisinessItems[this.$parent.activeBusiness].wbyId;
                if (this.modelInfo.vehicleType == 0) {
                    tid='wcby';
                }
                if (this.modelInfo.vehicleType == 1) {
                    tid='scby';
                }
                Tool.get('wbinterface/getWbpkindList',{id:tid,Qd:this.wbyQd,wbplCx:wbplCx?wbplCx:''},(data)=>{
                    if(data.code == 200){
                        this.products = [];
                        if(!data.data) return;
                        data.data.map( v => {
                            if(v.wbProducts.length > 0 && v.wbpkName){
                                this.products.push(v);
                                this.$parent.changeActive(tid=='wcby'?0:1,false);
                            }
                        })
                    }
                })
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
                    this.setCarList(param);
                    this.carSelectList[0].values = param.type;
                    this.carSelectList[2].values = param.serise[0];
                    this.carSelectList[4].values = param.module[0][0];
                })
            },
            onCarChange:function(picker,values){
                if(values[0] && values[1] && values[2]){
                    picker.setSlotValues(1,this.carList.serise[values[0].index]);
                    picker.setSlotValues(2,this.carList.module[values[1].index.i][values[1].index.j]);
                    this.carModel.displacement = values[2].name;
                    this.carModel.vehicleModel = values[1].name;
                    this.carModel.vehicleType = values[1].type;
                    this.carModel.typeName = values[0].name;
                    this.carModel.id = values[2].id;
                    this.carModel.code = values[2].code;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                }else if(values[1] && values[2]){
                    picker.setSlotValues(1,this.carList.serise[0]);
                    picker.setSlotValues(2,this.carList.module[values[1].index.i][values[1].index.j]);
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
                     this.setModuleInfo(this.carModel);
                }else{
                    this.carModel.displacement = this.carList.module[0][0][0].name;
                    this.carModel.id = this.carList.module[0][0][0].id;
                    this.carModel.code = this.carList.module[0][0][0].code;
                    this.carModel.vehicleModel = this.carList.serise[0][0].name;
                    this.carModel.vehicleType = this.carList.serise[0][0].type;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                    this.setModuleInfo(this.carModel);
                }
                this.carShow = false;
                this.getPackageList(this.carModel.id);
                if(this.carModel.typeName === '长安欧尚'){
                    if(this.$parent.bisinessItems.length < 2){

                    }else{
                        this.$parent.changeActive(1,false);
                    }
                }
            },
            toggleShow:function(){
                this.carShow = !this.carShow;
            },
            initIntro:function(){//初始化导航js
                this.intro = new introJs();
                this.intro.setOption("doneLabel", '退出');
                this.intro.setOption("skipLabel", '跳过');
                this.intro.setOption("nextLabel", '继续');
                this.intro.setOption("prevLabel", '后退');
                this.intro.setOption("showStepNumbers", false);
                this.intro.setOption("showBullets", false);
                this.intro.setOption("hideNext", true);
            },
            ...mapMutations({
                reset: 'UPDATE_RESET',
                setStoreInfo: 'SET_STORE_INFO',
                updateUserInfo: 'UPDATE_USER_INFO',
                setModuleInfo: 'SET_MODULE_INFO',
                setCarList: 'SET_CARLIST',
            })
        },
        filters:{
            modelFilter:function(val){
                if(!val) return '请选择车型';
                return val;
            }
        },
        mounted:function(){
            this.$nextTick(()=>{
                if(this.intro)
                    this.intro.start();
                    Tool.localItem("wy_version",Tool.version);
                    $(".introjs-overlay").on("touchstart", event => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.intro.nextStep();
                        return false;
                    });
                    $(".introjs-tooltipReferenceLayer").on("touchstart", event => {
                        this.intro.nextStep();
                        return false;
                    });
            })
        },
        created:function(){
            this.getCarList();
            var recordVersion = Tool.localItem("wy_version");
            if(!recordVersion){
                this.initIntro();
            }else{
                var currentVersion = Tool.version;
                if(recordVersion != currentVersion){
                    this.initIntro();
                    Tool.localItem("wy_version",'');
                }
            }
            
        },
        activated:function(){
            this.getPackageList(this.modelInfo.id);
            this.reset(true);
            this.setStoreInfo({});
            this.updateUserInfo({refereeType:'',referee:''})
        },
        deactivated:function(){
            this.carShow = false;
        }
    }
</script>