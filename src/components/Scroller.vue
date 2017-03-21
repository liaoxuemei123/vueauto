<template>
    <div class="wrapper" ref='wrapper'>
        <div class="scroller">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import IScroll from 'iscroll';
    export default{
        data () {
            return {
                mySroller:{}
            }
        },
        updated:function(){
            this.mySroller = new IScroll(this.$el,{
                probeType: 2,
                scrollX: false,
                scrollY: true,
                mouseWheel: true,
                isPullToRefresh: true,
                tap:true,
            })
        }
    }
</script>
<style lang="less" scoped>
    .wrapper{
        overflow:hidden;
        width:100%;
        height:100%;
    }
</style>