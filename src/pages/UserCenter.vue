<template>
    <div class="page-container">
        <div class="page home-page" flex="dir:top box:first">
            <nav-bar
                title="个人中心"
            />
            <div class="page-content" flex="dir:top box:last">
                <div class="user-info">
                    <div class="info-control" @click="myorder" flex="dir:left box:first">
                        <div class="label"><span>我的订单</span></div>
                        <div class="value">查看全部订单<i class="iconfont icon-go"></i></div>
                    </div>
                    <div class="info-control" flex="dir:left box:first">
                        <div class="label"><span>昵称</span></div>
                        <div class="value">{{userInfo.nickName | nameFilter}}</div>
                    </div>
                    <div class="info-control" flex="dir:left box:first">
                        <div class="label"><span>性别</span></div>
                        <div class="value">{{userInfo.sex | sexFilter}}</div>
                    </div>
                    <div class="info-control" flex="dir:left box:first">
                        <div class="label"><span>手机号</span></div>
                        <div class="value">{{userInfo.mobile | phoneFilter}}</div>
                    </div>
                </div>
                <div class="logout-button" @click="logout">
                    退出
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Xscroller from '../components/Xscroller';
    import Tool from '../utils/Tool';
    export default{
        data () {
            return {
                userInfo:{
                    nickName:'',
                    sex:'',
                    mobile:'',
                },
            }
        },
        components:{
            NavBar,
            Xscroller
        },
        activated:function(){
            const userData = JSON.parse(Tool.localItem('userData'));
            if(userData){
                this.userInfo = userData;
            }else{
                const userInfo = JSON.parse(Tool.localItem('userInfo'));
                if(userInfo){
                    Tool.get('queryUserInfo',{userToken:userInfo.token},data => {
                        const userCenter = JSON.parse(JSON.parse(data));
                        if(userCenter.data){
                            this.userInfo = userCenter.data;
                            Tool.localItem('userData',userCenter.data);
                        }
                    });
                }
            }
        },
        methods:{
            logout:function(){
                Tool.removeLocalItem('userInfo');
                Tool.removeLocalItem('modelInfo');
                this.$router.push({name:'login'});
            },
            myorder:function(){
                this.$router.push({name:'myorder'});
            }
        },
        filters: {
            phoneFilter:function(val) {
                var arr = (val+'').split('');
                arr.splice(3,4,'****');
                return arr.join('');
            },
            sexFilter:function(val) {
                if(!val) return '男'
                const sexArray = {
                    '1':'男',
                    '2':'女'
                }
                return sexArray[val];
            },
            nameFilter:function(val){
                if(!val) return '用户' + Math.ceil( Math.random() * 10000 );
                return val;
            }
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
            .info-control{
                height:1.8rem;
                line-height:1.8rem;
                background-color:#fff;
                padding:0 3%;
                margin-bottom:1px;
                .label{
                    width:3rem;
                }
                .value{
                    text-align:right;
                    .iconfont{
                        font-size: 0.57rem;
                        margin-left:0.1rem;
                    }
                }
            }
            .logout-button{
                text-align:center;
                background-color:#ff3300;
                font-size:0.64rem;
                color:#fff;
                height:1.8rem;
                line-height:1.8rem;
            }
        }
    }
</style>