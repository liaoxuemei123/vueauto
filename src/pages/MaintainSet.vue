<template>
    <div class="page-container">
        <div class="maintainset-page page" flex="dir:top box:first">
            <select-nav 
                placeholder="搜索套餐"
                :onDropDown="showSelector"
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
        <div class="drop-down-list" v-if="dropdownMenuShow">
            <div class="drop-down-container">
                <div class="drop-down-item" @click="selectMainMenu(index)" v-for="(item,index) in dropDownMenu" :class="{'active':index == mainIndex}">
                    <div class="item-name">{{item.name}}</div>
                    <div class="sub-menu-list" v-if="mainIndex == index">
                        <div class="sub-item" @click.stop="selectSubMenu(subindex)" v-for="(subitem,subindex) in item.children" :class="{'active':subindex == subIndex}">
                            {{subitem.name}}
                        </div>
                    </div>
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
                        times:'3+1',des1:'四次基础保养',des2:'两年以上车龄专享',range:'全国4S店通用'
                    },{
                        id:2,
                        url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                        times:'3+1',des1:'四次基础保养',des2:'两年以上车龄专享',range:'限制服务商'}],
                    down:[{
                        id:3,
                        url: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
                        times:'4+1',des1:'五次基础保养',des2:'两年以上车龄专享',range:'全国4S店通用'
                    },{
                        id:4,
                        url: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
                        times:'4+1',des1:'五次基础保养',des2:'两年以上车龄专享',range:'限制服务商'}]
                },
                dropDownMenu:[
                    {
                        name:'车型1',id:1,
                        children:[
                            {
                                name:'SX1',id:1,
                            },{
                                name:'S75',id:2,
                            }
                        ]
                    },{
                        name:'车型2',id:2,
                        children:[
                            {
                                name:'1.5T',id:3,
                            },{
                                name:'2.0T',id:4,
                            }
                        ]
                    }
                ],
                dropdownMenuShow:false,
                mainIndex:0,
                subIndex:0,
            }
        },
        components:{
            SelectNav,
            SetItem
        },
        methods:{
            viewDetail:function(id){
                this.$router.push({name:'setdetail'});
            },
            showSelector:function(){
                this.dropdownMenuShow = !this.dropdownMenuShow;
            },
            selectMainMenu:function(index){
                this.mainIndex = index;
                this.subIndex = 0;
            },
            selectSubMenu:function(index){
                this.subIndex = index;
            }
        }
    }
</script>
<style lang="less" scoped>
    .page-container{
        height:100%;
        position:absolute;
        width:100%;
        .drop-down-list{
            width:30%;
            background-color:#fff;
            position:absolute;
            z-index:2;
            right:0.5rem;
            top:2rem;
            border-radius:3px;
            box-shadow:1px 1px 3px #aaa;
            .drop-down-container{
                padding:0.1rem 0.2rem;
                .drop-down-item{
                    font-size:0.67rem;
                    line-height:1.8em;
                    padding-left:0.2rem;
                    position:relative;
                    border-radius:3px;
                    .sub-menu-list{
                        position:absolute;
                        top:0;
                        width:2rem;
                        left:-2.7rem;
                        color:#333;
                        background-color:#fff;
                        padding:0.1rem 0.2rem;
                        font-size:0.58rem;
                        border-radius:3px;
                        box-shadow:1px 1px 3px #aaa;
                        .sub-item{
                            line-height:1.5em;
                            padding-left:0.2rem;
                            border-radius:3px;
                        }
                        .sub-item.active{
                            background-color:#08aaeb;
                            color:#fff;
                        }
                    }
                }
                .drop-down-item.active{
                    background-color:#08aaeb;
                    color:#fff;
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