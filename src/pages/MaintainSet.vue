<template>
    <div class="page-container">
        <div class="maintainset-page page" flex="dir:top box:first">
            <select-nav 
                placeholder="搜索套餐"
                :onDropDown="dropMenuShow"
                :value="pickerModel"
            />
            <div class="page-content">
                <div class="up-title title">
                    <span>两年以上车龄专享</span>
                </div>
                <div class="up">
                    <div class="set-item" v-for="(item, index) in setlist.up">
                        <set-item :item="item"  :onClick="viewDetail.bind(this,item)"/>
                    </div>
                </div>
                <div class="down-title title">
                    <span>两年以内车龄专享</span>
                </div>
                <div class="down">
                    <div class="set-item" v-for="(item, index) in setlist.down">
                        <set-item :item="item"  :onClick="viewDetail.bind(this,item)"/>
                    </div>
                </div>
                <transition name="fade">
                    <div class="down-list-mask" v-if="carShow" @click="carShow=false"></div>
                </transition>
                <transition name="slide-down">
                    <div class="down-list" v-if="carShow">
                        <mt-picker :slots="carlist" @change="onCarChange" valueKey="name"></mt-picker>
                        <div class="toolbar" flex="dir:left box:mean">
                            <div class="cancel" @click="carShow=false" flex="dir:left cross:center main:left">
                                取消
                            </div>
                            <div class="sure" flex="dir:left cross:center main:right" @click="submitModelInfo">
                                确定
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import SelectNav from '../components/SelectNav';
    import SetItem from '../components/SetItem';
    import Tool from '../utils/Tool';
    import { Toast } from 'mint-ui';
    const defaultI = 0;
    export default {
        data () {
            return {
                setlist:{
                    up:[],
                    down:[]
                },
                carData:{},
                carlist:[
                    {
                        flex:1,
                        defaultIndex:defaultI,
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
                carModel:{},
                carShow:false,
                pickerModel:'',
            }
        },
        components:{
            SelectNav,
            SetItem
        },
        methods:{
            viewDetail:function(item){
                if(this.pickerModel){
                    this.$router.push({path:'setdetail/'+item.id,query:item});
                }else{
                    Toast("请选择车型");
                }
            },
            getPackageList:function(){
                Tool.get('getPackageList',{},(data)=>{
                    this.setlist.up = data.data.twoup;
                    this.setlist.down = data.data.twodown;
                })
            },
            onCarChange:function(picker,values){
                if(values[0]&&values[1]){
                    this.carModel.modelId = values[1].id;
                    this.carModel.modelName = values[1].name;
                    this.carModel.seriesName = values[0].name;
                    picker.setSlotValues(1,this.carData.modelList[values[0].index]);
                }
            },
            submitModelInfo:function(){
                if(this.carModel.modelId){
                    this.$store.commit('SET_PACKAGE_MODEL',this.carModel);
                }else{
                    this.carModel.modelId = this.carData.modelList[0][0].id;
                    this.carModel.modelName = this.carData.modelList[0][0].name;
                    this.carModel.seriesName = this.carData.seriesList[0].name;
                    this.$store.commit('SET_PACKAGE_MODEL',this.carModel);
                }
                this.pickerModel = this.carModel.seriesName + ' ' + this.carModel.modelName;
                this.carModel = {};
                this.carShow = false;
            },
            dropMenuShow:function(){
                this.carShow = !this.carShow ;
            },
            getCarList:function(callback){
                Tool.get('queryCarList',{},(data)=>{
                    var seriesList = [];
                    for(var i=0;i<data.data.length;i++){
                        seriesList.push({name:data.data[i].seriesName,index:i})
                    }
                    var ModelList = [];
                    for(var i=0;i<data.data.length;i++){
                        ModelList[i] = [];
                        for(var j=0;j< data.data[i].modelName.length;j++){
                            ModelList[i].push({name:data.data[i].modelName[j].displacement,id:data.data[i].modelName[j].modelId})
                        }
                    }
                    var param = {
                        seriesList:seriesList,
                        modelList:ModelList,
                    }
                    this.carData = param;
                    callback && callback();
                })
            },
            initSelector:function(){
                this.getCarList(()=>{
                    this.carlist[0].values = this.carData.seriesList;
                    this.carlist[2].values = this.carData.modelList[0];
                })
            }
        },
        created:function(){
            this.getPackageList();
            this.initSelector();
        },
        activated:function(){
            this.$store.commit('SET_RESET_FLAS',true);
            this.$store.commit('SET_PACKAGE_STOREINFO',{});
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
            position:relative;
            .down-list-mask{
                position:absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                background-color:rgba(0,0,0,0.5);
            }
            .down-list{
                position:absolute;
                top:0rem;
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
            .title{
                height:1.7rem;
                line-height:1.7rem;
                text-align:center;
                font-size:0.64rem;
                color:#343434;
                span{
                    position:relative;
                }
                span:before,span:after{
                    position:absolute;
                    content:' ';
                    display:block;
                    width:0.6rem;
                    height:1px;
                    background-color:#09abec;
                    top:50%;
                }
                span:before{
                    left:-1rem;
                }
                span:after{
                    right:-1rem;
                }
            }
            .set-item{
                height:7.7rem;
                width:49%;
                display:inline-block;
                background-color:#fff;
                box-shadow:0px 2px 3px #ccc;
            }
            .set-item:nth-child(2n){
                margin-left:2%;
            }
        }
    }
</style>