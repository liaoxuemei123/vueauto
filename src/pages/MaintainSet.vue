<template>
    <div class="maintainset-page page" flex="dir:top box:first">
        <search 
            placeholder="搜索套餐"
        />
        <div class="page-content">
        </div>
    </div>
</template>
<script>
    import Search from '../components/Search';
    export default {
        data () {
            return {

            }
        },
        components:{
            Search
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
        }
    }
</style>