<template>
    <div class="page-container">
        <div class="page evaluate-page" flex="dir:top box:first">
            <nav-bar
                title='用户点评'
                rightContent='发表'
                :otherClass='true'
                :onRight="publicEvaluate"
            />
            <div class="page-content" flex="dir:top box:first">
                <div class="evaluate">
                    <div class="title" flex="dir:left cross:center">
                        点评得分
                    </div>
                    <div class="content">
                        <div class="score-total" flex="dir:left cross:center">
                            <span>总体评分</span>
                            <div class="score-evaluate" flex="dir:left cross:center" :style="{'background-image':'-webkit-linear-gradient(-180deg, #d9d9d9 ' + totalPercent + ', #ff3b2f 10px)','-webkit-background-clip':'text'}">
                                <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]">
                                    <div class="iconfont icon-start dark"></div>
                                </div>
                            </div>
                            <div class="score">
                                {{totalEvaluate}}
                            </div>
                        </div>
                        <div class="score-single">
                            <div class="single-item" flex="dir:left cross:center">
                                <span>服务描述</span>
                                <div class="score-evaluate" flex="dir:left cross:center">
                                    <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]" @click="serverAttitude = i">
                                        <div class="iconfont icon-smile" v-if="i<=serverAttitude"></div>
                                        <div class="iconfont icon-smile unhappy" v-else="i<=serverAttitude"></div>
                                    </div>
                                </div>
                                <div class="score score-service">{{serverAttitude | scoreFilter}}</div>
                            </div>
                            <div class="single-item" flex="dir:left cross:center">
                                <span>专业水平</span>
                                <div class="score-evaluate" flex="dir:left cross:center">
                                    <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]" @click="specialityLevel = i">
                                        <div class="iconfont icon-smile" v-if="i<=specialityLevel"></div>
                                        <div class="iconfont icon-smile unhappy" v-else="i<=specialityLevel"></div>
                                    </div>
                                </div>
                                <div class="score score-service">{{specialityLevel | scoreFilter}}</div>
                            </div>
                            <div class="single-item" flex="dir:left cross:center">
                                <span>设施环境</span>
                                <div class="score-evaluate" flex="dir:left cross:center">
                                    <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]" @click="facilityEvaluate = i">
                                        <div class="iconfont icon-smile" v-if="i<=facilityEvaluate"></div>
                                        <div class="iconfont icon-smile unhappy" v-else="i<=facilityEvaluate"></div>
                                    </div>
                                </div>
                                <div class="score score-service">{{facilityEvaluate | scoreFilter}}</div>
                            </div>
                            <div class="single-item" flex="dir:left cross:center">
                                <span>软件操作</span>
                                <div class="score-evaluate" flex="dir:left cross:center">
                                    <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]" @click="softwareOperate = i">
                                        <div class="iconfont icon-smile" v-if="i<=softwareOperate"></div>
                                        <div class="iconfont icon-smile unhappy" v-else="i<=softwareOperate"></div>
                                    </div>
                                </div>
                                <div class="score score-service">{{softwareOperate | scoreFilter}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="description" flex="dir:top box:first">
                    <div class="title" flex="dir:left cross:center">
                        点评描述
                    </div>
                    <div class="content" flex="dir:top box:justify">
                        <div class="base-info">
                            <div class="info-item" flex="dir:left cross:center">
                                <div class="label">所选车型：</div>
                                <div class="value">{{query.vehicleModel}}</div>
                            </div>
                            <div class="info-item" flex="dir:left cross:center">
                                <div class="label">服务类型：</div>
                                <div class="value">售后服务</div>
                            </div>
                        </div>
                        <div class="evaluate-description">
                            <textarea
                                rows='5 '
                                placeholder="请描述一下你在4S店的服务经历帮助一下其他小伙伴        写够15字才是好同志"
                                v-model="explain"
                            >
                            </textarea>
                        </div>
                        <div class="addon-picture" flex="dir:left cross:center">
                            <div class="picture-container"></div>
                            <div class="upload-picture">上传图片</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    import { Toast } from 'mint-ui';
    export default {
        data () {
            return {
                totalEvaluate:'5.0',
                specialityLevel:5,
                facilityEvaluate:5,
                serverAttitude:5,
                softwareOperate:5,
                query:'',
                explain:'',
            }
        },
        components:{
            NavBar
        },
        computed:{
            'totalPercent':function(){
                return ((5-this.totalEvaluate)/5)*100 + '%'
            }
        },
        methods:{
            publicEvaluate:function(){
                Tool.post('evaluate',{
                    totalEvaluate:this.totalEvaluate - 0,
                    specialityLevel:this.specialityLevel,
                    facilityEvaluate:this.facilityEvaluate,
                    serverAttitude:this.serverAttitude,
                    softwareOperate:this.softwareOperate,
                    serviceType:1,
                    explains:this.explain,
                    ...this.query
                },(data)=>{
                    if(data.code == 200){
                        Toast({
                            message:"评论发表成功！",
                            duration:1000
                        })
                        this.$router.go(-1);
                    }
                })
            }
        },
        watch:{
            'specialityLevel':function(val){
                this.totalEvaluate = ((this.specialityLevel + this.facilityEvaluate + this.serverAttitude + this.softwareOperate)/4).toFixed(1);
            },
            'facilityEvaluate':function(val){
                this.totalEvaluate = ((this.specialityLevel + this.facilityEvaluate + this.serverAttitude + this.softwareOperate)/4).toFixed(1);
            },
            'serverAttitude':function(val){
                this.totalEvaluate = ((this.specialityLevel + this.facilityEvaluate + this.serverAttitude + this.softwareOperate)/4).toFixed(1);
            },
            'softwareOperate':function(val){
                this.totalEvaluate = ((this.specialityLevel + this.facilityEvaluate + this.serverAttitude + this.softwareOperate)/4).toFixed(1);
            }
        },
        filters:{
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
        beforeRouteEnter:(to,from,next)=>{
            Tool.routerEnter(to,from,next)
        },
        activated:function(){
            this.query = this.$route.query;
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
            .evaluate{
                margin-bottom:0.5rem;
                box-shadow:0px 1px 3px #ccc;
                .title{
                    height:1.92rem;
                    padding:0 3%;
                    background-color:#fff;
                    border-bottom:1px solid #afafaf;
                    font-size:0.67rem;
                }
                .content{
                    background-color:#fff;
                    padding:0 3%;
                    .score-single{
                        padding:0.2rem 0;
                        .single-item{
                            height:1.6rem;
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
                            background:-webkit-linear-gradient(-180deg, #d9d8d4 90%, #ff853f 10px);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            padding: 0 0.1rem;
                            .score-evaluate-item{
                                margin-left:0.5rem;
                                .iconfont{
                                    font-size:1.2rem;
                                }
                                .icon-start{
                                    color:#ff3b2f;
                                }
                                .icon-start.dark{
                                    color:#b6b6b6;
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
            }
            .description{
                background-color:#fff;
                .title{
                    height:1.92rem;
                    padding:0 3%;
                    background-color:#fff;
                    border-bottom:1px solid #afafaf;
                    font-size:0.67rem;
                }
                .content{
                    padding:0.1rem 3%;
                    .base-info{
                        .info-item{
                            height:1.5rem;
                            border-bottom:1px solid #d9d9d9;
                        }
                    }
                    .evaluate-description{
                        padding:0.2rem 0;
                        border-bottom:1px solid #d9d9d9;
                        textarea{
                            resize:none;
                            outline:none;
                            border:none;
                            padding:0;
                            font-size:0.58rem;
                            width:100%;
                        }
                    }
                    .addon-picture{
                        height:3rem;
                    }
                }
            }
        }
    }
</style>