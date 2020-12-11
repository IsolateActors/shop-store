<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#47d3ce" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[0]" :key="res.order_id">
								<view class="top">
									<view class="left">
										<u-icon name="order" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.order_number.slice(-7) }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.pay_status == 0 ? "未支付" : (res.pay_status == 1 ? "已支付": "已关闭") }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goods" :key="item.id">
									<view class="left"><image :src="item.goods_small_logo" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.goods_name }}</view>
										<!-- <view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.goods_price) }}
											<text class="decimal">.{{ priceDecimal(item.goods_price) }}</text>
										</view>
										<view class="number">x{{ item.goods_number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ res.total_count }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(res.total_price) }}.
										<text class="decimal">{{ priceDecimal(res.total_price) }}</text>
									</text>
								</view>
								<!-- <view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">{{res.order_fapiao_title}}</view>
								</view> -->
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[1]" :key="res.order_id">
								<view class="top">
									<view class="left">
										<u-icon name="order" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.order_number.slice(-7) }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.pay_status == 0 ? "未支付": (res.pay_status == 1 ? "已支付": "已关闭") }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goods" :key="item.id">
									<view class="left"><image :src="item.goods_small_logo" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.goods_name }}</view>
										<!-- <view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.goods_price) }}
											<text class="decimal">.{{ priceDecimal(item.goods_price) }}</text>
										</view>
										<view class="number">x{{ item.goods_number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ res.total_count }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(res.total_price) }}.
										<text class="decimal">{{ priceDecimal(res.total_price) }}</text>
									</text>
								</view>
								<!-- <view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">{{res.order_fapiao_title}}</view>
								</view> -->
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<u-empty text="空空如也" mode="car"></u-empty>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[3]" :key="res.order_id">
								<view class="top">
									<view class="left">
										<u-icon name="order" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.order_number }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.pay_status == 0 ? "未支付": (res.pay_status == 1 ? "已支付": "已关闭") }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goods" :key="item.id">
									<view class="left"><image :src="item.goods_small_logo" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.goods_name }}</view>
										<!-- <view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.goods_price) }}
											<text class="decimal">.{{ priceDecimal(item.goods_price) }}</text>
										</view>
										<view class="number">x{{ item.goods_number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ res.total_count }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(res.total_price) }}.
										<text class="decimal">{{ priceDecimal(res.total_price) }}</text>
									</text>
								</view>
								<!-- <view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">{{res.order_fapiao_title}}</view>
								</view> -->
							</view>
							<u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [[],[],[],[]],
					
					list: [
						{
							name: '全部订单'
						},
						{
							name: '待付款'
						},
						{
							name: '待发货'
						},
						{
							name: '退款/退货',
							// count: 12
						}
					],
					current: 0,
					swiperCurrent: 0,
					tabsHeight: 0,
					dx: 0,
					loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
				}
			},
			onShow() {
				const token = uni.getStorageSync('token')
				if(!token){
					uni.navigateTo({
						url:"/pages/auth/auth"
					})
					return
				}
				
				let pages = getCurrentPages();
				let currentPage = pages[pages.length - 1]
				// console.log(currentPage.options)
				let {type} = currentPage.options
				type = type ? type:1
				// console.log(type)
				this.current = type -1
				this.swiperCurrent = type -1
				this.dx = type -1
				this.getOrderList(type)
			},
			computed: {
				// 价格小数
				priceDecimal() {
					return val => {
						if (val !== parseInt(val)) return val.slice(-2);
						else return '00';
					};
				},
				// 价格整数
				priceInt() {
					return val => {
						// console.log(val)
						if (val !== parseInt(val)) return val.split('.')[0];
						else return val;
					};
				}
			},
			methods: {
				reachBottom() {
					// 此tab为空数据
					if(this.current != 2) {
						this.loadStatus.splice(this.current,1,"loading")
						this.getOrderList(this.current + 1);
					}
				},
				// 页面数据
				async getOrderList(type) {
					const res = await this.$u.api.getAllOrder({
						type
					})
					// console.log(res)
					let index = type - 1
					// console.log(index)
					res.orders.map(item => {
						this.orderList[index].push(item)
					})
					// console.log(this.orderList[index])
					// console.log(res.orders)
					if(res.orders.length < 10){
						this.loadStatus.splice(this.current,1,"nomore")
						// console.log(this.loadStatus)
					}else{
						this.loadStatus.splice(this.current,1,"loadmore")
					}
					
				},
				
				// tab栏切换
				change(index) {
					this.swiperCurrent = index;
					this.orderList[index] = []
					this.getOrderList(index + 1);
				},
				transition({ detail: { dx } }) {
					this.$refs.tabs.setDx(dx);
				},
				animationfinish({ detail: { current } }) {
					this.$refs.tabs.setFinishCurrent(current);
					this.swiperCurrent = current;
					this.current = current;
					this.getOrderList(current + 1);
				}
			}
		}
	
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: 500;
			}
		}
		.right {
			color: $theme-color;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			flex: 3;
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			flex: 5;
			.title {
				font-size: 28rpx;
				line-height: 50rpx;
			}
			// .type {
			// 	margin: 10rpx 0;
			// 	font-size: 24rpx;
			// 	color: $u-tips-color;
			// }
			// .delivery-time {
			// 	color: #e5d001;
			// 	font-size: 24rpx;
			// }
		}
		.right {
			flex: 2;
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	// .bottom {
	// 	display: flex;
	// 	margin-top: 40rpx;
	// 	padding: 0 10rpx;
	// 	justify-content: space-between;
	// 	align-items: center;
	// 	.btn {
	// 		line-height: 52rpx;
	// 		width: 160rpx;
	// 		border-radius: 26rpx;
	// 		border: 2rpx solid $u-border-color;
	// 		font-size: 26rpx;
	// 		text-align: center;
	// 		color: $u-type-info-dark;
	// 	}
	// 	.evaluate {
	// 		color: $u-type-warning-dark;
	// 		border-color: $u-type-warning-dark;
	// 	}
	// }
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(71, 211, 206, 1) 0%, rgba(85, 254, 246, 1) 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
