<template>
    <div class="page-container">
        <div class="store-page page" flex="dir:top box:first">
            <search 
                placeholder="搜索店铺"
                :search="search.bind(this)"
            />
            <div class="page-content" flex="dir:top box:first">
                <div class="city-select" @click="cityShow = !cityShow">
                    <div class="input-control" flex="dir:left cross:center">
                        <input type="text" v-model="selectedCity" placeholder="请选择城市" readonly >
                    </div>
                    <i class="iconfont icon-up" v-if="cityShow"></i>
                    <i class="iconfont icon-down" v-else="cityShow"></i>
                </div>
                <div class="store-list-container" flex="dir:top">
                    <div class="container-content" flex="dir:top box:last">
                        <div class="overflow-container">
                            <div class="store-list">
                                <div class="store-item" v-for="(item, index) in storelist">
                                    <store-item :item="item" :onClick="selectItem.bind(this, index)" :active="index == select"/>
                                </div>
                            </div>
                        </div>
                        <div class="button-control">
                            <btn-com
                                title="确定"
                                background="#00bffe"
                                :onClick="submitStore"
                            />
                        </div>
                    </div>
                    <transition name="fade">
                        <div class="down-list-mask" v-if="cityShow" @click="cityShow=false"></div>
                    </transition>
                    <transition name="slide-down">
                        <div class="down-list" v-if="cityShow">
                            <mt-picker :slots="citylist" @change="onCityChange" valueKey="name"></mt-picker>
                            <div class="toolbar" flex="dir:left box:mean">
                                <div class="cancel" @click="cityShow=false" flex="dir:left cross:center main:left">
                                    取消
                                </div>
                                <div class="sure" @click="selectCity" flex="dir:left cross:center main:right">
                                    确定
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Search from '../components/Search';
    import BtnCom from '../components/BtnCom';
    import StoreItem from '../components/StoreItem';
    import Tool from '../utils/Tool';
    import { mapState } from 'vuex';
    import { Indicator, Toast } from 'mint-ui';
    export default {
        data () {
            return {
                storelist:[],
                select:0,
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
                selectedCity:''
            }
        },
        components:{
            Search,
            BtnCom,
            StoreItem
        },
        methods:{
            selectItem:function(id){
                this.select = id;
            },
            search:function(e){
                var target = $(e.target).find('input');
                this.getStoreList(target.val());
            },
            getStoreList:function(name='',callback){
                var self = this;
                console.log(this.cityInfo.lng)
                Tool.get('getStoreList',{
                    gpsLongitude:this.cityInfo.lng ||self.geolocation.point.lon,
                    gpsLatitude:this.cityInfo.lat || self.geolocation.point.lat,
                    storename:name,
                    area:this.cityInfo.code || '',
                },function(data){
                    self.storelist = data.data;
                    callback && callback();
                })
            },
            submitStore:function(){
                if(this.$store.getters.prepage[this.$store.getters.prepage.length-2].name == 'setdetail'){
                    setTimeout(()=>{
                        var data = {};
                        data.id = this.storelist[this.select].id;
                        data.storeName = this.storelist[this.select].storeName;
                        data.photoUrl = this.storelist[this.select].photoUrl;
                        this.$store.commit('SET_PACKAGE_STOREINFO',data);
                        this.$router.back();
                    })
                }else{
                    setTimeout(()=>{
                        var data = {};
                        data.id = this.storelist[this.select].id;
                        data.storeName = this.storelist[this.select].storeName;
                        data.photoUrl = this.storelist[this.select].photoUrl;
                        this.$store.commit('SET_SUBSTOREINFO',data);
                        this.$router.back();
                    })
                }
            },
            onCityChange:function(picker,values){
                if(values[0]&&values[1]){
                    this.cityInfo.province = values[0].name;
                    this.cityInfo.city = values[1].name;
                    this.cityInfo.code = values[1].id;
                    picker.setSlotValues(1,this.cityData.citys[values[0].index]);
                }

            },
            selectCity:function(){
                if(!this.cityInfo.province){
                    this.cityInfo.province = this.cityData.provinces[0].name;
                    this.cityInfo.city = this.cityData.citys[0][0].name;
                    this.cityInfo.code = this.cityData.citys[0][0].id;
                }
                this.selectedCity = this.cityInfo.province + ' ' + this.cityInfo.city;
                this.cityShow = false;
                Tool.getLocation(this.selectedCity,(data)=>{
                    if(data.result && data.result.location){
                        this.cityInfo.lat = data.result.location.lat;
                        this.cityInfo.lng = data.result.location.lng;
                    }
                    this.getStoreList();
                    this.cityInfo = {};
                })
            },
            getCityList:function(callback){
                Tool.get("queryArea",{},(data)=>{
                    var provinceList = [];
                    for(var i=0;i<data.data.length;i++){
                        provinceList.push({name:data.data[i].province,index:i})
                    }
                    var cityList = [];
                    for(var i=0;i<data.data.length;i++){
                        cityList[i] = [];
                        for(var j=0;j<data.data[i].city.length;j++){
                            cityList[i].push({name:data.data[i].city[j].regionName,id:data.data[i].city[j].id})
                        }
                    }
                    var param = {
                        provinces:provinceList,
                        citys:cityList
                    }
                    this.cityData = param;
                    callback && callback();
                })
            }
        },
        activated:function(){
            this.getStoreList('',() => {
                var storeInfo = this.$store.getters.subscribeInfo.storeInfo;
                for(var i=0;i<this.storelist.length;i++){
                    if(storeInfo.id == this.storelist[i].id){
                        this.select = i;
                        return;
                    }
                }
            });
            this.getCityList(()=>{
                this.citylist[0].values = this.cityData.provinces;
                this.citylist[2].values = this.cityData.citys[0];
            });
            this.cityInfo = {};
            this.selectedCity = '';
        },
        computed:{
            ...mapState([
                'geolocation'
            ])
        }
    }
</script>
<style lang="less" scoped>
    .page{
        height:100%;
        position:absolute;
        width:100%;
        .page-content{
            background-color: #efefef;
            height:100%;
            overflow: auto;
            .city-select{
                position:relative;
                height:1.8rem;
                line-height:1.8rem;
                background-color:#fff;
                box-shadow:0px 1px 3px #ccc;
                .input-control{
                    width:100%;
                    height:1.8rem;
                    input{
                        outline:none;
                        border:none;
                        padding:0 0.6rem;
                        width:12rem;
                    }
                }
                .iconfont{
                    position:absolute;
                    right:0.5rem;
                    top:0rem;
                }
            }
            .store-list-container{
                position:relative;
                background:transparent;
                .container-content{
                    height:100%;
                    -webkit-box-flex: 1;
                    flex-grow: 1;
                    flex-shrink: 1;
                    flex-basis: 0;
                    .overflow-container{
                        overflow:auto;
                        .store-list{
                            margin-top:0.5rem;
                        }
                    }
                }
                .down-list-mask{
                    width:100%;
                    height:100%;
                    background-color:rgba(0,0,0,0.5);
                    position:absolute;
                    top:0;
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
            }
        }
        .button-control{
            background-color:#efefef;
            color:#fff;
            font-size:0.77rem;
            overflow:hidden;
        }
    }
</style>