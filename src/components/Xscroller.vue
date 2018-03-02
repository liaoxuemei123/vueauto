<template>
    <div class="wrapper" ref='wrapper'><!--仅调试的时候使用@touchstart.prevent=""-->
        <div class="x-scroller" ref="xscroller">
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
                scrollerInfo:{
                    x:0,
                    width:0,
                    postion:1,
                    itemNum:0,
                },
            }
        },
        componentName:'xscroller',
        props:{
            refMark:{
                type:String,
                default:''
            },
            slots:{
                type:Array,

            }
        },
        created:function(){
            this.$on('init',this.init);
            this.$on('page',this.xscroll);
        },
        methods:{
            init:function(){
                if(!$.isEmptyObject(this.mySroller)){
                    this.mySroller.destroy();//如果有新的实例，就把老的删除掉
                }
                const $xscroller = $(this.$el).find(".x-scroller");
                var totalWidth = 0;
                $xscroller.find('.x-item').each(function(){
                    totalWidth += Number($(this).css('width').replace('px',''))
                })
                this.scrollerInfo.width = totalWidth;
                console.log(totalWidth);
                this.scrollerInfo.itemNum = $xscroller.find('.x-item').length;
                // $xscroller.css('width',`${totalWidth}px`);
                $xscroller.css('width',"100%");
                this.mySroller = new IScroll(this.$el,{
                    scrollX: true,  
                    scrollY: false, 
                    hScrollbar:false,
                    vScrollbar:false,
                    vScroll:false,
                    snap:true
                })
                var self = this;
                this.mySroller.on('scrollEnd',function(e){
                    self.scrollerInfo.x = this.x;
                })
            },
            xscroll:function(param){
                const { oldVal, newVal } = param;
                var move = 0;
                if(newVal > this.scrollerInfo.postion && newVal < this.scrollerInfo.itemNum){
                    move = -1;
                }else if(newVal < this.scrollerInfo.postion && newVal > 0) {
                    move = 1;
                }
                newVal == 0 ? move = this.scrollerInfo.itemNum - 3 : '';
                newVal == this.scrollerInfo.itemNum - 1 ? this.scrollerInfo.postion = this.scrollerInfo.itemNum - 2 : '';
                const width = $('html').css('font-size').replace('px','') * 5.4;
                const htmlWidth = $('html').css('width').replace('px','');
                if((this.scrollerInfo.x + move * width) > 0) {
                    this.scrollerInfo.postion = 1;
                    this.scrollerInfo.x = 0;
                    this.mySroller.scrollTo(this.scrollerInfo.x, 0, 300);
                    return 
                };
                if((this.scrollerInfo.x + move * width) < htmlWidth - this.scrollerInfo.width){
                    this.scrollerInfo.postion = this.scrollerInfo.itemNum - 2
                    this.scrollerInfo.x = - (this.scrollerInfo.itemNum - 3) * width
                    this.mySroller.scrollTo(this.scrollerInfo.x, 0, 300);
                    return;
                }
                this.scrollerInfo.x += move * width;
                this.scrollerInfo.postion -= move;
                this.mySroller.scrollTo(this.scrollerInfo.x, 0, 300);
            },
        },
        beforeDestroy:function(){
            this.mySroller.destroy();
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