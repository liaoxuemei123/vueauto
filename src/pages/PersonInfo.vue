<template>
    <div class="page-container">
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
                        <inp-com title="发动机号后六位" placeholder="输入发动机号后六位" :rightArrow="true" />
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
                    <div class="input-control-custom" flex="dir:left cross:center box:justify">
                        <div class="label">验证码</div>
                        <input type="text">
                        <div class="button" flex="dir:left cross:center main:right"><span>获取验证码</span></div>
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
            .input-container{
                box-shadow:0px 2px 5px #ccc;
                .input-control{
                    margin-bottom:1px;
                }
                .input-control-custom{
                    height:1.9rem;
                    background-color:#fff;
                    margin-bottom:1px;
                    padding:0rem 0.5rem;
                    font-size:0.68rem;
                    .label{
                        margin-right:1rem;
                    }
                    input{
                        outline:none;
                        border:none;
                        font-size:0.58rem;
                    }
                    .button{
                        width:4rem;
                        text-align:right;
                        font-size:0.58rem;
                        height:1.9rem;
                        span{
                            color:#ff3b2f;
                            border:1px solid #ff3b2f;
                            padding:0.2rem 0.3rem;
                            border-radius:3px;
                        }
                    }
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