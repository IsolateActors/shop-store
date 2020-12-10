<template>
	<view>
		<!-- 导航tabs -->
		<u-sticky offset-top="90">
			<view class="tabs-title">
				<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#47d3ce"></u-tabs>
			</view>
		</u-sticky>

		<!-- 商品列表 -->
		<view class="tabs-content">
			<block v-if="current == 0">
				<view class="first-tab">
					<view class="goods-item" v-for="item in collect" :key="item.goods_id" @click="goDetail(item.goods_id)">
						<view class="goods-img-wrap">
							<u-image width="175rpx" height="175rpx" :src="item.goods_small_logo">
								<view slot="error" style="font-size: 24rpx;">暂无图片</view>
							</u-image>
						</view>
						<view class="goods-info-wrap">
							<view class="goods-name u-line-2">
								{{item.goods_name}}
							</view>
							<view class="goods-price">
								￥{{item.goods_price}}
							</view>
						</view>
					</view>

					<u-divider bg-color="rgb(240, 240, 240)" height="40" margin-top="5" margin-bottom='10'>没有更多数据了</u-divider>
				</view>
			</block>
			<block v-else-if="current == 1">
				
			</block>
			<block v-else="current == 2">
				
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '商品收藏'
				}, {
					name: '品牌收藏'
				}, {
					name: '店铺收藏',
				}, {
					name: '浏览足迹',
				}],
				current: 0,

				collect: [],
				showHasMore: false
			};
		},
		methods: {
			change(index) {
				this.current = index;
			},

			async getGoodsList() {
				
			},

			goDetail(id) {
				this.$u.route({
					url: '/pages/goods-detail/goods-detail',
					params: {
						goods_id: id
					}
				})
			}
		},
		onShow() {
			this.collect = uni.getStorageSync("collect")
		},
		
	}
</script>

<style>
	page{
		background-color: rgb(240, 240, 240);
	}
	.u-sticky-wrap{
		border-radius: 0 0 20rpx 20rpx !important;
	}
	.u-tabs{
		overflow: hidden !important;
		border-radius: 20rpx;
	}
</style>

<style lang="scss">
	.tabs-title{
		border-radius: 10rpx;
	}
.goods-item{
	border-radius: 20rpx;
	margin: 10rpx 20rpx;
	background-color: #FFFFFF;
	padding: 16rpx;
	display: flex;
	
	.goods-img-wrap{
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
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