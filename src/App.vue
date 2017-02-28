<template>
	<div id="pagecontainer">
		<keep-alive>
			<transition :name="mode">
				<router-view></router-view>
			</transition>
		</keep-alive>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
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
		var geolocation = new BMap.Geolocation();
        var gc = new BMap.Geocoder();
        geolocation.getCurrentPosition(function(position){
			self.$store.commit('SET_LOCATION',position);
        });
	}
}
</script>
<style>
#pagecontainer{
	position:relative;
}
.push-enter-active {
	transition: all .2s ease-in;
	transform: translate3d(0%,0,0);
	z-index:1001;
}
.push-leave-active {
	transition: all .2s ease-in;
	transform: translate3d(0%,0,0);
	z-index: 1000;
}
.push-leave{
	transform: translate3d(0%,0,0);
	z-index: 1000;
}
.push-enter{
	transform: translate3d(100%,0,0);
	z-index:1001;
}

.pop-enter-active {
	transition: all .2s ease-in;
	transform: translate3d(0%,0,0);
	z-index:1000
}
.pop-leave-active {
	transition: all .2s ease-in;
	transform: translate3d(100%,0,0);
	z-index: 1001;
}
.pop-leave{
	transform: translate3d(0%,0,0);
	z-index: 1001;
}
.pop-enter{
	transform: translate3d(0%,0,0);
	z-index:1000
}
</style>
