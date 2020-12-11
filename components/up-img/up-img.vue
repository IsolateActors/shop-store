<template>
	<view>
		<view class="up-img-wrap">
			<image :src="src" mode=""></image>
			<view class="icon">
				<u-icon :index='index' @click="remove" name="close-circle" size="30"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			src: {
				type: String,
				value: ''
			},
			index: Number,
			value: 0
		},
		data() {
			return {
				
			};
		},
		methods:{
			remove(index){
				this.$emit('removeImg', index)
			}
		}
	}
</script>

<style lang="scss">
.up-img-wrap{
	width: 90rpx;
	height: 90rpx;
	position: relative;
	
	image{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	
	.icon{
		position: absolute;
		right: -10rpx;
		top: -10rpx;
	}
}
</style>
