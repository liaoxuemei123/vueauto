<template>
    <div class="page-container">
        <div class="page detail-page" flex="dir:top box:first">
            <nav-bar
                title="套餐详情"
            />
            <div class="page-content" flex="dir:top box:last">
                <scroller>
                    <div class="detail-container">
                        <div class="set-container">
                            <div class="set-image">
                                <div class="image-container">
                                    <img :src="setInfo.packageImage" >
                                </div>
                            </div>
                            <div class="set-detail" flex="dir:top box:mean">
                                <div class="line" flex="dir:left cross:center">
                                    <span class="car-type">{{packageInfo.modelInfo.seriesName}}</span>
                                    <span class="des1">{{setInfo.packageName}}</span>
                                    <span class="des2">{{setInfo.isUniversal|universalFilter}}</span>
                                </div>
                                <div class="line" flex="dir:left cross:center">
                                    <span class="price-range" v-if="setDetail.price"><span class="doller">￥</span>{{setDetail.price}}</span>
                                    <span class="origin-price" v-if="setDetail.originPrice"><span class="doller">￥</span>{{setDetail.originPrice}}</span>
                                    <span class="price-range" v-else="setDetail.price"><span class="doller">￥</span>{{priceRange.minprice}}-{{priceRange.maxprice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="meal-list-container">
                            <div class="title"  v-tap.prevent="toggleMeal">
                                <span>套餐机油选择</span>
                                <span class="selected-oil" v-if="setMealList[selectMeal]">{{setMealList[selectMeal].engineOil + ' ' + setMealList[selectMeal].pieceNumber}}</span>
                                <i class="iconfont" :class="mealListShow?'icon-up':'icon-down'"></i>
                            </div>
                            <div class="meal-list" v-if="mealListShow">
                                <div class="meal-item" v-tap.prevent="selectedMeal.bind(this,index)" v-for="(item,index) in setMealList" flex="dir:left cross:center">
                                    <i class="iconfont icon-select" v-if="selectMeal == index"></i>
                                    <i class="iconfont icon-circle active" v-else="selectMeal == index"></i>
                                    <div class="oil-brand">{{item.engineOil}}</div>
                                    <div class="oil-piece">{{item.pieceNumber}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="select-store">
                            <div class="input-control">
                                <inp-com title="4S店" :value="packageInfo.storeInfo.storeName" :onClick="goStore" :readonly="true" :placeholder="storeTip" :rightArrow="true" />
                            </div>
                        </div>
                        <div class="tips" v-if="setInfo.isUniversal == 1">提示：请查看可以使用的4S店</div>
                        <!--<div class="input-container">
                            <inp-com
                                title="套餐机油选择"
                                :readonly="true"
                                :rightArrow="true"
                                placeholder="请选择机油"
                                :onClick="popOilSelect"
                                :value="setDetail.mealName"
                            />
                        </div>-->
                        <div class="info-container">
                            <div class="title">
                                套餐信息
                            </div>
                            <div class="info-content">
                                <div class="image-cotainer">
                                    <img :src="setInfo.wpUrl" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </scroller>
                <div class="button-control">
                    <div class="next-button" @click="nextPage">
                        立即购买
                    </div>
                </div>
            </div>
        </div>
        <mt-popup
            v-model="popupVisible"
            position='bottom'>
            <div class="oil-select-modal">
                <div class="title">
                    <div class="store-url">
                        <div class="image-container">
                            <img :src="setInfo.packageImage">
                        </div>
                    </div>
                    <div class="right" flex="dir:top box:mean">
                        <div class="price" flex="dir:left cross:center" v-if='setMealList[selectMeal]'>￥{{setMealList[selectMeal].unitPrice}}</div>
                        <div class="name" flex="dir:left cross:center" v-if='setMealList[selectMeal]'>已选“{{setMealList[selectMeal].engineOil+setMealList[selectMeal].pieceNumber}}”</div>
                    </div>
                    <div class="close-button" @click="popupVisible=false">
                        <i class="iconfont icon-close"></i>
                    </div>
                </div>
                <div class="oil-list-container" flex="dir:top box:last">
                    <div class="oil-list">
                        <div class="oil-class">机油种类</div>
                        <div class="oil-item" @click='selectMeal = index' :class="{'active':index==selectMeal}" flex="dir:left cross:center" v-for="(item,index) in setMealList">
                            {{item.engineOil+item.pieceNumber}}
                        </div>
                    </div>
                    <div class="button-control" @click="selectedMeal">
                        <div class="ok-button">
                            确认
                        </div>
                    </div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import InpCom from '../components/InpCom';
    import Tool from '../utils/Tool';
    import { mapState } from 'vuex';
    import { Toast } from 'mint-ui';
    import Scroller from '../components/Scroller';
    export default {
        data () {
            return {
                setInfo:{},
                popupVisible:false,
                mealListShow:false,
                priceRange:{
                    minprice:0,
                    maxprice:0,
                },
                selectMeal:-1,
                setMealList:[],
                setDetail:{
                    price:'',
                    mealId:'',
                    mealName:''
                },
                storeTip:'选择4S店',
                isSelectStore:true,
                scrollerY:0,//记录scroller的位置
            }
        },
        components:{
            NavBar,
            InpCom,
            Scroller
        },
        computed:{
            ...mapState([
                'packageInfo'
            ])
        },
        updated:function(){//IScroll滚动回之前的位置
            if(this.$children.length > 0){
                for(var i=0;i<this.$children.length;i++){
                    if(this.$children[i].mySroller && this.$children[i].mySroller.scrollTo){
                        this.$children[i].mySroller.scrollTo(0,this.$children[i].scrollerInfo.y);
                    }
                }
            }
        },
        watch:{
            'isSelectStore':function(val){
                if(val){
                    this.storeTip = '选择4S店';
                }else{
                    this.storeTip = '查看4S店';
                }
            }
        },
        methods:{
            nextPage:function(){
                if(!this.setDetail.price){
                    Toast('请选择机油');
                    return false;
                }
                if(this.setInfo.isUniversal == 2 && !this.packageInfo.storeInfo.id){
                    Toast({
                        message:'请选择4S店',
                        duration:1000,
                    });
                    return false;
                }
                this.$store.commit('SET_PACKAGE_SETINFO',this.setInfo);
                this.$store.commit('SET_PACKAGE_SETDETAIL',this.setDetail);
                this.$store.commit('SET_RESET_FLAS',false);
                this.$router.push({name:'personinfo'});
            },
            getMealList:function(callback){
                Tool.get('getSetMealList',{
                    vehicleModel:this.packageInfo.modelInfo.vehicleModel || '',
                    displacement:this.packageInfo.modelInfo.displacement || '',
                },(data)=>{
                    this.setMealList = data.data;
                    callback && callback();
                })
            },
            selectedMeal:function(index){
                this.selectMeal = index;
                var number = this.setInfo.setMealNumber - 0;
                var discount = (this.setInfo.discount - 0)/10;
                var univalent = this.setMealList[this.selectMeal].unitPrice;
                this.setDetail.price = ( number * discount * univalent ).toFixed(2);
                this.setDetail.originPrice = ( number * univalent ).toFixed(2);
                this.setDetail.mealId = this.setMealList[this.selectMeal].id;
                this.setDetail.mealName = this.setMealList[this.selectMeal].engineOil + this.setMealList[this.selectMeal].pieceNumber;
                this.popupVisible = false;
            },
            getPackage:function(id){
                Tool.get('getPackage',{id},function(data){
                    this.setInfo = data.data;
                })
            },
            getPackagePriceRange:function(){
                Tool.get('getPackagePriceRange',{
                    vehicleModel:this.packageInfo.modelInfo.vehicleModel || '',
                    displacement:this.packageInfo.modelInfo.displacement || '',
                    discount:this.setInfo.discount,
                    setMealNumber:this.setInfo.setMealNumber,
                },(data)=>{
                    this.priceRange = data.data;
                })
            },
            reSetData:function(){
                this.setMealList = [];
                this.selectMeal = -1;
                this.priceRange = {};
                this.mealListShow = false;
                this.setDetail = {
                    price:'',
                    mealId:'',
                    mealName:''
                }
                setTimeout(()=>{
                    if(this.$children.length > 0){
                        for(var i=0;i<this.$children.length;i++){
                            if(this.$children[i].mySroller && this.$children[i].mySroller.scrollTo){
                                this.$children[i].scrollerInfo.y = 0;
                                this.$children[i].mySroller.scrollTo(0,0,300);
                            }
                        }
                    }
                },0)//异步把更新放到updated之后
            },
            goStore:function(){
                this.$store.commit('SET_RESET_FLAS',false);
                if(this.isSelectStore){
                    this.$router.push({name:'store'});
                }else{
                    this.$router.push({name:'viewstore'});
                }
            },
            toggleMeal:function(){
                this.mealListShow = !this.mealListShow
            }
        },
        activated:function(){
            this.setInfo = this.$route.query;
            this.setInfo.validate = new Date().getTime();
            if(this.packageInfo.reset){
                this.reSetData();
                setTimeout(()=>{
                    this.getPackagePriceRange();
                    this.getMealList();
                },0)
            }
            if(this.setInfo.isUniversal == 2){
                this.isSelectStore = true;
            }else{
                this.isSelectStore = false;
            }
        },
        deactivated:function(){
            // if(this.$children.length > 0){
            //     for(var i=0;i<this.$children.length;i++){
            //         if(this.$children[i].mySroller && this.$children[i].mySroller.scrollTo){
            //             this.$children[i].mySroller.scrollTo(0,0);
            //         }
            //     }
            // }
        },
        filters:{
            ageFilter:function(val){
                if(val){
                    return '两年以上车龄专享'
                }else{
                    return '两年以内车龄专享'
                }
            },
            validateFilter:function(val){
                // var today = Tool.formatDate(val);
                // var endDay = (today.substring(0,4) - 0) + 3 + today.substring(4,10);today + '至' + endDay + ' (周末、法定节假日通用)';
                return '3年'
            },
            universalFilter:function(val){
                if(val == 1){
                    return '全国4S店（暂开通河南）'
                }else{
                    return '指定4S店'
                }
            }
        },
    }
</script>
<style scoped lang="less">
    .page-container{
        height:100%;
        position:absolute;
        width:100%;
        .oil-select-modal{
            width:100%;
            .title{
                width:100%;
                background-color:#fff;
                position:relative;
                height:3.8rem;
                border-bottom:1px solid #efefef;
                .image-container{
                    border-radius:0.1rem;
                    background-color:#fff;
                    position:absolute;
                    bottom:0.6rem;
                    left:3%;
                    img{
                        width:3.8rem;
                        height:3.8rem;
                        padding:0.1rem;
                    }
                }
                .right{
                    width:50%;
                    margin-left:5rem;
                    padding:0.8rem 0rem;
                    height:2.4rem;
                    font-size:0.67rem;
                    .price{
                        color:#ff4b1e;
                    }
                    .name{
                        color:#333;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
                .close-button{
                    position:absolute;
                    top:0.5rem;
                    right:0.5rem;
                    color:#666;
                }
            }
            .oil-list-container{
                height:7.6rem;
                padding:0 3%;
                background-color:fff;
                font-size:0.67rem;
                .oil-list{
                    .oil-class{
                        margin:0.5rem 0rem;
                    }
                    .oil-item{
                        display:inline-block;
                        font-size:0.58rem;
                        padding:0.15rem 0.3rem;
                        color:#333;
                        border:1px solid #c3c3c3;
                        border-radius:4px;
                        margin-right:0.3rem;
                        margin-bottom:0.3rem;
                    }
                    .oil-item.active{
                        color:#fc4c1d;
                        border:1px solid #fc4c1d;
                    }
                }
                .button-control{
                    padding:0.6rem 0rem;
                    .ok-button{
                        height:2.1rem;
                        background-color:#389cf2;
                        line-height:2.1rem;
                        text-align:center;
                        color:#fff;
                        border-radius:5px;
                    }
                }
            }
        }
    }
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
                overflow:auto;
                .set-container{
                    background-color:#fff;
                    box-shadow:0px 1px 3px #aaa;
                    .set-image{
                        .image-container{
                            height:10rem;
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
                        height:2.4rem;
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
                        .origin-price{
                            color:#888;
                            text-decoration: line-through;
                            margin-left:0.3rem;
                            .doller{
                                font-size:0.51rem;
                            }
                        }
                    }
                }    
                .input-container{
                    margin-top:0.43rem;
                }
                .tips{
                    margin: 0.5rem 0.5rem;
                    color: #fc4c1d;
                    font-size: 0.51rem;
                }
                .select-store{
                    margin-top:0.43rem;
                    box-shadow:0px 1px 3px #aaa;
                }
                .meal-list-container{
                    margin-top:0.43rem;
                    background-color:#fff;
                    box-shadow:0px 1px 3px #aaa;
                    padding:0.2rem 3% 0 3%;
                    .title{
                        height:1.6rem;
                        line-height:1.6rem;
                        font-size:0.68rem;
                        .iconfont{
                            height:1.6rem;
                            line-height:1.6rem;
                            display:inline-block;
                            float:right;
                            color:#4b4b4b;
                        }
                        .selected-oil{
                            font-size:0.57rem;
                            color:#6b6b6b;
                            margin-left:0.5rem;
                        }
                    }
                    .meal-list{
                        border-top:1px solid #d9d9d9;
                        padding-bottom:0.2rem; 
                        .meal-item{
                            height:1.5rem;
                            .iconfont{
                                font-size:0.67rem;
                                margin-right:0.4rem;
                            }
                            .icon-select{
                                color:#fc4c1d;
                            }
                            .oil-brand{
                                margin-right:0.2rem;
                            }
                            .oil-piece{
                                color:#888;
                            }
                        }
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
                        .image-cotainer{
                            width:100%;
                            img{
                                width:100%;
                            }
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