<template>
    <div class="sub-page" key="commercialset">
        <div class="select-car" v-tap="toggleShow">
            {{pickerModel | modelFilter}}
        </div>
        <transition name="fade">
            <div class="down-list-mask" v-show="carShow" @click="carShow=false"></div>
        </transition>
        <transition name="slide-down">
            <div class="down-list" v-show="carShow">
                <div class="down-container">
                    <mt-picker :slots="carlist" @change="onCarChange" valueKey="name"></mt-picker>
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
            height:1.5rem;
            line-height:1.5rem;
            text-align:center;
            z-index:1000;
            border-bottom:1px solid #d5d5d5;
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
                height:1.2rem;
                line-height:1.2rem;
                width:94%;
                padding:0 3%;
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
    import { mapState } from 'vuex';
    import { Toast } from 'mint-ui';
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
                carlist: [{
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
            }
        },
        computed:{
            ...mapState(['carCasCade','pickerModel','carId']),
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
                const id = this.$parent.bisinessItems[this.$parent.activeBusiness].wbyId;
                Tool.get('wbinterface/getWbpkindList',{id,wbplCx:wbplCx?wbplCx:''},(data)=>{
                    if(data.code == 200){
                        this.products = [];
                        data.data.map( v => {
                            if(v.wbProducts.length > 0 && v.wbpkName){
                                this.products.push(v);
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
                                })
                            })
                        })
                    })
                    var param = {
                        type,
                        serise,
                        module
                    }
                    this.$store.commit('UPDATE_CAR_CASECADE',param);
                    this.carlist[0].values = param.type;
                    this.carlist[2].values = param.serise[0];
                    this.carlist[4].values = param.module[0][0];
                })
            },
            onCarChange:function(picker,values){
                if(values[0] && values[1] && values[2]){
                    picker.setSlotValues(1,this.carCasCade.serise[values[0].index]);
                    picker.setSlotValues(2,this.carCasCade.module[values[1].index.i][values[1].index.j]);
                    this.carModel.displacement = values[2].name;
                    this.carModel.vehicleModel = values[1].name;
                    this.carModel.vehicleType = values[1].type;
                    this.carModel.typeName = values[0].name;
                    this.carModel.id = values[2].id;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                }else if(values[1] && values[2]){
                    picker.setSlotValues(1,this.carCasCade.serise[0]);
                    picker.setSlotValues(2,this.carCasCade.module[values[1].index.i][values[1].index.j]);
                    this.carModel.displacement = values[2].name;
                    this.carModel.vehicleModel = values[1].name;
                    this.carModel.vehicleType = values[1].type;
                    this.carModel.typeName = values[0].name;
                    this.carModel.id = values[2].id;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                }
            },
            submitModelInfo:function(){
                if(this.carModel.displacement){
                    this.$store.commit('SET_PACKAGE_MODEL',this.carModel);
                    this.$store.commit('UPDATE_PICKERMODEL',this.carModel.pickerModel);
                    this.$store.commit('UPDATE_CARID',this.carModel.id);
                }else{
                    this.carModel.displacement = this.carCasCade.module[0][0][0].name;
                    this.carModel.id = this.carCasCade.module[0][0][0].id;
                    this.carModel.vehicleModel = this.carCasCade.serise[0][0].name;
                    this.carModel.vehicleType = this.carCasCade.serise[0][0].type;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                    this.$store.commit('SET_PACKAGE_MODEL',this.carModel);
                    this.$store.commit('UPDATE_PICKERMODEL',this.carModel.pickerModel);
                    this.$store.commit('UPDATE_CARID',this.carModel.id);
                }
                this.carShow = false;
                this.getPackageList(this.carModel.id);
                if(this.carModel.typeName === '轿车'){
                    this.$parent.changeActive(0);
                }
            },
            toggleShow:function(){
                this.carShow = !this.carShow;
            },
        },
        filters:{
            modelFilter:function(val){
                if(!val) return '请选择车型';
                return val;
            }
        },
        created:function(){
            this.getCarList();
        },
        activated:function(){
            this.getPackageList(this.carId);
            this.$store.commit('SET_RESET_FLAS',true);
            this.$store.commit('SET_PACKAGE_STOREINFO',{});
        },
        deactivated:function(){
            this.carShow = false;
        }
    }
</script>