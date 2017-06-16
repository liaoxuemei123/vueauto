<template>
    <div class="set-container" v-tap="viewDetail.bind(this)" flex="dir:left box:first">
        <div class="set-image">
            <div class="image-container">
                <img v-lazy="item.wbResource.wbrIndeximg1?item.wbResource.wbrIndeximg1:''" v-if="item.wbResource">
            </div>
        </div>
        <div class="set-info" flex="dir:top cross:top box:mean">
            <div class="line" flex="dir:left cross:center">
                <span class="package-name">{{item.wbpName}}</span>
                <span class="sall" v-if="item.wbpYhzk">{{item.wbpYhzk}}折</span>
            </div>
            <div class="line" flex="dir:left cross:center">
                <span class="description">描述：{{item.wbpPdesc | descFilter}}</span>
            </div>
            <div class="line" flex="dir:left cross:center main:right">
                <span class="buy-it">马上购买</span>
            </div>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import { mapState } from 'vuex';
    import Tool from '../utils/Tool';
    export default {
        data () {
            return {

            }
        },
        props:{
            item:{
                type:Object,
                default:{
                }
            }
        },
        computed:{
            ...mapState([
                'packageInfo','bisinessConfig'
            ])
        },
        methods:{
            viewDetail:function(){
                var item = this.item;
                const bisiness = this.$parent.$parent.$parent.bisinessItems[this.$parent.$parent.$parent.activeBusiness].wbyId;
                for(var props in this.bisinessConfig){
                    this.bisinessConfig[props].wbyId === bisiness ? this.$store.commit("SET_PAGE_CONFIG",this.bisinessConfig[props]) : '';
                }          
                if(this.packageInfo.modelInfo.vehicleModel && !!this.$parent.$parent.pickerModel){
                    if(this.$parent.$parent.pickerModel == (this.packageInfo.modelInfo.vehicleModel + ' ' + this.packageInfo.modelInfo.displacement)){
                        this.$router.push({path:'../setdetail/'+item.wbpId});
                        this.$store.commit("SET_BISINESS_TYPE",item.wbpId);
                        Tool.localItem('modelInfo',this.packageInfo.modelInfo);
                        Tool.post('packagecount',{packageId:item.wbpId,packageName:item.wbpName,isUniversal:item.wbpSfqgty},(data)=>{})
                    }else{
                        Toast({
                            message:"车型选择错误，请重新选择",
                            duration:1000,
                        });
                        $('.select-bar input').focus();
                    }
                }else{
                    Toast({
                        message:"请选择车型",
                        duration:1000,
                    });
                    $('.select-bar input').focus();
                }
            },
        },
        filters:{
            descFilter:function(val){
                if(!val) return '暂无描述';
                return val;
            },
            priceFilter:function(val) {
                return '￥' + val;
            }
        }
    }
</script>
<style scoped lang="less">
    .set-container{
        width:94%;
        position:relative;
        background-color:#fff;
        padding:0.5rem 3%;
        .set-image{
            background-color:#ccc;
            width:6rem;
            .image-container{
                height:5rem;
                width:100%;
                position:relative;
                img{
                    width:100%;
                    height:100%;;
                }
                img[lazy=loading] {
                    position:absolute;
                    top:37.5%;
                    left:37.5%;
                    width:25%;
                    height:25%;
                }
                img[lazy=error] {
                    position:absolute;
                    width:100%;
                    height:100%;
                    background-image:url("../assets/error.png");
                    background-size:50%;
                    background-position:center;
                    background-repeat:no-repeat;
                }
            }
        }
        .set-info{
            margin-left:0.5rem;
            background-color:#fff;
            .line{
                width:100%;
                .sall{
                    font-size:0.51rem;
                    color:#fff;
                    background-color:#fc4c1d;
                    padding:0.1rem 0.2rem;
                    border-radius:0.1rem;
                }
                .package-name{
                    font-size:0.7rem;
                    color:#333;
                    margin-right:0.2rem;
                }
                .price-title{
                    font-size:0.7rem;
                    color:#333;
                }
                .package-price{
                    font-size:0.7rem;
                    color:#ff4343;
                    margin-right:0.3rem;
                    text-decoration:none;
                }
                .price-delete{
                    font-size:0.61rem;
                    color:#ddd;
                    text-decoration:line-through;
                }
                .description{
                    font-size:0.64rem;
                    color:#888;
                    margin-right:0.2rem;
                }
                .buy-it{
                    background-color:#00bffe;
                    color:#fff;
                    padding:0.2rem 0.5rem;
                    border-radius:0.2rem;
                }
            }
        }
    }
</style>