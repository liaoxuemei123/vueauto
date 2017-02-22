<template>
    <div class="inp-com" flex="dir:left box:mean cross:center">
        <div>
            <i class="iconfont" :class="icon"></i><span>{{title}}</span>
        </div>
        <div>
            <input :type="type" :placeholder="placeholder">
        </div>
    </div>
</template>
<script>
    export default{
        data () {
            return {

            }
        },
        props:{
            icon:{
                type:String,
                default:'',
            },
            title:{
                type:String,
                default:''
            },
            type:{
                type:String,
                default:'text'
            },
            placeholder:{
                type:String,
                default:''
            }
        }
    }
</script>