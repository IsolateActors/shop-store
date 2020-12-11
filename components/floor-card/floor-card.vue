<template>
	<view class="index-floor">
		<view class="floor-group" v-for="item in list" :key="item.floor_title.name">
			<!-- 标题 -->
			<view class="floor-title">
				<u-image mode="widthFix" width="100%" :src="item.floor_title.image_src"></u-image>
			</view>
			<!-- 内容 -->
			<view class="floor-list">
				<view class="left">
					<navigator :url="item.product_list[0].navigator_url | queryUrlFilter">
						<u-image mode="scaleToFill" width="100%" height="100%" :src="item.product_list[0].image_src"></u-image>
					</navigator>
				</view>
				<view class="right">
					<navigator :url="item.product_list[1].navigator_url | queryUrlFilter">
						<u-image mode="scaleToFill" width="100%" height="100%" :src="item.product_list[2].image_src"></u-image>
					</navigator>
					<navigator :url="item.product_list[2].navigator_url | queryUrlFilter">
						<u-image mode="scaleToFill" width="100%" height="100%" :src="item.product_list[2].image_src"></u-image>
					</navigator>
					<navigator :url="item.product_list[3].navigator_url | queryUrlFilter">
						<u-image mode="scaleToFill" width="100%" height="100%" :src="item.product_list[3].image_src"></u-image>
					</navigator>
					<navigator :url="item.product_list[4].navigator_url | queryUrlFilter">
						<u-image mode="scaleToFill" width="100%" height="100%" :src="item.product_list[4].image_src"></u-image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['list'],
		filters:{
			queryUrlFilter(value){
				if(!value)
					return ''
				let index = value.toString().indexOf('?')
				// console.log(value.slice(index))
				let queryStr = value.slice(index)
				return '/pages/goods-list/goods-list' + queryStr
			}
		}
	}
</script>

<style lang="scss">
	
.floor-group{
	margin-bottom: 20rpx;
}
.floor-list{
	display: flex;
	
	.left{
		flex: 1;
		padding: 0 10rpx;
		
		navigator{
			height: 33.33vw * 386 / 232;
		}
	};
	
	.right {
		flex: 2;
		display: flex;
		flex-wrap: wrap;
		
		padding: 0 10rpx 0 0;
		
		navigator{
			width: 50%;
			height: 33.33vw * 386 / 232 / 2;
			
			&:nth-child(1),
			&:nth-child(3){
				padding-right: 10rpx;
			}
			&:nth-child(3),
			&:nth-child(4){
				padding-top: 10rpx;
			}
		}
		
		
	};
}
</style>
