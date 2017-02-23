<template>
    <div class="store-page page" flex="dir:top box:justify">
        <search 
            placeholder="搜索店铺"
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
                background="#fc4c1d"
            />
        </div>
    </div>
</template>
<script>
    import Search from '../components/Search';
    import BtnCom from '../components/BtnCom';
    import StoreItem from '../components/StoreItem';
    export default {
        data () {
            return {
                storelist:[
                    {
                        id:1,
                        url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                        storeName: '重庆市名驿长安汽车4S店',
                        distance: '4.2km',
                        address: '重庆市南岸区弹子石国际社区福民路38号9层',
                        phone: '2431-3445287'
                    },
                    {
                        id:2,
                        url: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
                        storeName: '重庆市名驿长安汽车4S店',
                        distance: '4.2km',
                        address: '重庆市南岸区弹子石国际社区福民路38号9层',
                        phone: '2431-3445287'
                    },
                    {
                        id:3,
                        url: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                        storeName: '重庆市名驿长安汽车4S店',
                        distance: '4.2km',
                        address: '重庆市南岸区弹子石国际社区福民路38号9层',
                        phone: '2431-3445287'
                    },
                    {
                        id:4,
                        url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                        storeName: '重庆市名驿长安汽车4S店',
                        distance: '4.2km',
                        address: '重庆市南岸区弹子石国际社区福民路38号9层',
                        phone: '2431-3445287'
                    },
                    {
                        id:5,
                        url: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
                        storeName: '重庆市名驿长安汽车4S店',
                        distance: '4.2km',
                        address: '重庆市南岸区弹子石国际社区福民路38号9层',
                        phone: '2431-3445287'
                    },
                    {
                        id:6,
                        url: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                        storeName: '重庆市名驿长安汽车4S店',
                        distance: '4.2km',
                        address: '重庆市南岸区弹子石国际社区福民路38号9层',
                        phone: '2431-3445287'
                    },
                    {
                        id:7,
                        url: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                        storeName: '重庆市名驿长安汽车4S店',
                        distance: '4.2km',
                        address: '重庆市南岸区弹子石国际社区福民路38号9层',
                        phone: '2431-3445287'
                    },
                    {
                        id:8,
                        url: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
                        storeName: '重庆市名驿长安汽车4S店',
                        distance: '4.2km',
                        address: '重庆市南岸区弹子石国际社区福民路38号9层',
                        phone: '2431-3445287'
                    },
                ],
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
            }
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
            width: 95%;
            padding:1rem 2.5%;
            color:#fff;
            font-size:0.77rem;
            overflow:hidden;
            border-radius:3px;
        }
    }
</style>