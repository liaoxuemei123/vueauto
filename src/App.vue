<template>
	<div id="pagecontainer">
		<transition :name="mode">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>

		<advert v-if="timeLineSHow">
			<div class="advert" slot="advert">
				<a href="http://m.yizhibo.com/member/mpersonel/go_homepage?memberid=31679863">
					<img src="./assets/notify.jpg" alt="">
				</a>
			</div>
		</advert>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Tool from './utils/Tool';
import En from './utils/Encryption';
import Advert from './components/Advert';
export default {
	data () {
		return {
			time:'',
			timer:null,
			timeLineSHow:false,
		}
	},
	components:{
		Advert
	},
	computed:{
		...mapState({
			mode:({
				routes
			}) => routes.mode
		})
	},
	created:function(){
		var timeLine = [1500551400000,1500566400000];
		this.timer = setInterval(()=>{
			timeLine = [1500561180000,1500561240000];
			if(new Date().getTime() > timeLine[0]){
				this.timeLineSHow =  true;
				if(new Date().getTime() > timeLine[1]){
					this.timeLineSHow = false;
					clearInterval(this.timer);
				}
			}
			this.time = Tool.getCurrentDate('fulltime');
		},1000)
		const qd = this.$route.query.wbyQd;
		if(this.$route.name != 'index'){
			Tool.post("linkcount",{qdCode:qd || ''},(data)=>{});
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
	destroyed:function(){
		clearInterval(this.timer);
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
