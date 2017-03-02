<template>
    <div class="maintainset-page page" flex="dir:top box:first">
        <select-nav 
            placeholder="搜索套餐"
        />
        <div class="page-content">
            <div class="up-title title">
                <span>两年以上车龄专享</span>
            </div>
            <div class="up">
                <div class="set-item" v-for="(item, index) in setlist.up">
                    <set-item :item="item"  :onClick="viewDetail.bind(this,item.id)"/>
                </div>
            </div>
            <div class="down-title title">
                <span>两年以内车龄专享</span>
            </div>
            <div class="down">
                <div class="set-item" v-for="(item, index) in setlist.down">
                    <set-item :item="item"  :onClick="viewDetail.bind(this,item.id)"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SelectNav from '../components/SelectNav';
    import SetItem from '../components/SetItem';
    export default {
        data () {
            return {
                setlist:{
                    up:[{
                        id:1,
                        url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                        times:'3+1',
                        des1:'四次基础保养',
                        des2:'两年以上车龄专享',
                        range:'全国4S店通用'
                    },
                    {
                        id:2,
                        url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                        times:'3+1',
                        des1:'四次基础保养',
                        des2:'两年以上车龄专享',
                        range:'限制服务商'
                    },],
                    down:[{
                        id:3,
                        url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                        times:'4+1',
                        des1:'五次基础保养',
                        des2:'两年以上车龄专享',
                        range:'全国4S店通用'
                    },
                    {
                        id:4,
                        url: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
                        times:'4+1',
                        des1:'五次基础保养',
                        des2:'两年以上车龄专享',
                        range:'限制服务商'
                    }]
                }
            }
        },
        components:{
            SelectNav,
            SetItem
        },
        methods:{
            viewDetail:function(id){
                this.$router.push({name:'setdetail'});
            }
        }
    }
</script>
<style lang="less" scoped>
    .page{
        height:100%;
        position:absolute;
        width:100%;
        .page-content{
            background-color: #efefef;
            height:100%;
            overflow: auto;
            .title{
                height:1.7rem;
                line-height:1.7rem;
                text-align:center;
                font-size:0.64rem;
                color:#343434;
                span{
                    position:relative;
                }
                span:before,span:after{
                    position:absolute;
                    content:' ';
                    display:block;
                    width:0.6rem;
                    height:1px;
                    background-color:#09abec;
                    top:50%;
                }
                span:before{
                    left:-1rem;
                }
                span:after{
                    right:-1rem;
                }
            }
            .set-item{
                height:7.7rem;
                width:49%;
                display:inline-block;
                background-color:#fff;
                box-shadow:0px 2px 3px #ccc;
            }
            .set-item:nth-child(2n){
                margin-left:2%;
            }
        }
    }
</style>