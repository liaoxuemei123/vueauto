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
            </div>
            <div class="line" flex="dir:left cross:center">
                <span class="description">{{item.wbpPdesc | descFilter}}</span>
            </div>
            <div class="line" flex="dir:left cross:center main:left">
                <span class="sall" v-if="item.wbpYhzk">{{item.wbpYhzk}}折</span>
                <span class="price">{{item.wbpPrice}}</span>
                <span class="buy-it">产品详情</span>
            </div>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import { mapState, mapMutations } from 'vuex';
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
            ...mapState({
                modelInfo:({
                    packageinfo
                }) => packageinfo.modelInfo,
                allConfig:({
                    pageconfig
                }) => pageconfig.config,
                currentBis:({
                    pageconfig
                }) => pageconfig.currentBis,
            })
        },
        methods:{
            viewDetail:function(){
                var item = this.item;
                const bisiness = this.$parent.$parent.$parent.bisinessItems[this.$parent.$parent.$parent.activeBusiness].wbyId;
                for(var props in this.allConfig){
                    if(this.allConfig[props].wbyId === bisiness){
                        var wbPageDetail = {};
                        for(var subprop in this.allConfig[props].wbPageDetail){
                            this.allConfig[props].wbPageDetail[subprop].map(v =>{
                                if( v.wbProduct == item.wbpId ){
                                    wbPageDetail[subprop] = v;
                                }
                            })
                        }
                        var all = {};
                        Tool.extends(this.allConfig[props],all);
                        const config = Object.assign(all,{wbPageDetail});
                        this.setCurrentBis(config);
                    }
                }   
                if(this.modelInfo.vehicleModel && this.modelInfo.pickerModel){
                    this.$router.push({path:'../setdetail/'+item.wbpId});
                    this.setCurrentBis({ wbpId: item.wbpId });
                    Tool.localItem('modelInfo',this.modelInfo);
                    Tool.post('packagecount',{packageId:item.wbpId,packageName:item.wbpName,isUniversal:item.wbpSfqgty},(data)=>{})
                }else{
                    this.$parent.$parent.carShow = true;
                }
            },
            ...mapMutations({
                setCurrentBis:"SET_CURRENT_BIS",
            })
        },
        filters:{
            descFilter:function(val){
                if(!val) return '暂无描述';
                return val;
            },
            priceFilter:function(val) {
                if(!val) return '0';
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
                height:4rem;
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
                position:relative;
                .sall{
                    font-size:0.51rem;
                    color:#fff;
                    background-color:#fc4c1d;
                    padding:0.1rem 0.2rem;
                    border-radius:0.1rem;
                    margin-right:0.5rem;
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
                .price{
                    color:#fc4c1d;
                }
                .description{
                    font-size:0.64rem;
                    color:#888;
                    margin-right:0.2rem;
                }
                .buy-it{
                    background-color:#fff;
                    color:#00bffe;
                    padding:0.2rem 0.5rem;
                    border-radius:0.2rem;
                    position:absolute;
                    border:1px solid #cfcfcf;
                    right:0;
                }
            }
        }
    }
</style>