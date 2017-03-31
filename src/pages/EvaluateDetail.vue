<template>
    <div class="page-container">
        <div class="page evaluate-detail-page" flex="dir:top box:first">
            <nav-bar
                title='评价详情'
            />
            <div class="page-content">
                <div class="store-info-container" flex="dir:left box:first cross:center">
                    <!--<div class="image-container">
                        <img v-lazy="storeInfo.photoUrl"/>
                    </div>-->
                    <div class="store-info" flex="dir:top cross:top box:mean">
                        <div class="line" flex="dir:left cross:center main:justify">
                            <span class="store-name">{{storeInfo.storeName}}</span>
                        </div>
                        <div class="line" flex="dir:left cross:center">
                            <span class="store-address">{{storeInfo.address}}</span>
                        </div>
                        <div class="line" flex="dir:left cross:center">
                            <span class="store-phone">联系电话：{{storeInfo.tel}}</span>
                        </div>
                    </div>
                </div>
                <div class="evaluate-detail-container">
                    <div class="score-total" flex="dir:left cross:center">
                        <span>总体评分</span>
                        <div class="score-evaluate" flex="dir:left cross:center" ref="total">
                            <div class="score-evaluate-item" v-for="i in [0,1,2,3,4]">
                                <div class="iconfont-container">
                                    <i class="iconfont icon-start" v-if="evaluate.totalEvaluate - i >= 1"></i>
                                    <i class="iconfont icon-start" v-if="evaluate.totalEvaluate - i < 1 && evaluate.totalEvaluate - i > 0" :style="{'width':(evaluate.totalEvaluate - i) * 100 + '%'}"></i>
                                    <i class="iconfont icon-start dark"></i>
                                </div>
                            </div>
                        </div>
                        <div class="score">
                            {{evaluate.totalEvaluate}}
                        </div>
                    </div>
                    <div class="score-single">
                        <div class="single-item" flex="dir:left cross:center">
                            <span>服务描述</span>
                            <div class="score-evaluate" flex="dir:left cross:center">
                                <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]">
                                    <div class="iconfont icon-smile" v-if="i<=evaluate.serverAttitude"></div>
                                    <div class="iconfont icon-smile unhappy" v-else="i<=evaluate.serverAttitude"></div>
                                </div>
                            </div>
                            <div class="score score-service">{{evaluate.serverAttitude | scoreFilter}}</div>
                        </div>
                        <div class="single-item" flex="dir:left cross:center">
                            <span>专业水平</span>
                            <div class="score-evaluate" flex="dir:left cross:center">
                                <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]">
                                    <div class="iconfont icon-smile" v-if="i<=evaluate.specialityLevel"></div>
                                    <div class="iconfont icon-smile unhappy" v-else="i<=evaluate.specialityLevel"></div>
                                </div>
                            </div>
                            <div class="score score-service">{{evaluate.specialityLevel | scoreFilter}}</div>
                        </div>
                        <div class="single-item" flex="dir:left cross:center">
                            <span>设施环境</span>
                            <div class="score-evaluate" flex="dir:left cross:center">
                                <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]">
                                    <div class="iconfont icon-smile" v-if="i<=evaluate.facilityEvaluate"></div>
                                    <div class="iconfont icon-smile unhappy" v-else="i<=evaluate.facilityEvaluate"></div>
                                </div>
                            </div>
                            <div class="score score-service">{{evaluate.facilityEvaluate | scoreFilter}}</div>
                        </div>
                        <div class="single-item" flex="dir:left cross:center">
                            <span>软件操作</span>
                            <div class="score-evaluate" flex="dir:left cross:center">
                                <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]">
                                    <div class="iconfont icon-smile" v-if="i<=evaluate.softwareOperate"></div>
                                    <div class="iconfont icon-smile unhappy" v-else="i<=evaluate.softwareOperate"></div>
                                </div>
                            </div>
                            <div class="score score-service">{{evaluate.softwareOperate | scoreFilter}}</div>
                        </div>
                    </div>
                    <div class="service-info" flex="dir:left box:mean cross:center">
                        <div class="service-item" flex="dir:left">
                            <div class="label">所选车型：</div>
                            <div class="value">{{evaluate.vehicleModel}}</div>
                        </div>
                        <div class="service-item" flex="dir:left main:right">
                            <div class="label">服务类型：</div>
                            <div class="value">售后服务</div>
                        </div>
                    </div>
                </div>
                <div class="description-container">
                    <div class="description">
                        <p>
                            {{evaluate.explains}}
                        </p>
                        <div class="time">{{evaluate.createDate}}</div>
                    </div>
                    <div class="image-list" flex="dir:left cross:center">
                        <div class="image-container" v-for="(item,index) in evaluate.attachment" @click="showPicture(index)">
                            <img v-lazy="item">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="picture-modal" v-if="showpic"  @click="showpic=false" 
            @touchstart.prevent="slideStart" @touchmove.prevent="slideMove" @touchend.prevent="slideEnd"
            >
                <div class="pickture-mask">
                </div>
                <div class="picture-modal-container">
                    <img :src="pictureShowUrl">
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    import { Toast } from 'mint-ui';
    export default {
        data () {
            return {
                storeInfo:{},
                evaluate:{},
                showpic:false,
                pictureShowUrl:'',
                scale:false,
                touch:{
                    x:0,
                    y:0,
                },
                showIndex:0,
                query:'',
            }
        },
        components:{
            NavBar,
        },
        computed:{
            'totalPercent':function(){
                return ((5-this.evaluate.totalEvaluate)/5)*100 + '%'
            }
        },
        methods:{
            showPicture:function(index){
                this.showpic = true;
                this.pictureShowUrl = this.description.imagelist[index];
                this.showIndex = index;
            },
            slideStart:function(event){
                this.touch.x = event.targetTouches[0].pageX;
            },
            slideMove:function(event){
                var self = this;
                $('.picture-modal-container').css({left:event.targetTouches[0].pageX - self.touch.x})
                this.touch.x = event.targetTouches[0].pageX - self.touch.x;
            },
            slideEnd:function(event){
                $('.picture-modal-container').css({left:0,transition:'all .3s ease'});
                if(Math.abs(this.touch.x)>100){
                    if(this.touch.x > 0){
                        this.showIndex = (this.showIndex - 1) % this.description.imagelist.length;
                        if(this.showIndex<0){
                            this.showIndex += this.description.imagelist.length;
                        }
                        this.pictureShowUrl = this.description.imagelist[this.showIndex];
                    }else{
                        this.showIndex = (this.showIndex + 1) % this.description.imagelist.length;
                        this.pictureShowUrl = this.description.imagelist[this.showIndex];
                    }
                }
            }
        },
        filters:{
            distanceFilter:function(val){
                return (val/1000).toFixed(2) + 'km';
            },
            scoreFilter:function(val){
                switch(val){
                    case 5:
                        return '非常满意';
                    case 4:
                        return '比较满意';
                    case 3:
                        return '满意';
                    case 2:
                        return '不太满意';
                    case 1:
                        return '非常不满';
                }
            }
        },
        activated:function(){
            this.query = this.$route.query;
            Tool.get('evaluateQuery',{...this.query},(data)=>{
                if(data.code == 200){
                    this.evaluate = data.data.evaluate;
                    this.storeInfo = data.data.store;
                }
            })
        },
        beforeRouteEnter:(to,from,next)=>{
            Tool.routerEnter(to,from,next)
        },   
    }
</script>
<style lang="less" scoped>
    .page-container{
        height:100%;
        position:absolute;
        width:100%;
        .picture-modal{
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            z-index:1;
            .pickture-mask{
                width:100%;
                height:100%;
                background-color:rgba(0,0,0,0.9);
                z-index:2;
            }
            .picture-modal-container{
                width:100%;
                position:absolute;
                z-index:3;
                top:50%;
                transform:translateY(-50%);
                transition:'all .3s ease';
                img{
                    width:100%;
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
            .store-info-container{
                height:3.8rem;
                padding:0 3%;
                background-color:#fff;
                margin-bottom:0.5rem;
                box-shadow:0px 1px 3px #ccc;
                .image-container{
                    height: 2.56rem;
                    width: 2.56rem;
                    border-radius: 5px;
                    overflow: hidden;
                    background-color:#ccc;
                    img{
                        height:100%;
                        width:100%;
                    }
                    img[lazy=loading] {
                        width:50%;
                        height:50%;
                        margin-left:25%;
                        margin-top:25%;
                    }
                }
                .store-info{
                    height:2.56rem;
                    margin-left:0.2rem;
                    .line{
                        color:#4b4b4b;
                        width: 100%;
                        font-size:0.58rem;
                        .store-name{
                            font-size:0.64rem;
                            font-weight:bold;
                            white-space: nowrap;
                        }
                        .store-distance{
                            font-size: 0.56rem;
                            color: #a2a2a2;
                            display: inline-block;
                        }
                        .store-address{
                            white-space: nowrap;
                            overflow: auto;
                            display: inline-block;
                            font-size:0.51rem;
                            margin-right:0.3rem;
                            max-width:14.5rem;
                        }
                        .store-phone{
                            font-size:0.51rem;
                            margin-right:0.3rem
                        }
                    }
                }
            }
            .evaluate-detail-container{
                padding:0.2rem 3%;
                background-color:#fff;
                margin-bottom:0.5rem;
                box-shadow:0px 1px 3px #ccc;
                .score-single{
                    padding:0.2rem 0;
                    border-bottom:1px solid #d9d9d9;
                    .single-item{
                        height:1.8rem;
                        span{
                            width:20%;
                        }
                        .score-evaluate{
                            width:60%;
                            text-align:center;
                            .score-evaluate-item{
                                margin-left:0.6rem;
                                .iconfont{
                                    display:block;
                                    height:1.1rem;
                                    width:1.1rem;
                                    font-size:0.9rem;
                                    position:relative;
                                }
                                .icon-smile{
                                    background-color:#fee265;
                                    border-radius:0.55rem;
                                    color:#856300;
                                }
                                .icon-smile.unhappy{
                                    color:#b6b6b6;
                                    border-radius:0.55rem;
                                    background-color:#e4e4e4
                                }
                            }
                        }
                        .score{
                            width:20%;
                            text-align:right;
                            color:#ff3b30;
                        }
                    }
                }
                .score-total{
                    height:2.3rem;
                    line-height:2.3rem;
                    border-bottom:1px solid #d9d9d9;
                    span{
                        width:20%;
                    }
                    .score-evaluate{
                        width:60%;
                        text-align:center;
                        font-size:0.8rem;
                        padding: 0 0.1rem;
                        .score-evaluate-item{
                            height:2.3rem;
                            overflow:hidden;
                            margin-left:0.5rem;
                            .iconfont-container{
                                height:100%;
                                width:1.2rem;
                                overflow:hidden;
                                position:relative;
                                .iconfont{
                                    font-size:1.2rem;
                                }
                                .icon-start{
                                    color:#ff3b2f;
                                    position:absolute;
                                    z-index:2;
                                    left:0;
                                    overflow: hidden;
                                }
                                .icon-start.dark{
                                    color:#b6b6b6;
                                    z-index:1;
                                }
                            }
                        }
                    }
                    .score{
                        width:20%;
                        text-align:right;
                        color:#ff3b30;
                    }
                }
                .service-info{
                    height:1.9rem;
                    .value{
                        color:#666;
                    }
                }
            }
            .description-container{
                background-color:#fff;
                padding:0.4rem 3%;
                box-shadow:0px 1px 3px #ccc;
                p{
                    margin:0;
                }
                .time{
                    color:#999;
                    font-size:0.51rem;
                    margin:0.3rem 0rem;
                }
                .image-list{
                    height:3rem;
                    overflow:auto;
                    .image-container{
                        height:2.6rem;
                        width:2.6rem;
                        overflow:hidden;
                        margin-right:0.4rem;
                        background-color:#ccc;
                        img{
                            width:100%;
                            height:100%;
                        }
                        img[lazy=loading] {
                            width:50%;
                            height:50%;
                            margin-left:25%;
                            margin-top:25%;
                        }
                    }
                }
            }
        }
    }
</style>