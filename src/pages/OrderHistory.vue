<template>
    <div class="page order-history-page" flex="dir:top box:first">
        <nav-bar
            title="预约历史"
        />
        <div class="page-content">
            <div class="history-list">
                <div class="history-item" v-for="(item,index) in history">
                    <div class="title" flex="dir:left cross:center main:justify">
                        <div class="order-num">
                            预约编号：{{item.reservationNo}}
                        </div>
                        <div class="state">
                            {{item.reservationState | stateFilter}}
                        </div>
                    </div>
                    <div class="content">
                        <div class="plate">
                            车牌号：{{item.carNumber}}
                        </div>
                        <div class="plate">
                            预约4S店：{{item.storeName}}
                        </div>
                        <div class="plate">
                            预约时间：{{item.reservationDate}}
                        </div>
                        <div class="plate">
                            创建时间：{{item.createDate}}
                        </div>
                        <div class="plate">
                            里程：{{item.mileage}}
                        </div>
                        <div class="plate">
                            联系人：{{item.linkman}}{{'/' + item.phone}}
                        </div>
                        <div class="plate">
                            预约描述：{{item.description}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    export default {
        data () {
            return {
                history:[],
            }
        },
        components:{
            NavBar
        },
        methods:{
            getHistory:function(){
                Tool.get('ReservationOrderQuery',{
                    userId:1
                },(data) => {
                    this.history = data.data;
                })
            }
        },
        created:function(){
            this.getHistory();
        },
        filters:{
            stateFilter:function(val){
                switch(val){
                    case 0:
                        return '已提交';
                    case 1:
                        return '通过';
                    case 2:
                        return '不通过';
                }
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
            .history-list{
                .history-item{
                    background-color:#fff;
                    margin-bottom:0.5rem;
                    box-shadow:0px 1px 3px #ccc;
                    .title{
                        padding:0 3%;
                        height:1.5rem;
                        border-bottom:1px solid #efefef;
                        font-size:0.67rem;
                        font-weight:bold;
                        .state{
                            color:#ef4649;
                            font-weight:normal;
                            font-size:0.58rem;
                        }
                    }
                    .content{
                        padding:0.5rem 3%;
                        line-height:1.4em;
                    }
                }
            }
        }
    }
</style>