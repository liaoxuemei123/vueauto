<template>
    <div class="page-container">
        <div class="maintainset-page page" flex="dir:top box:first">
            <select-nav 
                placeholder="搜索车型"
                :onDropDown="dropMenuShow"
                :value="pickerModel"
                :onInput="onSearch.bind(this)"
                :goBack="customBack.bind(this)"
            />
            <div class="page-content">
                <div class="up-title title">
                    <span>全国服务中心通用</span>
                </div>
                <div class="down">
                    <div class="set-item" v-for="(item, index) in setlist.down">
                        <set-item :item="item"/>
                    </div>
                </div>
                <div class="down-title title">
                    <span>指定服务中心使用</span>
                </div>
                <div class="up">
                    <div class="set-item" v-for="(item, index) in setlist.up">
                        <set-item :item="item"/>
                    </div>
                </div>
                <div class="view-title title" @click="goOrder">
                    <span>查看订单</span>
                </div>
                <transition name="fade">
                    <div class="down-list-mask" v-if="carShow" @click="carShow=false"></div>
                </transition>
                <transition name="slide-down">
                    <div class="down-list" v-if="carShow">
                        <div class="down-container">
                            <mt-picker :slots="carlist" @change="onCarChange" valueKey="name"></mt-picker>
                        </div>
                        <div class="toolbar" flex="dir:left box:mean">
                            <div class="cancel" v-tap="hide" flex="dir:left cross:center main:left">
                                取消
                            </div>
                            <div class="sure" flex="dir:left cross:center main:right" @click="submitModelInfo">
                                确定
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade">
                    <div class="search-down-list" v-if="searchShow && matchList.length > 0">
                        <div class="match-list">
                            <div class="match-item" v-for="(item,index) in matchList" @click="selectMacth(item)">
                                {{item.modelName}}
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
    import Scroller from '../components/Scroller'
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
                searchShow:false,
                carSelectList:[],
                matchList:[],
            }
        },
        components:{
            SelectNav,
            SetItem,
            Scroller
        },
        methods:{
            getPackageList:function(){
                Tool.get('getPackageList',{},(data)=>{
                    this.setlist.up = data.data.twoup;
                    this.setlist.down = data.data.twodown;
                })
            },
            hide:function(){
                this.carShow=false
            },
            onCarChange:function(picker,values){
                if(values[0]&&values[1]){
                    this.carModel.displacement = values[1].name;
                    this.carModel.vehicleModel = values[0].name;
                    this.carModel.vehicleType = values[0].type;
                    picker.setSlotValues(1,this.carData.modelList[values[0].index]);
                }
            },
            submitModelInfo:function(){
                if(this.carModel.displacement){
                    this.$store.commit('SET_PACKAGE_MODEL',this.carModel);
                }else{
                    this.carModel.displacement = this.carData.modelList[0][0].name;
                    this.carModel.vehicleModel = this.carData.seriesList[0].name;
                    this.carModel.vehicleType = this.carData.seriesList[0].type;
                    this.$store.commit('SET_PACKAGE_MODEL',this.carModel);
                }
                this.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                this.carModel = {};
                this.carShow = false;
            },
            dropMenuShow:function(){
                this.carShow = !this.carShow ;
                this.searchShow = false;
            },
            onSearch:function(e){
                if(!$(e.target).is(":focus")) return; 
                var text = $(e.target).val()
                this.pickerModel = text;
                if(text){
                    this.matchList = [];
                    for(var i = 0; i<this.carSelectList.length;i++){
                        if(this.matchList.length > 4) break;
                        if(this.carSelectList[i].modelName.indexOf(text)>=0){
                            this.matchList.push(this.carSelectList[i]);
                        }
                    }
                    if(!this.searchShow){
                        setTimeout(()=>{
                            this.searchShow = true;
                            this.carShow = false;
                        },0);
                    }
                }else{
                    this.searchShow = false;
                }
            },
            selectMacth:function(item){
                this.carModel.displacement = item.displacement;
                this.carModel.vehicleModel = item.seriesName;
                this.carModel.vehicleType = item.vehicleType;
                this.$store.commit('SET_PACKAGE_MODEL',this.carModel);
                this.pickerModel = this.carModel.vehicleModel + ' ' + this.carModel.displacement;
                this.carModel = {};
                this.searchShow = false;
            },
            getCarList:function(callback){
                Tool.get('queryCarList',{},(data)=>{
                    if(data.code == 200){
                        var seriesList = [];
                        for(var i=0;i<data.data.length;i++){
                            seriesList.push({name:data.data[i].seriesName,index:i,type:data.data[i].vehicleType})
                        }
                        var ModelList = [];
                        for(var i=0;i<data.data.length;i++){
                            ModelList[i] = [];
                            for(var j=0;j< data.data[i].modelName.length;j++){
                                ModelList[i].push({name:data.data[i].modelName[j][1]})
                            }
                        }
                        var param = {
                            seriesList:seriesList,
                            modelList:ModelList,
                        }
                        this.carData = param;
                        callback && callback();
                    }
                })
                Tool.get('getCarList',{},(data)=>{
                    if(data.code == 200){
                        this.carSelectList = data.data;
                    }
                })
            },
            initSelector:function(){
                this.getCarList(()=>{
                    this.carlist[0].values = this.carData.seriesList;
                    this.carlist[2].values = this.carData.modelList[0];
                })
            },
            goOrder:function(){
                this.$router.push({path:'myorder'});
            },
            customBack:function(){
                return false;
            }
        },
        created:function(){
            this.getPackageList();
            this.initSelector();
        },
        activated:function(){
            this.$store.commit('SET_RESET_FLAS',true);
            this.$store.commit('SET_PACKAGE_STOREINFO',{});
        },
        // beforeRouteEnter:(to,from,next)=>{
        //     Tool.routerEnter(to,from,next)
        // },
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
            overflow: hidden;
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
                .down-container{
                    padding:0 3rem;
                }
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
            .search-down-list{
                position:absolute;
                top:0rem;
                width:100%;
                background-color:#fff;
                padding:0.5rem 0rem;
                box-shadow: 0px 1px 3px #aaa;
                .match-list{
                    padding:0 5%;
                    .match-item{
                        line-height:1.5rem;
                        & + div{
                            border-top:1px solid #efefef;
                        }
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
            .view-title{
                background-color:#fff;
                box-shadow: 0px 2px 3px #ccc;
                span:before,span:after{
                    display:none;
                }
            }
            .set-item{
                height:7.7rem;
                width:49%;
                margin-bottom:0.3rem;
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