<template>
    <div class="page personinfo-page" flex="dir:top box:justify">
        <nav-bar
            title="填写个人信息"
        />
        <div class="page-content">
            <div class="input-container">
                <div class="input-control">
                    <inp-com title="车架号" placeholder="输入车架号" :rightArrow="true" />
                </div>
                <div class="input-control">
                    <inp-com title="服务商" placeholder="选择服务商" :rightArrow="true" />
                </div>
                <div class="input-control">
                    <inp-com title="姓名" placeholder="输入姓名" :rightArrow="true" />
                </div>
                <div class="input-control">
                    <inp-com title="手机号" placeholder="输入手机号" :rightArrow="true" />
                </div>
                <div class="input-control">
                    <inp-com title="留言" placeholder="请输入100字内留言" :rightArrow="true" />
                </div>
            </div>
        </div>
        <div class="button-control">
            <btn-com
                title="下一步"
                :onClick="goConfirmOrder"
            />
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import BtnCom from '../components/BtnCom';
    import InpCom from '../components/InpCom';
    export default {
        data () {
            return {

            }
        },
        components:{
            NavBar,
            BtnCom,
            InpCom
        },
        methods:{
            goConfirmOrder:function(){
                this.$router.push({name:'confirmorder'});
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
            .input-container{
                box-shadow:0px 2px 5px #ccc;
                .input-control{
                    margin-bottom:1px;
                }
            }
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