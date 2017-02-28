<template>
    <div class="index-page page" flex="dir:top box:justify">
        <nav-bar 
            title="添加预约订单"
            rightContent="预约历史"
            :onRight="goHistory"
        />
        <div class="page-content">
            <mt-datetime-picker
                ref="datepicker"
                type="date"
                v-model="pickerValue"
                @confirm="onDateConfirm">
            </mt-datetime-picker>
            <div class="input-control">
                <inp-com title="车牌号" type="text" icon="icon-plate" :readonly="true" placeholder="请输入车牌号" :onClick="selectPlate.bind(this)" :onBlur="updatePlate.bind(this)" :value="subscribeInfo.plate"/>
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
                <inp-com title="联系人" type="text" icon="icon-contact" placeholder="联系人" :onBlur="updateContact.bind(this)" :value="subscribeInfo.contact"/>
            </div>
            <div class="input-control">
                <inp-com title="联系电话" type="number" icon="icon-phone" placeholder="联系电话" :onBlur="updatePhone.bind(this)" :value="subscribeInfo.phone"/>
            </div>
            <div class="input-control">
                <inp-com title="预约描述" type="text" icon="icon-comment" placeholder="预约描述" :onBlur="updateDes.bind(this)" :value="subscribeInfo.description"/>
                <div class="explain">
                    客户留言预约描述客户留言预约描述客户留言预约描述客户
                    留言预约描述客户留言预约描述客户留言预约描述客户留言
                    预约描述客户留言预约描述客户留言
                </div>
            </div>
        </div>
        <div class="button-control">
            <btn-com
                title="确定预约"
                :onClick="saveInfo"
                background="#00bffe"
            />
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
            updateContact:function(e){
                var target = $(e.target);
                this.subscribeInfo.contact = target.val();
            },
            updatePhone:function(e){
                var target = $(e.target);
                this.subscribeInfo.phone = target.val();
            },
            updateDes:function(e){
                var target = $(e.target);
                this.subscribeInfo.description = target.val();
            },
            onDateConfirm:function(val){
                this.subscribeInfo.time = Tool.formatDate(val);
            },
            selectPlate:function(val){
                this.$router.push({name:'selectplate'})
            },
            saveInfo:function(e){
                
            },
            goHistory:function(){
                this.$router.push({name:'orderhistory'});
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
            .input-control{
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
        .button-control{
            margin:0.3rem;
            color:#fff;
            font-size:0.77rem;
            overflow:hidden;
            border-radius:3px;
        }
    }
    
</style>