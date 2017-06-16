<template>
    <div class="set-container" v-tap="viewDetail.bind(this,item)" flex="dir:top box:first">
        <div class="set-image">
            <div class="image-container">
                <img v-lazy="item.packageImage">
            </div>
        </div>
        <div class="set-info" flex="dir:top cross:top box:mean">
            <div class="line" flex="dir:left cross:center">
                <span class="cut">{{item.discount}}折</span>
                <span class="des1">{{item.packageName}}</span>
            </div>
            <!--<div class="line" flex="dir:left cross:center">
                <span class="range">{{item.isUniversal|universalFilter}}</span>
            </div>-->
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
                default:{}
            }
        },
        computed:{
            ...mapState([
                'packageInfo'
            ])
        },
        methods:{
            viewDetail:function(item){
                if(this.packageInfo.modelInfo.vehicleModel && !!this.$parent.$parent.pickerModel){
                    if(this.$parent.$parent.pickerModel == (this.packageInfo.modelInfo.vehicleModel + ' ' + this.packageInfo.modelInfo.displacement)){
                        this.$router.push({path:'setdetail/'+item.id,query:item});
                        Tool.localItem('modelInfo',this.packageInfo.modelInfo);
                    }else{
                        Toast({
                            message:"车型选择错误，请重新选择",
                            position:'top',
                        });
                        $('.select-bar input').focus();
                    }
                }else{
                    Toast({
                        message:"请选择车型",
                        position:'top',
                    });
                    $('.select-bar input').focus();
                }
            },
        },
        filters:{
            universalFilter:function(val){
                if(val == 1){
                    return '全国服务门店使用'
                }else{
                    return '指定服务门店使用'
                }
            }
        }
    }
</script>
<style scoped lang="less">
    .set-container{
        height:100%;
        width:100%;
        position:relative;
        .set-image{
            background-color:#ccc;
            .image-container{
                height:5.1rem;
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
            }
        }
        .set-info{
            height:1.2rem;
            padding:0.2rem 0.5rem;
            background-color:#fff;
            .cut{
                font-size:0.51rem;
                color:#fff;
                background-color:#fc4c1d;
                padding:0.05rem 0.1rem;
                border-radius:0.1rem;
                margin-right:0.2rem;
            }
            .des1{
                font-size:0.61rem;
                color:#333;
            }
            .des2{
                font-size:0.51rem;
                color:#333;
            }
            .range{
                color:#fc4c1d;
                width:100%;
            }
        }
    }
</style>