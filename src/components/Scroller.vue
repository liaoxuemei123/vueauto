<template>
    <div class="wrapper" ref='wrapper'>
        <div class="scroller">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import '../js/iscroll';
    export default{
        data () {
            return {
                mySroller:{},
                scrollerInfo:{},
            }
        },
        updated:function(){
            var self = this;
            if(!$.isEmptyObject(this.mySroller)){
                this.mySroller.on('scroll',function(){});
                this.mySroller = {};
            }
            this.mySroller = new IScroll(this.$el,{
                probeType: 2,
                scrollX: false,
                scrollY: true,
                mouseWheel: true,
                isPullToRefresh: true,
            })
            this.mySroller.on('scrollEnd',function(e){
                self.scrollerInfo.y = this.y;
            })
        },
        beforeDestroy:function(){
            this.mySroller = {};
            this.mySroller.on('scroll',function(){});
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