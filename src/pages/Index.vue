<template>
    <div class="index-page" flex="dir:top box:first">
        <nav-bar 
            title="添加预约订单"
            :onRight="goStore"
        />
        <div class="page-content">
            <div class="button-control">
                 <btn-com
                    title="确定"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import BtnCom from '../components/BtnCom';
    import { mapMutations } from 'vuex';
    export default{
        data () {
            return {

            }
        },
        methods:{
            goStore:function(){
                var self = this;
                this.pushPage({path:"store",vue:self});
            },
            ...mapMutations([
                'pushPage'
            ])
        },
        components:{
            NavBar,
            BtnCom
        }
    }
</script>
<style scoped lang="less">
    .index-page{
        height:100%;
        position:absolute;
        width:100%;
        .page-content{
            background-color: #efefef;
            height:100%;
            overflow: auto;
            .button-control{
                background-color:#fc4c1d;
                width: 95%;
                margin:1rem 2.5%;
                color:#fff;
                font-size:0.77rem;
            }
        }
    }
    
</style>