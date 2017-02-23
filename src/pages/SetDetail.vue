<template>
    <div class="page detail-page" flex="dir:top box:justify">
        <nav-bar
            title="套餐详情"
        />
        <div class="page-content">
            <div class="car-show">
                <div class="car-image" :style="{'background-image':'url('+ url +')'}"></div>
            </div>
            <div class="set-detail">
                <div class="line">
                    <span class="car-type">{{carInfo.carType}}</span>
                    <span class="car-brand">{{carInfo.carBrand}}</span>
                    <span class="set-name">{{carInfo.setName}}</span>
                </div>
                <div class="line">
                    <span class="car-series">{{carInfo.carSeries}}</span>
                </div>
                <div class="line">
                    <span class="explain">{{carInfo.explain}}</span>
                </div>
                <div class="line">
                    <span class="price"><span class="price-icon">￥</span>{{carInfo.price}}</span>
                </div>
            </div>
            <div class="set-explain">
                <div class="explain-item">
                    <span>检查项目：</span>
                    <p>{{setInfo.checkItem}}</p>
                </div>
                <div class="explain-item">
                    <span>更换项目：</span>
                    <p>{{setInfo.changItem}}</p>
                </div>
                <div class="explain-item">
                    <span>有效期：</span>
                    <p>{{setInfo.validate}}</p>
                </div>
                <div class="explain-item">
                    <span>VIN：</span>
                    <p>{{setInfo.VIN}}</p>
                </div>
            </div>
        </div>
        <div class="button-control">
            <btn-com
                title="确定"
                background="#fc4c1d"
                :onClick="goPersonInfo"
            />
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import BtnCom from '../components/BtnCom';
    import { mapMutations } from 'vuex';
    export default {
        data () {
            return {
                 url:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2197052797,2441326896&fm=58",
                 carInfo:{
                     carType:'乘用车',
                     carBrand:"锐驰",
                     setName:"D套餐（买三送一）",
                     carSeries:"2016款-1.6L GDI 手动 致酷型",
                     explain:"检查8项，更换4项。4次基础保养有效期3年",
                     price:460,
                 },
                 setInfo:{
                     checkItem:"冷却液检查、制动液检查、空气滤清器、制动系统检查、空气滤清器清器、驻车系统检查、燃油滤清器、机油滤清器",
                     changItem:"机油、机油滤清器、汽油滤清器、燃油滤清器",
                     validate:"2017.02.16至2020.02.16（周末、法定节假日通用）",
                     VIN:"12017021627438"
                 }
            }
        },
        components:{
            NavBar,
            BtnCom
        },
        mounted:function(){
            this.$route.params.id
        },
        methods:{
            goPersonInfo:function(){
                this.pushPage({name:'personinfo',vue:this});
            },
            ...mapMutations([
                'pushPage'
            ])
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
            .car-show{
                width:100%;
                height:8.1rem;
                background-color:#fff;
                box-shadow:0px 2px 5px #ccc;
                .car-image{
                    width:100%;
                    height:100%;
                    background-size:50%;
                    background-position:center;
                    background-repeat:no-repeat;
                    background-blend-mode:multiply;
                }
            }
            .set-detail{
                margin-top:0.14rem;
                height:4.3rem;
                width:94%;
                background-color:#fff;
                padding:0.4rem 3%;
                font-size:0.51rem;
                box-shadow:0px 2px 5px #ccc;
                .car-type{
                    font-size:0.43rem;
                    color:#fff;
                    background-color:#fc4c1d;
                    padding:0 0.1rem;
                    border-radius:0.1rem;
                    line-height:2em;
                }
                .car-brand,.set-name{
                    font-size:0.64rem;
                    font-weight:bold;
                    line-height:2em;
                }
                .explain{
                    color:#fc4c1d;
                    line-height:2em;
                }
                .price{
                    font-size:0.85rem;
                    color:#fc4c1d;
                    line-height:1.8em;
                    .price-icon{
                        font-size:0.64rem;
                    }
                }
            }
            .set-explain{
                margin-top:0.3rem;
                width:94%;
                background-color:#fff;
                padding:0.4rem 3%;
                box-shadow:0px 2px 5px #ccc;
                .explain-item{
                    p{
                        margin:0;
                        line-height:1.5em;
                        font-size:0.51rem;
                        color:#333;
                    }
                    span{
                        line-height:2em;
                        font-size:0.51rem;
                        color:#fc4c1d;
                    }
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