<template>
	<view class="search-input">
		<navigator url="/pages/search/search">搜索</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.search-input{
	height: 90rpx;
	background-color: $theme-color;
	padding: 10rpx;
	
	navigator{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-color: #fff;
		border-radius: 15rpx;
		color: #666;
	}
}
</style>
