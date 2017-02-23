<template>
    <div class="maintainset-page page" flex="dir:top box:first">
        <search 
            placeholder="搜索套餐"
        />
        <div class="page-content">
            <div class="set-item" v-for="(item, index) in setlist">
                <set-item :item="item"  :onClick="viewDetail.bind(this,item.id)"/>
            </div>
        </div>
    </div>
</template>
<script>
    import Search from '../components/Search';
    import SetItem from '../components/SetItem';
    import { mapMutations } from 'vuex';
    export default {
        data () {
            return {
                setlist:[
                    {
                        id:1,
                        url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2197052797,2441326896&fm=58',
                        carType:'乘用车',
                        carName:'CS75 1.6手动',
                        setName:'A套餐（买二送一）',
                    },
                    {
                        id:2,
                        url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2197052797,2441326896&fm=58',
                        carType:'乘用车',
                        carName:'瑞驰 GDI手动',
                        setName:'B套餐（买三送一）',
                    },
                    {
                        id:3,
                        url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                        carType:'乘用车',
                        carName:'CS75 1.6手动',
                        setName:'A套餐（买二送一）',
                    },
                    {
                        id:4,
                        url: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
                        carType:'乘用车',
                        carName:'瑞驰 GDI手动',
                        setName:'B套餐（买三送一）',
                    },
                    {
                        id:5,
                        url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2197052797,2441326896&fm=58',
                        carType:'乘用车',
                        carName:'CS75 1.6手动',
                        setName:'A套餐（买二送一）',
                    },
                    {
                        id:6,
                        url: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
                        carType:'乘用车',
                        carName:'瑞驰 GDI手动',
                        setName:'B套餐（买三送一）',
                    },
                    {
                        id:7,
                        url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                        carType:'乘用车',
                        carName:'CS75 1.6手动',
                        setName:'A套餐（买二送一）',
                    },
                    {
                        id:8,
                        url: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
                        carType:'乘用车',
                        carName:'瑞驰 GDI手动',
                        setName:'B套餐（买三送一）',
                    },
                ]
            }
        },
        components:{
            Search,
            SetItem
        },
        methods:{
            viewDetail:function(id){
                this.pushPage({name:"setdetail",vue:this,params:{id:id}});
            },
            ...mapMutations([
                'pushPage'
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
            .set-item{
                height:7.7rem;
                width:49%;
                display:inline-block;
                margin-bottom:0.15rem;
                background-color:#fff;
            }
            .set-item:nth-child(2n){
                margin-left:2%;
            }
        }
    }
</style>