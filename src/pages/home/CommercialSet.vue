<template>
    <div class="sub-page" key="commercialset">
        <scroller>
            <transition name="fade">
                <div class="show-content" v-if="setlist.up.length > 0 && setlist.down.length > 0">
                    <div class="up-title title" >
                        <span>指定4S店使用</span>
                    </div>
                    <div class="up">
                        <div class="set-item" v-for="(item, index) in setlist.up">
                            <package-item :item="item"/>
                        </div>
                    </div>
                    <div class="down-title title">
                        <span>全国4S店使用<strong class="additional">&nbsp;(暂开通河南、湖南、重庆)</strong></span>
                    </div>
                    <div class="down">
                        <div class="set-item" v-for="(item, index) in setlist.down">
                            <package-item :item="item"/>
                        </div>
                    </div>
                </div>
            </transition>
        </scroller>
    </div>
</template>
<style lang="less" scoped>
    .sub-page{
        position: absolute;
        width:100%;
        height:100%;
        .show-content{
            .title{
                height:1.2rem;
                line-height:1.2rem;
                width:94%;
                padding:0 3%;
            }
            .set-item{
                border-bottom:1px solid #efefef;
            }
        }
    }
</style>
<script>
    import Scroller from '../../components/Scroller';
    import PackageItem from '../../components/PackageItem';
    import Tool from '../../utils/Tool';
    export default {
        data () {
            return {
                setlist:{
                    up:[],
                    down:[]
                },
            }
        },
        components:{
            Scroller,
            PackageItem
        },
        methods:{
            getPackageList:function(){
                Tool.get('getPackageList',{},(data)=>{
                    this.setlist.up = data.data.twoup;
                    this.setlist.down = data.data.twodown;
                })
            },
        },
        created:function(){
            this.getPackageList();
        },
        activated:function(){
            this.$store.commit('SET_RESET_FLAS',true);
            this.$store.commit('SET_PACKAGE_STOREINFO',{});
        },
    }
</script>