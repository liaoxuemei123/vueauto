<template>
    <div class="page detail-page" flex="dir:top box:justify">
        <nav-bar
            title="套餐详情"
        />
        <div class="page-content" flex="dir:top box:first">
            <div class="detail-container">
                <div class="set-container">
                    <div class="set-image">
                        <div class="image-container">
                            <img v-lazy="url" >
                        </div>
                    </div>
                    <div class="set-detail" flex="dir:top box:mean">
                        <div class="line" flex="dir:left cross:center">
                            <span class="car-type">{{carInfo.carType}}</span>
                            <span class="des1">{{carInfo.des1}}</span>
                            <span class="des2">({{carInfo.des2}})</span>
                        </div>
                        <div class="line" flex="dir:left cross:center">
                            <span class="set-content">{{carInfo.setContent}}</span>
                        </div>
                        <div class="line" flex="dir:left cross:center">
                            <span class="price-range"><span class="doller">￥</span>{{carInfo.priceMin}}-{{carInfo.priceMax}}</span>
                        </div>
                    </div>
                </div>
                <div class="input-container">
                    <inp-com
                        title="套餐机油选择"
                        :readonly="true"
                        :rightArrow="true"
                        placeholder="xx机油"
                    />
                </div>
            </div>
            <div class="info-container">
                <div class="title">
                    套餐信息
                </div>
                <div class="info-content">
                    <div class="info-item">
                        <div class="item-name">保养项目：</div>
                        <div class="info">
                            {{setInfo.checkItem}}
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="item-name">有效期：</div>
                        <div class="info">
                            {{setInfo.validate}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-control">
            <div class="next-button" @click="nextPage">
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
                 url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488173505569&di=170b50bcd13d72f52430ec115e0949f4&imgtype=0&src=http%3A%2F%2Fs4.sinaimg.cn%2Fmw690%2F001hYbJBgy6DCQkjv4Dc3%26690",
                 carInfo:{
                     carType:'逸动V7',
                     des1:"四次基础保养",
                     des2:"两年以上车龄专享",
                     setContent:"检查8项，更换4项。有效期3年，全国4S店通用",
                     priceMin:420,
                     priceMax:460,
                 },
                 setInfo:{
                     checkItem:"机油、机油滤清器、汽油滤清器、全车工时费",
                     validate:"2017.02.16至2020.02.16（周末、法定节假日通用）",
                 }
            }
        },
        components:{
            NavBar,
            InpCom
        },
        mounted:function(){
            this.$route.params.id
        },
        methods:{
            nextPage:function(){
                this.$router.push({name:'personinfo'});
            }
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
            .detail-container{
                box-shadow:0px 1px 3px #aaa;
                .set-container{
                    background-color:#fff;
                    box-shadow:0px 1px 3px #aaa;
                    .set-image{
                        .image-container{
                            height:7.7rem;
                            background-color:#ccc;
                            position:relative;
                            img{
                                width:100%;
                                height:100%;
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
                    .set-detail{
                        height:3.3rem;
                        padding:0.4rem 0.5rem;
                        font-size:0.51rem;
                        .car-type,.des1{
                            font-size:0.67rem;
                            color:#333333;
                            font-weight:bold;
                            margin-right:0.2rem;
                        }
                        .des2{
                            color:#fd3c2d;
                            font-size:0.57rem;
                        }
                        .set-content{
                            color:#666;
                            font-size:0.57rem;
                        }
                        .price-range{
                            color:#fd3c2d;
                            font-size:0.67rem;
                            font-weight:bold;
                            .doller{
                                font-size:0.51rem;
                            }
                        }
                    }
                }    
                .input-container{
                    margin-top:0.43rem;
                }
            }
            .info-container{
                background-color:#fff;
                margin-top:0.43rem;
                overflow:auto;
                .title{
                    font-size:0.68rem;
                    line-height:3em;
                    margin:0 0.5rem;
                    border-bottom:1px solid #ccc;
                }
                .info-content{
                    padding:0.4rem 0.5rem;
                    .info-item{
                        .item-name{
                            color:#fd3c2d;
                            font-weight:bold;
                            line-height:2em;
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