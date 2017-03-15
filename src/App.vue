<template>
	<div id="pagecontainer">
		<transition :name="mode">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Tool from './utils/Tool';
export default {
	data () {
		return {

		}
	},
	computed:{
		...mapState([
			"mode"
		])
	},
	created:function(){
		var self = this;
		//this.$router.push({name:'maintainset'});
		// var geolocation = new BMap.Geolocation();
        // var gc = new BMap.Geocoder();
        // geolocation.getCurrentPosition(function(position){
		// 	self.$store.commit('SET_LOCATION',position);
        // });
	}
}
</script>
<style>
#pagecontainer{
	position:relative;
}
.push-enter-active {
	transition: all .2s ease-out;
	transform: translate3d(0%,0,0);
	z-index:1001;
}
.push-leave-active {
	transition: all .2s ease-out;
	transform: translate3d(0%,0,0);
	z-index: 1000;
	opacity:0;
}
.push-leave{
	transform: translate3d(0%,0,0);
	z-index: 1000;
	opacity:1;
}
.push-enter{
	transform: translate3d(100%,0,0);
	z-index:1001;
}

.pop-enter-active {
	transition: all .2s ease-out;
	transform: translate3d(0%,0,0);
	opacity:1;
	z-index:1000;
}
.pop-leave-active {
	transition: all .2s ease-out;
	transform: translate3d(100%,0,0);
	z-index: 10001;
}
.pop-leave{
	transform: translate3d(0%,0,0);
	z-index: 10001;
}
.pop-enter{
	transform: translate3d(0%,0,0);
	z-index:1000;
	opacity:0;
}
</style>
