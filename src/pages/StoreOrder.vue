<!--预约保养使用的店铺选择页面 -->
<template>
    <div class="page-container">
        <div class="store-page page" flex="dir:top box:first">
            <search 
                placeholder="搜索4S店"
                :search="search.bind(this)"
            />
            <div class="page-content" flex="dir:top box:first">
                <div class="city-select" @click="cityShow = !cityShow">
                    <div class="input-control" flex="dir:left cross:center">
                        <input type="text" v-model="selectedCity" :placeholder="defaultLocation" readonly >
                    </div>
                    <i class="iconfont icon-up" v-if="cityShow"></i>
                    <i class="iconfont icon-down" v-else="cityShow"></i>
                </div>
                <div class="store-list-container">
                    <div class="store-list" ref="$storeList">
                        <scroller>
                            <div class="store-item" v-for="(item, index) in storelist">
                                <store-item :item="item" :onClick="selectItem.bind(this, index)" :active="index == select"/>
                            </div>
                            <div class="load-more" flex="dir:top cross:center main:center" v-if="pagenation.page*pagenation.pageSize < pagenation.totalCount">
                                <div class="start-load" v-tap="getMore" v-if="loadMore">加载更多</div>
                                <div flex="dir:left cross:center" v-else="loadMore">加载中<mt-spinner type="fading-circle" :size="12" color="#6b6b6b"></mt-spinner></div>
                            </div>
                        </scroller>
                    </div>
                    <div class="button-control">
                        <btn-com
                            title="确定"
                            background="#00bffe"
                            :onClick="submitStore"
                        />
                    </div>
                    <transition name="fade">
                        <div class="down-list-mask" v-if="cityShow" @click="cityShow=false"></div>
                    </transition>
                    <transition name="slide-down">
                        <div class="down-list" v-show="cityShow">
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
    import { mapState, mapMutations } from 'vuex';
    import { Indicator, Toast } from 'mint-ui';
    import Scroller from '../components/Scroller';
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
                selectedCity:'',
                defaultLocation:'',
                pagenation:{
                    page:1,
                    pageSize:200,
                    totalCount:0,
                },
                loadMore:true,
                isSelect:false,
                wbProduct:'reservation',
            }
        },
        components:{
            Search,
            BtnCom,
            StoreItem,
            Scroller
        },
        methods:{
            selectItem:function(id){
                this.select = id;
            },
            search:function(e){
                var target = $(e.target).find('input');
                this.getStoreList();
            },
            getMore:function(){
                this.loadMore = false;
                this.pagenation.page++;
                Tool.get('getStore',{
                    gpsLongitude:this.cityInfo.lng ||this.geolocation.point.lon,
                    gpsLatitude:this.cityInfo.lat || this.geolocation.point.lat,
                    storename:this.$children[0].$refs.search.value || '',
                    area:this.cityInfo.code || '',
                    page:this.pagenation.page,
                    pageSize:this.pagenation.pageSize,
                    wbProduct:this.wbProduct,
                    city:this.geolocation.address.province,
                },(data)=>{
                    this.storelist = this.storelist.concat(data.data.data);
                    this.pagenation.totalCount = data.data.totalCount;
                    this.loadMore = true;
                },{mask:false})
            },
            getStoreList:function(callback){
                var self = this;
                this.storelist = [];
                Tool.get('getStore',{
                    gpsLongitude:this.cityInfo.lng ||self.geolocation.point.lon,
                    gpsLatitude:this.cityInfo.lat || self.geolocation.point.lat,
                    storename:this.$children[0].$refs.search.value || '',
                    area:this.isSelect ? this.cityInfo.code : '',
                    page:1,
                    pageSize:this.pagenation.pageSize,
                    wbProduct:this.wbProduct,
                    city:this.geolocation.address.province,
                },(data)=>{
                    this.storelist = data.data.data;
                    this.pagenation.totalCount = data.data.totalCount;
                    this.$nextTick(()=>{
                        if(this.$children.length > 0){
                            for(var i=0;i<this.$children.length;i++){
                                if(this.$children[i].mySroller && this.$children[i].mySroller.scrollTo){
                                    this.$children[i].mySroller.scrollTo(0,0);
                                    this.$children[i].scrollerInfo.y = 0;
                                }
                            }
                        }
                    })//使用异步，让updated里面的更新先于这里的更新
                    callback && callback();
                })
            },
            submitStore:function(){
                this.$nextTick(()=>{
                    var data = {};
                    data.id = this.storelist[this.select].id;
                    data.storeName = this.storelist[this.select].storeName;
                    data.photoUrl = this.storelist[this.select].photoUrl;
                    this.setSubscribeStoreInfo(data);
                    this.$router.back();
                })
            },
            onCityChange:function(picker,values){
                if(values[1]){
                    if(!values[0]){
                        this.cityInfo.province = this.cityData.provinces[0].name;
                        values[0] = {};
                        values[0].name = this.cityData.provinces[0].name
                        values[0].index = 0;
                    }else{
                        this.cityInfo.province = values[0].name;
                    }
                    this.cityInfo.city = values[1].name;
                    this.cityInfo.code = values[1].id;
                    picker.setSlotValues(1,this.cityData.citys[values[0].index]);
                }
            },
            selectCity:function(){
                this.isSelect = true;
                if(!this.cityInfo.province){
                    this.cityInfo.province = this.cityData.provinces[0].name;
                    this.cityInfo.city = this.cityData.citys[0][0].name;
                    this.cityInfo.code = this.cityData.citys[0][0].id;
                }
                this.selectedCity = this.cityInfo.province + ' ' + this.cityInfo.city;
                this.cityShow = false;
                this.getStoreList();
            },
            getCityList:function(callback){
                Tool.get("queryCity",{wbProduct:this.wbProduct},(data)=>{
                    var provinceList = [];
                    for(var i=0;i<data.data.length;i++){
                        provinceList.push({name:data.data[i].province,index:i})
                    }
                    var cityList = [];
                    for(var i=0;i<data.data.length;i++){
                        cityList[i] = [];
                        for(var j=0;j<data.data[i].city.length;j++){
                            cityList[i].push({name:data.data[i].city[j][1],id:data.data[i].city[j][0]})
                        }
                    }
                    var param = {
                        provinces:provinceList,
                        citys:cityList
                    }
                    this.cityData = param;
                    callback && callback();
                })
            },
            ...mapMutations({
                setSubscribeStoreInfo: 'SET_STOREINFO',
            })
        },
        updated:function(){
            if(this.$children.length > 0){
                for(var i=0;i<this.$children.length;i++){
                    if(this.$children[i].mySroller && this.$children[i].mySroller.scrollTo){
                        this.$children[i].mySroller.scrollTo(0,this.$children[i].scrollerInfo.y);
                    }
                }
            }
        },
        activated:function(){
            var $container = $(this.$refs.$storeList).parent();
            var $button = $container.find('.btn-com');
            var height = Number($container.css("height").replace('px','')) - Number($button.css("height").replace('px',''));
            $(this.$refs.$storeList).css('height',height);
            new Promise((res,rej)=>{
                this.getCityList(()=>{
                    this.citylist[0].values = this.cityData.provinces;
                    this.citylist[2].values = this.cityData.citys[0];
                    res();
                });
                this.cityInfo = {};
                this.selectedCity = '';
                this.defaultLocation = this.geolocation.address.province + ' ' + this.geolocation.address.city;
            }).then(()=>{
                return new Promise((res,rej)=>{
                    if(!this.geolocation.address.city || this.geolocation.address.city == '失败') {
                        this.cityInfo.code = '';
                        res();
                    }
                    Tool.get('getRegionCode',{city:this.geolocation.address.city},(data)=>{
                        if(data.data.length > 0){
                            this.cityInfo.code = data.data[0]
                        }
                        res();
                    })  
                })
            }).then(()=>{
                this.getStoreList(() => {
                    var storeInfo = this.storeInfo;
                    for(var i=0;i<this.storelist.length;i++){
                        if(storeInfo.id == this.storelist[i].id){
                            this.select = i;
                            return;
                        }
                    }
                });
            })
        },
        deactivated:function(){
            this.cityInfo.code = '';
            this.cityShow = false;
            this.isSelect = false;
        },
        computed:{
            ...mapState({
                geolocation: ({
                    geolocation
                }) => geolocation,
                storeInfo: ({
                    subscribe
                }) => subscribe.storeInfo
            })
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
                margin-bottom:1px;
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
                .store-list{
                    overflow:hidden;
                    height:15rem;
                    .load-more{
                        height:1.5rem;
                        background-color:#fff;
                        line-height:1.5rem;
                        .start-load{
                            width:100%;
                            text-align:center
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