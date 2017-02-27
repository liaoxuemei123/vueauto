<template>
    <div class="page personinfo-page" flex="dir:top box:justify">
        <nav-bar
            title="填写个人信息"
            rightIcon="icon-home"
            :onRight="goHome"
        />
        <div class="page-content">
            <div class="input-container">
                <div class="input-control">
                    <inp-com title="车架号" placeholder="输入车架号" :rightArrow="true" />
                </div>
                <div class="input-control">
                    <inp-com title="发动机号" placeholder="输入发动机号后六位" :rightArrow="true" />
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
                    <inp-com title="备注" placeholder="请输入100字内留言" :rightArrow="true" />
                </div>
            </div>
        </div>
        <div class="button-control" @click="nextPage">
            <div class="next-button">
                下一步
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import InpCom from '../components/InpCom';
    export default {
        data () {
            return {

            }
        },
        components:{
            NavBar,
            InpCom
        },
        methods:{
            nextPage:function(){
                this.$router.push({name:'confirmorder'});
            },
            goHome:function(){
                this.$router.go(-2)
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
            .next-button{
                text-align:center;
                color:#fff;
                background-color:#389cf2;
                height:2.1rem;
                line-height:2.1rem;
                font-size:0.68rem;
            }
        }
    }
</style>