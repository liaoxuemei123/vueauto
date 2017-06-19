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
import En from './utils/Encryption';
export default {
	data () {
		return {

		}
	},
	computed:{
		...mapState({
			mode:({
				routes
			}) => routes.mode
		})
	},
	created:function(){
		if(this.$route.name != 'index'){
			Tool.post("linkcount",{},(data)=>{});
		}
		try{
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition((position) => {
				this.setLocation(position);
				if(this.$route.name != 'index' && this.$route.name !='selectplate' && position.address.city) {
					Tool.post("citycount",{city:position.address.city,province:position.address.province},(data)=>{})
				}
			}); 
		}catch(e){
			console.warn(e);
		}
	},
	methods:{
		...mapMutations({
			setLocation: 'SET_LOCATION'
		})
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
