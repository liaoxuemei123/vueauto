<template>
    <div class="index-page page" flex="dir:top box:first">
        <nav-bar 
            title="添加预约订单"
        />
        <div class="page-content">
            <mt-datetime-picker
                ref="datepicker"
                type="date"
                v-model="pickerValue"
                @confirm="onDateConfirm">
            </mt-datetime-picker>
            <div class="input-control">
                <inp-com title="车牌号" type="text" icon="icon-plate" placeholder="请输入车牌号" :onBlur="updatePlate.bind(this)" :value="subscribeInfo.plate"/>
            </div>
            <div class="input-control">
                <inp-com title="预约时间" :readonly="true" type="text" icon="icon-time" placeholder="请选择到店时间" :onClick="selectTime" :value="subscribeInfo.time"/>
            </div>
            <div class="input-control">
                <inp-com title="4S店选择" type="text" icon="icon-store" placeholder="请选择服务商" :onClick="goStore" :value="subscribeInfo.storeId"/>
            </div>
            <div class="input-control">
                <inp-com title="预约里程" type="number" icon="icon-mile" placeholder="里程" :onBlur="updateMile.bind(this)" :value="subscribeInfo.mile"/>
                <div class="explain">
                    客户留言预约描述客户留言预约描述客户留言预约描述客户
                    留言预约描述客户留言预约描述客户留言预约描述客户留言
                    预约描述客户留言预约描述客户留言
                </div>
            </div>
            <div class="input-control">
                <inp-com title="联系人" type="text" icon="icon-contact" placeholder="联系人" :value="subscribeInfo.contact"/>
            </div>
            <div class="input-control">
                <inp-com title="联系电话" type="number" icon="icon-phone" placeholder="联系电话" :value="subscribeInfo.phone"/>
            </div>
            <div class="input-control">
                <inp-com title="预约描述" type="text" icon="icon-comment" placeholder="预约描述" :value="subscribeInfo.description"/>
                <div class="explain">
                    客户留言预约描述客户留言预约描述客户留言预约描述客户
                    留言预约描述客户留言预约描述客户留言预约描述客户留言
                    预约描述客户留言预约描述客户留言
                </div>
            </div>
            <div class="button-control">
                 <btn-com
                    title="确定预约"
                    :onClick="saveInfo"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import BtnCom from '../components/BtnCom';
    import InpCom from '../components/InpCom';
    import { mapMutations, mapState } from 'vuex';
    import Tool from '../utils/Tool'
    export default{
        data () {
            return {
                pickerValue:Tool.getCurrentDate(),
            }
        },
        computed:{
            ...mapState([
                'subscribeInfo',
            ])
        },
        methods:{
            goStore:function(){
                this.$router.push({name:'store'});
            },
            selectTime:function(){
                this.$refs.datepicker.open();
            },
            updatePlate:function(e){
                var target = $(e.target);
                this.subscribeInfo.plate = target.val();
            },
            updateMile:function(e){
                var target = $(e.target);
                this.subscribeInfo.mile = target.val();
            },
            onDateConfirm:function(val){
                this.subscribeInfo.time = Tool.formatDate(val);
            },
            saveInfo:function(e){
                
            },
            ...mapMutations([
                'updateSubscribeInfo',
            ])
        },
        components:{
            NavBar,
            BtnCom,
            InpCom,
        }
    }
</script>
<style scoped lang="less">
    .page{
        height:100%;
        position:absolute;
        width:100%;
        .page-content{
            background-color: #efefef;
            height:100%;
            overflow: auto;
            .button-control{
                background-color:#fc4c1d;
                width: 95%;
                margin:1rem 2.5%;
                color:#fff;
                font-size:0.77rem;
                overflow:hidden;
                border-radius:3px;
            }
            .input-control{
                width: 95%;
                margin:0.4rem 2.5%;
                overflow:hidden;
                border-radius:3px;
                box-shadow:0px 2px 3px #ccc;
                .explain{
                    background-color:#f8f8f8;
                    padding:0.43rem 0.43rem 0.43rem 1.28rem;
                    font-size:0.51rem;
                    color:#6b6b6b;
                    line-height: 1.5em;
                    p{
                        margin:0;
                    }
                }
            }
        }
    }
    
</style>