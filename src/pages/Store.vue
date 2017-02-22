<template>
    <div class="store-page">
        <nav-bar 
            title="搜素店铺"
        />
        <div class="page-content">
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    export default {
        data () {
            return {

            }
        },
        components:{
            NavBar
        }
    }
</script>
<style lang="less" scoped>
    .store-page{
        height:100%;
        position:absolute;
        width:100%;
        .page-content{
            background-color: #efefef;
            height:100%;
            overflow: auto;
        }
    }
</style>