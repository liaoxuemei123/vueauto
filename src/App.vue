<template>
	<div id="pagecontainer">
		<transition :name="mode">
			<router-view></router-view>
		</transition>
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
	}
}
</script>
<style>
#pagecontainer{
	position:relative;
}
.push-enter-active {
	transition: all .3s ease;
	transform: translate3d(0%,0,0);
	z-index:1001;
}
.push-leave-active {
	transition: all .3s ease;
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
	transition: all .3s ease;
	transform: translate3d(0%,0,0);
	z-index:1000
}
.pop-leave-active {
	transition: all .3s ease-out;
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
