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
import { MessageBox } from 'mint-ui';
export default {
	data () {
		return {
			time:'',
			timer:null,
			timeLineSHow:false,
		}
	},
	components:{
		Advert,
		MessageBox
	},
	computed:{
		...mapState({
			mode:({
				routes
			}) => routes.mode,
			wbyQd: ({
				pageconfig
			}) => pageconfig.qd,
		})
	},
	created:function(){
		const qd = this.$route.query.wbyQd;
		var timeLine = [1501462800000,1501516860000];
		var img = require('./assets/dsj.png');
		if(qd == 'DSJZX' || this.wbyQd == 'DSJZX'){
			this.timer = setInterval(()=>{
				if(new Date().getTime() > timeLine[0]){
					if(new Date().getTime() > timeLine[1]){
						this.timeLineSHow = false;
						clearInterval(this.timer);
					}else{
						MessageBox({
							title:"消息",
							message:`<img src=${img} style="width:150px;height:80px;"></img><br>8月1日~8月28日期间购买长安爱车节专享套餐即赠送150元长安商城精品立减券，敬请期待！`,
							closeOnClickModal:false
						},() => {
							clearInterval(this.timer);
						})
					}
				}
				this.time = Tool.getCurrentDate('fulltime');
			},1000)
		}
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
