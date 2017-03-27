<template>
    <div class="page-container">
        <div class="page scroller-page" flex="dir:top box:first">
            <nav-bar
                title="测试Scroller"
            />
            <div class="page-content">
                <scroller>
                    <div class="item" v-for="(item,index) in orderList">
                        <order-item :item="item"></order-item>
                    </div>
                </scroller>
                <div class="info-item">
                <div class="item-name">保养项目：</div>
                    <div class="info">
                        {{setInfo.packageContent}}
                    </div>
                </div>
                <div class="info-item">
                    <div class="item-name">有效期：</div>
                    <div class="info">
                        {{setInfo.validate|validateFilter}}
                    </div>
                </div>
                <div class="info-item">
                    <div class="item-name">适用范围：</div>
                    <div class="info">
                        {{setInfo.isUniversal|universalFilter}}
                    </div>
                </div>
                <div class="info-item">
                    <div class="item-name">使用方法：</div>
                    <div class="info">
                        到店保养前告知服务顾问已购买套餐即可使用
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    //IScroll 测试文件
    import Scroller from '../components/Scroller';
    import NavBar from '../components/NavBar';
    import OrderItem from '../components/OrderItem';
    import Tool from '../utils/Tool';
    export default {
        data () {
            return {
                orderList:[],
            }
        },
        components:{
            Scroller,
            NavBar,
            OrderItem
        },
        activated:function(){
            Tool.get('AaPackageOrderQuery',{
                userId:Tool.getUserInfo('userId'),
                status:'',
                page:1,
                pageSize:20,
            },(data)=>{
                this.orderList = data.data.data;
            });
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
            overflow: hidden;
            position:relative;
        }
    }
</style>