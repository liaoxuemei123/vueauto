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
                        <input type="text" placeholder="请选择城市"readonly >
                    </div>
                    <i class="iconfont icon-up" v-if="cityShow"></i>
                    <i class="iconfont icon-down" v-else="cityShow"></i>
                </div>
                <div class="store-list-container">
                    <div class="container-content" flex="dir:top box:last">
                        <div class="store-list">
                            <div class="store-item" v-for="(item, index) in storelist">
                                <store-item :item="item" :onClick="selectItem.bind(this, item.id)" :active="item.id == select"/>
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
                            <mt-picker :slots="citylist" @change="onCityChange"></mt-picker>
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
    import cityList from '../js/citylist';
    const defaultI = 1;
    export default {
        data () {
            return {
                storelist:[],
                select:0,
                cityShow:false,
                citylist:[
                    {
                        flex:1,
                        defaultIndex:defaultI,
                        values:Object.keys(cityList),
                        className:'province',
                    },{
                        divider:true,
                        content:'-'
                    },{
                        flex:1,
                        values:Object.keys(cityList[Object.keys(cityList)[defaultI]]),
                        className:'city'
                    },{
                        divider:true,
                        content:'-'
                    },{
                        flex:1,
                        values:cityList[Object.keys(cityList)[defaultI]][Object.keys(cityList[Object.keys(cityList)[defaultI]])[0]],
                        className:'detail'
                    }
                ]
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
                Tool.get('getStoreList',{
                    gpsLongitude:self.geolocation.point.lon,
                    gpsLatitude:self.geolocation.point.lat,
                    storename:name,
                },function(data){
                    self.storelist = data.data;
                    callback && callback();
                })
            },
            submitStore:function(){
                var data = {};
                data.id = this.storelist[this.select].id;
                data.storeName = this.storelist[this.select].storeName;
                this.$store.commit('SET_SUBSTOREINFO',data);
                this.$router.back();
            },
            onCityChange:function(picker,values){
                var city;
                if(!values[0]){
                    city = Object.keys(cityList[Object.keys(cityList)[this.citylist[0].defaultIndex]])
                    picker.setSlotValues(1,city);
                    picker.setSlotValues(2,cityList[Object.keys(cityList)[this.citylist[0].defaultIndex]][[values[1]]]);
                }else{
                    city = Object.keys(cityList[values[0]])
                    picker.setSlotValues(1,city);
                    picker.setSlotValues(2,cityList[values[0]][[values[1]]]);
                }
            }
        },
        created:function(){
            this.getStoreList('',() => {
                var storeInfo = this.$store.getters.subscribeInfo.storeInfo;
                for(var i=0;i<this.storelist.length;i++){
                    if(storeInfo.id == this.storelist[i].id){
                        this.select = i;
                        return;
                    }
                }
            });
        },
        computed:{
            ...mapState([
                'geolocation'
            ])
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
                    .store-list{
                        margin-top:0.5rem;
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