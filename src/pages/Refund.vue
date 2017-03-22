<template>
    <div class="page-container">
        <div class="page refund-page" flex="dir:top box:first">
            <nav-bar
                title="申请退款"
            />
            <div class="page-content" flex="dir:top box:last">
                <div class="input-control">
                    <div class="input-container">
                        <div class="title">退款原因:</div>
                        <textarea v-model="message" rows="5" maxlength="100"></textarea>
                        <div class="input-info">
                            {{message.length}}/100
                        </div>
                    </div>
                </div>
                <div class="button-control" @click="submitRefund">
                    <div class="refund-button">提交申请</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    export default{
        data () {
            return {
                message:'',
                orderNo:'',
            }
        },
        methods:{
            submitRefund:function(){
                Tool.get('refundPay',{tradeNo:this.orderNo},(data)=>{

                });
            }
        },
        components:{
            NavBar
        },
        activated:function(){
            this.orderNo = this.$route.params.id;
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
            .input-control{
                width:100%;
                .input-container{
                    position:relative;
                    .title{
                        height:1.5rem;
                        line-height:1.5rem;
                        padding:0 0.2rem;
                        color:#888;
                        background-color:#fff;
                        border-bottom:1px solid #efefef;
                    }
                    textarea{
                        width:94%;
                        resize: none;
                        outline: none;
                        border: none;
                        padding: 0;
                        font-size: 0.51rem;
                        padding:0.43rem 3%;
                        box-shadow:0px 1px 3px #ccc;
                        line-height:1.5em;
                        color:#4b4b4b;
                    }
                    .input-info{
                        font-size: 0.51rem;
                        position:absolute;
                        bottom:0.43rem;
                        right:3%;
                        color:#08a9ef;
                    }
                }
            }
            .button-control{
                height:2rem;
                line-height:2rem;
                .refund-button{
                    background-color:#389cf2;
                    color:#fff;
                    text-align:center;
                    font-size:0.67rem;
                }
            }
        }
    }
</style>