<template>
    <div class="page-container">
        <div class="page evaluate-page" flex="dir:top box:first">
            <nav-bar
                title='用户点评'
                rightContent='发表'
            />
            <div class="page-content">
                <div class="evaluate">
                    <div class="title" flex="dir:left cross:center">
                        点评得分
                    </div>
                    <div class="content">
                        <div class="score-single">
                            <div class="single-item" flex="dir:left cross:center">
                                <span>服务描述</span>
                                <div class="score-evaluate" flex="dir:left cross:center">
                                    <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]" @click="score.service = i">
                                        <div class="iconfont icon-smile" v-if="i<=score.service"></div>
                                        <div class="iconfont icon-smile unhappy" v-else="i<=score.service"></div>
                                    </div>
                                </div>
                                <div class="score score-service">{{score.service | scoreFilter}}</div>
                            </div>
                            <div class="single-item" flex="dir:left cross:center">
                                <span>专业水平</span>
                                <div class="score-evaluate" flex="dir:left cross:center">
                                    <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]" @click="score.pro = i">
                                        <div class="iconfont icon-smile" v-if="i<=score.pro"></div>
                                        <div class="iconfont icon-smile unhappy" v-else="i<=score.pro"></div>
                                    </div>
                                </div>
                                <div class="score score-service">{{score.pro | scoreFilter}}</div>
                            </div>
                            <div class="single-item" flex="dir:left cross:center">
                                <span>设施环境</span>
                                <div class="score-evaluate" flex="dir:left cross:center">
                                    <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]" @click="score.envi = i">
                                        <div class="iconfont icon-smile" v-if="i<=score.envi"></div>
                                        <div class="iconfont icon-smile unhappy" v-else="i<=score.envi"></div>
                                    </div>
                                </div>
                                <div class="score score-service">{{score.envi | scoreFilter}}</div>
                            </div>
                            <div class="single-item" flex="dir:left cross:center">
                                <span>软件环境</span>
                                <div class="score-evaluate" flex="dir:left cross:center">
                                    <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]" @click="score.software = i">
                                        <div class="iconfont icon-smile" v-if="i<=score.software"></div>
                                        <div class="iconfont icon-smile unhappy" v-else="i<=score.software"></div>
                                    </div>
                                </div>
                                <div class="score score-service">{{score.software | scoreFilter}}</div>
                            </div>
                        </div>
                        <div class="score-total" flex="dir:left cross:center">
                            <span>总体评分</span>
                            <div class="score-evaluate" flex="dir:left cross:center">
                                <div class="score-evaluate-item" v-for="i in [1,2,3,4,5]" @click="score.total = i">
                                    <div class="iconfont icon-start" v-if="i<=score.total"></div>
                                    <div class="iconfont icon-start dark" v-else="i<=score.total"></div>
                                </div>
                            </div>
                            <div class="score">
                                {{score.total}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar'
    export default {
        data () {
            return {
                score:{
                    service:1,
                    pro:5,
                    envi:5,
                    software:5,
                    total:5,
                }
            }
        },
        components:{
            NavBar
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
        }
    }
</script>
<style lang="less">
    .nav-bar .right-button.button{
        text-align:right;
        position:relative;
        right:0.5rem;
        color:#379bf3;
    }
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
                        height:2.5rem;
                        line-height:2.5rem;
                        border-top:1px solid #d9d9d9;
                        span{
                            width:20%;
                        }
                        .score-evaluate{
                            width:60%;
                            text-align:center;
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
        }
    }
</style>