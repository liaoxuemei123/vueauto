<template>
    <div class="page-container">
        <div class="page home-page" flex="dir:top box:first">
            <nav-bar
                title="个人中心"
            />
            <div class="page-content">
                <div class="tbbar" flex="dir:left cross:center">
                    <div class="bisiness-list">
                        <xscroller>
                            <div class="bisiness-item x-item" @click="activeBusiness = index" :class="{'active':activeBusiness == index}" v-for="(item,index) in bisinessItems" flex="dir:left cross:center main:center">
                                <i class="icon-image" v-if="item.icon" :style="{'background-image':'url('+item.icon+')'}"></i>{{item.name}}
                            </div>
                        </xscroller>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Xscroller from '../components/Xscroller';
    import emmiter from '../mixins/emmiter';
    export default{
        data () {
            return {
                bisinessItems:[{
                    name:"保养套餐",
                    icon:require('../assets/changan_wc.png'),
                    type:1,
                },{
                    name:"保养套餐",
                    icon:require('../assets/changan_sy.png'),
                    type:2,
                },{
                    name:"预约保养",
                    icon:'',
                    type:3,
                }],
                activeBusiness:0,
            }
        },
        mixins: [emmiter],
        components:{
            NavBar,
            Xscroller
        },
        mounted:function(){
            this.broadcast('xscroller','init');
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
            .bisiness-list{
                width:100%;
                height:1.5rem;
                line-height:1.5rem;
                background-color:#fff;
                .bisiness-item{
                    width:5.4rem;
                    float:left;
                    color:#333;
                    &.active{
                        color:#00bffe;
                    }
                    .icon-image{
                        width:1.1rem;
                        height:1.2rem;
                        background-size:cover;
                    }
                }
            }
        }
    }
</style>