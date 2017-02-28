<template>
    <div class="store-page page" flex="dir:top box:justify">
        <search 
            placeholder="搜索店铺"
            :search="search.bind(this)"
        />
        <div class="page-content">
            <div class="store-list">
                <div class="store-item" v-for="(item, index) in storelist">
                    <store-item :item="item" :onClick="selectItem.bind(this, item.id)" :active="item.id == select"/>
                </div>
            </div>
        </div>
        <div class="button-control">
            <btn-com
                title="确定"
                background="#00bffe"
            />
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
            getStoreList:function(name=''){
                var self = this;
                Tool.get('getStoreList',{
                    gpsLongitude:self.geolocation.point.lon,
                    gpsLatitude:self.geolocation.point.lat,
                    storename:name,
                },function(data){
                    self.storelist = data.data;
                })
            }
        },
        created:function(){
            this.getStoreList();
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
        }
        .button-control{
            background-color:#efefef;
            color:#fff;
            font-size:0.77rem;
            overflow:hidden;
        }
    }
</style>