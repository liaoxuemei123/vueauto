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
                <div class="show-content" v-if="setlist.up.length > 0 && setlist.down.length > 0">
                    <div class="up-title title" >
                        <span>指定4S店使用</span>
                    </div>
                    <div class="up">
                        <div class="set-item" v-for="(item, index) in setlist.up">
                            <package-item :item="item"/>
                        </div>
                    </div>
                    <div class="down-title title">
                        <span>全国4S店使用<strong class="additional">&nbsp;(暂开通河南、湖南、重庆)</strong></span>
                    </div>
                    <div class="down">
                        <div class="set-item" v-for="(item, index) in setlist.down">
                            <package-item :item="item"/>
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
    export default {
        data () {
            return {
                setlist:{
                    up:[],
                    down:[]
                },
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
            ...mapState(['carCasCade','pickerModel']),
        },
        components:{
            Scroller,
            PackageItem
        },
        methods:{
            closeDialog:function(){
                this.carShow = false;
            },
            getPackageList:function(){
                Tool.get('getPackageList',{},(data)=>{
                    this.setlist.up = data.data.twoup;
                    this.setlist.down = data.data.twodown;
                })
            },
            getCarList:function(){
                // Tool.get('queryCar',{},(data)=>{
                //     Tool.localItem('carList',data);
                // })
                const data = JSON.parse(Tool.localItem('carList')).data;
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
                                name:vss[1]
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
            },
            onCarChange:function(picker,values){
                if(values[0] && values[1] && values[2]){
                    picker.setSlotValues(1,this.carCasCade.serise[values[0].index]);
                    picker.setSlotValues(2,this.carCasCade.module[values[1].index.i][values[1].index.j]);
                    this.carModel.displacement = values[2].name;
                    this.carModel.vehicleModel = values[1].name;
                    this.carModel.vehicleType = values[1].type;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                    
                }else if(values[1] && values[2]){
                    picker.setSlotValues(1,this.carCasCade.serise[0]);
                    picker.setSlotValues(2,this.carCasCade.module[values[1].index.i][values[1].index.j]);
                    this.carModel.displacement = values[2].name;
                    this.carModel.vehicleModel = values[1].name;
                    this.carModel.vehicleType = values[1].type;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                }
            },
            submitModelInfo:function(){
                if(this.carModel.displacement){
                    this.$store.commit('SET_PACKAGE_MODEL',this.carModel);
                    this.$store.commit('UPDATE_PICKERMODEL',this.carModel.pickerModel);
                }else{
                    this.carModel.displacement = this.carCasCade.module[0][0].name;
                    this.carModel.vehicleModel = this.carCasCade.serise[0].name;
                    this.carModel.vehicleType = this.carCasCade.serise[0].type;
                    this.carModel.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                    this.$store.commit('SET_PACKAGE_MODEL',this.carModel);
                    this.$store.commit('UPDATE_PICKERMODEL',this.carModel.pickerModel);
                }
                this.carModel = {};
                this.carShow = false;
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
        activated:function(){
            this.getPackageList();
            this.getCarList();
            this.$store.commit('SET_RESET_FLAS',true);
            this.$store.commit('SET_PACKAGE_STOREINFO',{});
        },
        deactivated:function(){
            this.carShow = false;
        }
    }
</script>