<template>
    <div class="page-container">
        <div class="page home-page" flex="dir:top box:first">
            <nav-bar
                title="推荐人"
            />
            <div class="page-content" flex="dir:top">
                <div class="input-control" flex="dir:left box:first">
                    <div class="label">推荐类型</div>
                    <div class="select-item" v-for="item in referees" @click="refereeType = item.value">
                        <i class="iconfont" :class="refereeType == item.value ?'icon-select' : 'icon-circle'"></i>{{item.name}}
                    </div>
                </div>
                <div class="inp-control" v-if="refereeType == 1">
                    <inp-com
                        title="推荐人"
                        placeholder="填写推荐人手机号"
                        :value="refereePhone"
                        :onBlur="updatePhone.bind(this)"
                    />
                </div>
                <div class="inp-control" v-if="refereeType == 0">
                    <inp-com
                        title="推荐服务门店"
                        placeholder="请选择服务门店"
                        :rightArrow="true"
                        :readonly="true"
                        :onClick="goStore.bind(this)"
                        :value="storeName"
                    />
                </div>
                <div class="button" @click="submitReferee">
                    确定
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    import InpCom from '../components/InpCom';
    import { mapState, mapMutations } from 'vuex';
    export default{
        data () {
            return {
                refereeType:0,
                referees:[
                    {
                        name:"服务门店",
                        value:0,
                    },
                    // {
                    //     name:"个人",
                    //     value:1
                    // }
                ],
                storeName:"",
                refereePhone:""
            }
        },
        components:{
            NavBar,
            InpCom
        },
        computed:{
            ...mapState({
                userInfo: ({
                    packageinfo
                }) => packageinfo.userInfo,
                setInfo: ({
                    packageinfo
                }) => packageinfo.setInfo,
                refereeStore: ({
                    packageinfo
                }) => packageinfo.refereeStore,
                storeInfo: ({
                    packageinfo
                }) => packageinfo.storeInfo
            })
        },
        activated:function(){
            if(this.refereeStore.storeName){
                this.storeName = this.refereeStore.storeName;
                this.storeId = this.refereeStore.storeId;
            }else{
                if(this.storeInfo.storeName){
                    this.storeName = this.storeInfo.storeName;
                    this.storeId = this.storeInfo.storeId;
                }else{
                    this.storeName = '';
                }
            }
        },
        methods:{
            goStore:function(){
                const wbpId = this.setInfo.wbpId;
                this.$router.push({name:'store',params:{wbpId}});
            },
            submitReferee:function(){
                if(this.refereeType == 0){
                    this.setUserInfo({refereeType:this.refereeType,referee:this.storeName,refereeId:this.storeId})
                }else{
                    this.setUserInfo({refereeType:this.refereeType,referee:this.refereePhone,refereeId:''})
                }
                this.$router.back();
            },
            updatePhone:function(e){
                this.refereePhone = $(e.target).val();
            },
            ...mapMutations({
                setUserInfo:'UPDATE_USER_INFO',
            })
        },
        filters: {
        },
        beforeRouteEnter: (to, from, next) => {
            Tool.routerEnter(to,from,next);
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
            .input-control{
                height:1.8rem;
                line-height:1.8rem;
                background-color:#fff;
                padding:0 3%;
                margin-bottom:1px;
                .label{
                    width:40%;
                    font-size:0.68rem;
                }
                .select-item{
                    width:3rem;
                    .iconfont{
                        color:#ccc;
                        margin-right:0.1rem;
                    }
                    .icon-select{
                        color:#fc4c1d;
                    }
                }
            }
            .button{
                position:absolute;
                bottom:0;
                left:0;
                right:0;
                height:2.1rem;
                line-height:2.1rem;
                font-size:0.64rem;
                text-align:center;
                background-color:#389cf2;
                color:#fff;
            }
        }
    }
</style>