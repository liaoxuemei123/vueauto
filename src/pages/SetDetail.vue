<template>
    <div class="page-container">
        <div class="page detail-page" flex="dir:top box:first">
            <nav-bar
                title="套餐详情"
            />
            <div class="page-content" flex="dir:top box:last">
                <scroller ref="scroller">
                    <div class="detail-container">
                        <div class="set-container">
                            <div class="set-image">
                                <swiper>
                                    <div class="swiper-slide" v-for="(item,index) in setResource.indexImgs">
                                        <img :src="item" >
                                    </div>
                                </swiper>
                            </div>
                            <div class="set-detail">
                                <div class="line" flex="dir:left cross:center">
                                    <span class="des1">{{setInfo.wbpName}}</span>
                                </div>
                                <div class="line" flex="dir:left cross:center">
                                    <span class="des2">{{setResource.ad}}</span>
                                </div>
                                <div class="line" flex="dir:left cross:center">
                                    <span class="price-range"><span class="doller">￥</span>{{showPrice | priceFilter}}</span>
                                    <span class="price-range" v-if="rangePrice > 0">&nbsp;-&nbsp;<span class="doller">￥</span>{{rangePrice | priceFilter}}</span>
                                    <span class="origin-price"><span class="doller" v-if="deletePrice">￥</span>{{deletePrice | priceFilter}}</span>
                                </div>
                            </div>
                        </div>
                        <div v-for="(item,index) in pageConfig.fileds" v-show="pageConfig.fileds.length > 0">
                            <div class="meal-list-container" v-if="item == 'meal' && pageConfig.tags[index] == 1">
                                <div class="title"  v-tap.prevent="toggleMeal">
                                    <span>套餐机油选择</span>
                                    <span class="selected-oil" v-if="setMealList[selectMeal]">{{setMealList[selectMeal].wbplJyName + ' ' + setMealList[selectMeal].wbplJyXh}}</span>
                                    <i class="iconfont" :class="mealListShow?'icon-up':'icon-down'"></i>
                                </div>
                                <div class="meal-list" v-if="mealListShow">
                                    <div class="meal-item" v-tap.prevent="selectedMeal.bind(this,index)" v-for="(item,index) in setMealList" flex="dir:left cross:center">
                                        <i class="iconfont icon-select" v-if="selectMeal == index"></i>
                                        <i class="iconfont icon-circle active" v-else="selectMeal == index"></i>
                                        <div class="oil-brand">{{item.wbplJyName}}</div>
                                        <div class="oil-piece">{{item.wbplJyXh}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="select-store" v-if="item == 'store' && pageConfig.tags[index] == 1">
                                <div class="input-control">
                                    <inp-com title="使用服务门店" :value="storeName" :onClick="goStore" :readonly="true" :placeholder="storeTip" :rightArrow="true" />
                                </div>
                            </div>
                            <div class="tips" v-if="setInfo.isUniversal == 1 && item == 'info' && pageConfig.tags[index] == 1">提示：请查看可以使用的服务门店</div>
                            <div class="info-container" v-if="item == 'info' && pageConfig.tags[index] == 1">
                                <div class="title">
                                    套餐信息
                                </div>
                                <div class="info-content">
                                    <div class="image-cotainer" v-for="(item,index) in setResource.detailImgs">
                                        <img :src="item" alt="">
                                    </div>
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
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import InpCom from '../components/InpCom';
    import Tool from '../utils/Tool';
    import { mapState, mapMutations } from 'vuex';
    import { Toast } from 'mint-ui';
    import Scroller from '../components/Scroller';
    import Swiper from '../components/Swiper';
    import emmiter from '../mixins/emmiter';
    export default {
        data () {
            return {
                setInfo:{},
                setResource:{
                    ad:'',//广告语
                    indexImgs:[],//展示图片
                    detailImgs:[],//详情图片
                },
                mealListShow:false,
                showPrice:0,//实际价格
                rangePrice:0,//价格区间最大价格
                deletePrice:0,//原价
                selectMeal:-1,
                setMealList:[],
                setDetail:{
                    price:'',
                    mealId:'',
                    mealName:''
                },
                storeTip:'选择服务门店',
                isSelectStore:true,
                scrollerY:0,//记录scroller的位置
                pageConfig:{
                    tags:[],
                    fileds:[],
                },
                storeName:'',
            }
        },
        components:{
            NavBar,
            InpCom,
            Scroller,
            Swiper
        },
        mixins: [emmiter],
        computed:{
            ...mapState({
                modelInfo: ({//选择的车型信息
                    packageinfo
                }) => packageinfo.modelInfo,
                storeInfo: ({//选择的店铺信息
                    packageinfo
                }) => packageinfo.storeInfo,
                reset: ({//页面信息重置标志
                    mixin
                }) => mixin.reset,
                pageSetting: ({//当前业务配置
                    pageconfig
                }) => pageconfig.currentBis
            })
        },
        updated:function(){
            this.$nextTick(() => {//IScroll滚动回之前的位置
                if(this.$children.length > 0){
                    for(var i=0;i<this.$children.length;i++){
                        if(this.$children[i].mySroller && this.$children[i].mySroller.scrollTo){
                            this.$children[i].mySroller.scrollTo(0,this.$children[i].scrollerInfo.y);
                        }
                    }
                }
            })
        },
        watch:{
            'isSelectStore':function(val){
                if(val){
                    this.storeTip = '选择服务门店';
                }else{
                    this.storeTip = '查看服务门店';
                }
            }
        },
        methods:{
            nextPage:function(){
                if(!this.setDetail.price && this.pageConfig.tags[this.pageConfig.fileds.indexOf('meal')] == '1'){
                    Toast('请选择机油');
                    return false;
                }
                if(this.setInfo.wbpSfqgty == 2 && !this.storeInfo.id && this.pageConfig.tags[this.pageConfig.fileds.indexOf('store')] == '1'){
                    Toast({
                        message:'请选择服务门店',
                        duration:1000,
                    });
                    return false;
                }
                this.setSetInfo(this.setInfo);
                this.setSetDetail(this.setDetail);
                this.setReset(false);
                this.$router.push({name:'personinfo',params:{code:true}});
            },
            getMealList:function(id){
                Tool.get('getSetMeal',{
                    vehicleModel:this.modelInfo.vehicleModel || '',
                    displacement:this.modelInfo.displacement || '',
                    wbplDid:id,
                },(data)=>{
                    if(data.code == 200){
                        this.setMealList = data.data.jiyou;
                        var price = data.data.jiage;
                        if(price.indexOf('-')) {
                            var priceRange = price.split('-');
                            this.showPrice = priceRange[0];
                            this.rangePrice = priceRange[1];
                            this.deletePrice = '';
                        }else{
                            this.showPrice = data.data.jiage;
                            this.deletePrice = '';
                            this.rangePrice = 0;
                        }
                        if(this.setMealList.length < 2){//如果只有一条机油数据，那就不支持修改
                            //this.selectMeal = 0;
                            this.selectedMeal(0);
                        }
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })
                    }
                })
            },
            selectedMeal:function(index){
                this.selectMeal = index;
                this.showPrice = this.setMealList.length > 0 ? this.setMealList[this.selectMeal].wbplXSPrice : 0;
                this.rangePrice = 0;
                this.deletePrice = this.setMealList.length > 0 ? this.setMealList[this.selectMeal].wbplPrice : 0;
                this.setDetail.price = this.showPrice;
                if( this.setMealList.length > 0 ) {
                    this.setDetail.mealId = this.setMealList[this.selectMeal].wbplId;
                    this.setDetail.number = this.setMealList[this.selectMeal].wbplCs;
                    var validate = this.setMealList[this.selectMeal].wbplYxq - 0;
                    this.setDetail.mealName = this.setMealList[this.selectMeal].wbplJyName + this.setMealList[this.selectMeal].wbplJyXh;
                } 
                var today = Tool.formatDate(new Date());
                var end = '';
                if(String(validate).indexOf('.') >= 0){
                    var INT = String(validate).split('.')[0] - 0;
                    var FLOAT = validate - (String(validate).split('.')[0] - 0);
                    var additionTime = Math.ceil(FLOAT * 365) * 60 * 60 * 24 * 1000; 
                    var temp = today.substring(0,4) - 0 + INT + today.substring(4,10);
                    end = Tool.formatDate(new Date(temp).getTime() + additionTime);
                }else{
                    end = today.substring(0,4) - 0 + validate + today.substring(4,10);
                }
                this.setDetail.validate = end;
            },
            getPackageDetail:function(id=1){
                Tool.get('wbinterface/getWbProduct',{id},data => {
                    if(data.code == 200){
                        const ret = data.data[0];
                        const res = ret.wbResource;
                        this.setResource.ad = res.wbrGgy;
                        var i = 1;
                        this.setResource.indexImgs = [];
                        this.setResource.detailImgs = [];
                        while(i < 6){
                            res[`wbrIndeximg${i}`] ? this.setResource.indexImgs.push(res[`wbrIndeximg${i}`]) : '';
                            i++;
                        }
                        i = 1;
                        while(i < 11){
                            res[`wbrXqt${i}`] ? this.setResource.detailImgs.push(res[`wbrXqt${i}`]) : '';
                            i++;
                        }
                        this.$nextTick(() => {
                            if($('.info-content img').length > 0){
                                $('.info-content img').each((i,v) => {
                                    v.onload = ()=>{
                                        this.$nextTick(()=>{
                                            this.$refs.scroller.mySroller.refresh();
                                        })
                                    }
                                    this.broadcast('swiper','init',{
                                        autoplay:0,
                                        pagination:'.swiper-pagination'
                                    });
                                })
                            }
                        });
                        this.setInfo.wbpSfqgty = ret.wbpSfqgty;
                        this.setInfo.wbpByxm =  ret.wbpByxm;
                        this.setInfo.wbpName = ret.wbpName;
                        this.setInfo.wbpId = ret.wbpId;
                        this.setInfo.wbpPdesc = ret.wbpPdesc;
                        this.setInfo.coverUrl = res.wbrIndeximg1;
                        if(this.setInfo.wbpSfqgty == 2){//判断是否是全国
                            this.isSelectStore = true;
                        }else{
                            this.isSelectStore = false;
                        }
                    }
                })
            },
            reSetData:function(){
                this.setMealList = [];
                this.selectMeal = -1;
                this.showPrice = 0;
                this.mealListShow = false;
                this.setDetail = {
                    price:'',
                    mealId:'',
                    mealName:''
                }
                this.setResource = {
                    ad:'',//广告语
                    indexImgs:[],//展示图片
                    detailImgs:[],//详情图片
                }
                this.$nextTick(() => {
                    if(this.$children.length > 0){
                        for(var i=0;i<this.$children.length;i++){
                            if(this.$children[i].mySroller && this.$children[i].mySroller.scrollTo){
                                this.$children[i].scrollerInfo.y = 0;
                                this.$children[i].mySroller.scrollTo(0,0,300);
                            }
                        }
                    }
                })
            },
            getPageConfig:function(e){
                this.pageConfig.tags = this.pageSetting.wbPageDetail['TCXQ_PAGE'].wbpdFtag.split(',');
                this.pageConfig.fileds = this.pageSetting.wbPageDetail['TCXQ_PAGE'].wbpdName.split(',');
                this.$nextTick(() => {
                    this.getMealList(this.params.id);
                    this.getPackageDetail(this.params.id);
                })
            },
            goStore:function(){
                this.setReset(false); 
                if(this.isSelectStore){
                    this.$router.push({name:'store',params:{wbpId:this.setInfo.wbpId}});
                }else{
                    this.$router.push({name:'viewstore',params:{wbpId:this.setInfo.wbpId}});
                }
            },
            toggleMeal:function(){
                this.mealListShow = !this.mealListShow
            },
            ...mapMutations({
                setReset: 'UPDATE_RESET',
                setSetInfo: 'SET_SETINFO',
                setSetDetail: 'SET_SETDETAIL'
            })
        },
        created:function(){
            if($.isEmptyObject(this.modelInfo)) {
                this.$router.push({name:'maintainset'});
            }
        },
        activated:function(){
            this.params = this.$route.params;
            this.storeName = this.storeInfo.storeName ? this.storeInfo.storeName : '';
            if(this.reset){
                this.reSetData();
                this.$nextTick(()=>{
                    this.getPageConfig();
                })
            }
        },
        filters:{
            universalFilter:function(val){//使用范围展示过滤器
                if(val == 1){
                    return '全国服务门店使用'
                }else{
                    return '指定服务门店使用'
                }
            },
            priceFilter:function(val){//价格展示过滤器
                if(!val) return '';
                return (val - 0).toFixed(2);
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
                        min-height:10rem;
                        background-color:#ccc;
                        background-image:url("../assets/error.png");
                        background-size:30%;
                        background-position:center;
                        background-repeat:no-repeat;
                        .swiper-slide{
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
                    .set-detail{
                        padding:0.4rem 0.5rem;
                        font-size:0.51rem;
                        height:auto;
                        .des1{
                            font-size:0.64rem;
                            color:#333333;
                            font-weight:bold;
                            margin-right:0.2rem;
                        }
                        .des2{
                            color:#fd3c2d;
                            font-size:0.51rem;
                            padding:0.1rem;
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
                        padding:0 0.5rem;
                        border-bottom:1px solid #ccc;
                    }
                    .info-content{
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