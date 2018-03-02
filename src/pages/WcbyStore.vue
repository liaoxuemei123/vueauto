<template>
    <div class="page-container">
        <div class="store-page page" flex="dir:top box:first">
            <self-search 
                placeholder="搜索服务门店"
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
                <div class="store-list-container" flex="dir:top">
                    <div class="container-content" flex="dir:top box:mean">
                        <div class="overflow-container" flex="dir:top box:mean">
                            <scroller>
                                <div class="store-item" v-for="(item, index) in storelist">
                                    <view-store-item :item="item"/>
                                </div>
                                <div class="load-more" flex="dir:top cross:center main:center" v-if="(pagenation.page + 1) * pagenation.pageSize < pagenation.totalCount">
                                    <div class="start-load" v-tap="getMore" v-if="loadMore">加载更多</div>
                                    <div flex="dir:left cross:center" v-else="loadMore">加载中<mt-spinner type="fading-circle" :size="12" color="#6b6b6b"></mt-spinner></div>
                                </div>
                            </scroller>
                        </div>
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
    import SelfSearch from '../components/SelfSearch';
    import BtnCom from '../components/BtnCom';
    import ViewStoreItem from '../components/ViewStoreItem';
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
                isSelect:false,
                pagenation:{
                    page:1,
                    pageSize:200,
                    totalCount:0,
                },
                loadMore:true,
            }
        },
        components:{
            SelfSearch,
            BtnCom,
            ViewStoreItem,
            Scroller
        },
        computed:{
            ...mapState({
                mode:({
                    routes
                }) => routes.mode,
                wbyQd: ({
                    pageconfig
                }) => pageconfig.qd,

            })
        },
        computed:{
            ...mapState([
                'geolocation'
            ])
        },
        methods:{
            search:function(e){
                var target = $(e.target).find('input');
                this.getStoreList();
            },
            getMore:function(){
                this.loadMore = false;
                this.pagenation.page++;
                var wbpId = this.$route.query.wbpId;
                // var wbpId = 'f7491065-5c6e-11e7-8995-3464a93301f7';
                


                Tool.get('getStore',{
                    gpsLongitude:this.cityInfo.lng ||this.geolocation.point.lon,
                    gpsLatitude:this.cityInfo.lat || this.geolocation.point.lat,
                    storename:this.$children[0].$refs.search.value || '',
                    area:this.isSelect ? this.cityInfo.code : '',
                    flag:1,
                    city:this.geolocation.address.province,
                    wbProduct:wbpId,
                    page:this.pagenation.page,
                    pageSize:this.pagenation.pageSize
                },(data)=>{
                    this.storelist = this.storelist.concat(data.data.data);
                    this.pagenation.totalCount = data.data.totalCount;
                    this.loadMore = true;
                },{mask:false})
            },
            getStoreList:function(name='',callback){
                var self = this;
                var wbpId = this.$route.query.wbpId;
                // var wbpId = 'f7491065-5c6e-11e7-8995-3464a93301f7';
                this.pagenation.page = 0;
                Tool.get('getStore',{
                    gpsLongitude:this.cityInfo.lng ||self.geolocation.point.lon,
                    gpsLatitude:this.cityInfo.lat || self.geolocation.point.lat,
                    storename:this.$children[0].$refs.search.value || '',
                    area:this.isSelect ? this.cityInfo.code : '',
                    flag:1,
                    city:this.geolocation.address.province,
                    wbProduct:wbpId,
                    page:this.pagenation.page,
                    pageSize:this.pagenation.pageSize
                },(data)=>{
                    this.storelist = [];
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
                // Tool.getLocation(this.selectedCity,(data)=>{
                //     if(data.result && data.result.location){
                //         this.cityInfo.lat = data.result.location.lat;
                //         this.cityInfo.lng = data.result.location.lng;
                //     }
                this.getStoreList();
                //this.cityInfo.province = '';
                // })
            },
            getCityList:function(callback){
                var id = this.$route.query.wbpId;
                // var id = 'f7491065-5c6e-11e7-8995-3464a93301f7';
                Tool.get("queryCity",{wbProduct:id},(data)=>{
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
                setLocation: 'SET_LOCATION',
            })
        },
        created:function(){
            try{
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition((position) => {
                    this.setLocation(position);
                    this.defaultLocation = this.geolocation.address.province + ' ' + this.geolocation.address.city;
                    this.getStoreList();
                    // debugger
                    if(this.$route.name != 'index' && this.$route.name !='selectplate' && position.address.city) {
                        Tool.post("citycount",{city:position.address.city,province:position.address.province},(data)=>{})
                    }
                }); 
            }catch(e){
                console.warn(e);
            }
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
           
            // this.getStoreList();
            this.getCityList(()=>{
                this.citylist[0].values = this.cityData.provinces;
                this.citylist[2].values = this.cityData.citys[0];
            });
            this.cityInfo = {};
            this.selectedCity = '';
            this.defaultLocation = this.geolocation.address.province + ' ' + this.geolocation.address.city;
        },
        deactivated:function(){
            this.cityInfo.code = '';
            this.cityShow = false;
            this.isSelect = false;
            this.pagenation.page = 0;
        },
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
                    border-bottom:1px solid #ccc;
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
                        overflow:hidden;
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