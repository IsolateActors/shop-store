<template>
	<view>
		<!-- 搜索框 -->
		<search-input></search-input>

		<!-- 导航tabs -->
		<view class="tabs-title">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#eb4450"></u-tabs>
		</view>
		
		<!-- 商品列表 -->
		<view class="tabs-content">
			<block v-if="current == 0">
				<view class="first-tab">
					<view class="goods-item">
						<view class="goods-img-wrap u-line-2">
							<image mode="widthFix" src="../../static/logo.png"></image>
						</view>
						<view class="goods-info-wrap">
							<view class="goods-name">
								hhhhhhhhhhhhhhhh
							</view>
							<view class="goods-price">
								9999999999
							</view>
						</view>
					</view>
					
					<view class="goods-item">
						<view class="goods-img-wrap">
							<image mode="widthFix" src="../../static/logo.png"></image>
						</view>
						<view class="goods-info-wrap">
							<view class="goods-name u-line-2">
								哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
							</view>
							<view class="goods-price">
								9999999999
							</view>
						</view>
					</view>
					
					<view class="goods-item">
						<view class="goods-img-wrap">
							<image mode="widthFix" src="../../static/logo.png"></image>
						</view>
						<view class="goods-info-wrap">
							<view class="goods-name">
								hhhhhhhhhhhhhhhh
							</view>
							<view class="goods-price">
								9999999999
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-else-if="current == 1">2</block>
			<block v-else="current == 2">3</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '综合'
				}, {
					name: '销量'
				}, {
					name: '价格',
				}],
				current: 0
			};
		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style>
	page{
		background-color: rgb(240, 240, 240);;
	}
	.u-tabs{
		border-radius: 8rpx;
	}
</style>

<style lang="scss">
	.tabs-title{
		border-radius: 8rpx;
	}
.goods-item{
	border-radius: 8rpx;
	margin: 10rpx 0;
	background-color: #FFFFFF;
	padding: 16rpx;
	display: flex;
	
	.goods-img-wrap{
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		
		image{
			width: 60%;
		}
	}
	
	.goods-info-wrap{
		flex: 4;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.goods-name{}
		.goods-price{
			color: $theme-color;
			font-size: 32rpx;
		}
	}
}

</style>
