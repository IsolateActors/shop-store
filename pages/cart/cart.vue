<template>
	<view>

		<!-- 购物车列表 -->
		<view class="goodscart-list">

			<block v-if="cartlist.length !== 0">
				<view class="item" v-for="(item, index) in cartlist" :key="item.goods_id">
					<u-swipe-action :show="item.swipeActionShow" :index="index"
					 @click="handleSwiperAction" @open="open" :options="options">
						<view class="goodscart-item">
							<view class="cart-check ">
								<u-checkbox @change="handleItemChange(item.goods_id)" v-model="item.checked" active-color="#47d3ce"></u-checkbox>
							</view>
							<view class="cart-img">
								<image class="image" mode="aspectFit" :src="item.goods_small_logo"></image>
							</view>
							<view class="cart-info-wrap">
								<view class="goods-name u-line-2">
									{{item.goods_name}}
								</view>
								<view class="goods-price-wrap">
									<view class="goods-price">
										￥{{item.goods_price}}
									</view>
									<u-number-box :min="1" v-model="item.num" @change="handleBuyNum($event, item.goods_id)"></u-number-box>
								</view>
							</view>
						</view>
					</u-swipe-action>
				</view>
			</block>

			<block v-else>
				<u-empty text="购物车为空" mode="car" margin-top="200"></u-empty>
			</block>

		</view>
		<!-- 底部工具栏 -->
		<view class="foot-tool" v-if="cartlist.length !== 0">
			<view class="all-check-wrap">
				<u-checkbox @change='handleItemAllchecked' v-model="allchecked" active-color="#47d3ce">全选</u-checkbox>
			</view>
			<view class="total-price-wrap">
				<view class="total-price">
					合计: <text class="total-price-text">￥{{totalPrice}}</text>
				</view>
				<view class="transform-price">
					包含运费
				</view>
			</view>

			<view class="order-pay-wrap">
				<u-button size="medium" type="error" shape="circle" @click="handlePay">结算({{totalNum}})</u-button>
			</view>
		</view>

		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="vuex_tabbar" :active-color='vuex_tabbar_active_color'></u-tabbar>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				current: 2,
				cartlist: [],
				allchecked: false,
				totalPrice: 0,
				totalNum: 0,

				// 左划操作
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#47d3ce'
					}
				}]
			}
		},
		computed: {
			...mapState(['vuex_tabbar', 'vuex_tabbar_active_color'])
		},
		methods: {

			// 选中项
			handleItemChange(goodsId) {
				console.log(goodsId)
				// 找到被修改商品对象
				let goodsIndex = this.cartlist.findIndex(v => v.goods_id === goodsId)
				// 取反
				this.cartlist[goodsIndex].checked = !this.cartlist[goodsIndex].checked
				uni.setStorageSync('cart', this.cartlist)

				// 重新计算全选总价格总数量
				this.setCart(this.cartlist)
			},

			// 计算总价格等
			setCart(cart) {
				// 计算全选
				// every 遍历空数组返回true
				// this.allchecked = cart.length > 0 ? cart.every(v => v.checked) : false
				let allchecked = cart.length > 0 ? true : false

				// 总价格 总数量
				let totalPrice = 0
				let totalNum = 0
				// 当数组为空时则不执行，所以要为空数组做一次判断
				cart.forEach(v => {
					if (v.checked) {
						totalPrice += v.num * v.goods_price
						totalNum += v.num
					} else {
						allchecked = false
					}
				})
				this.totalPrice = totalPrice
				this.totalNum = totalNum
				this.allchecked = allchecked
			},

			// 全选功能
			handleItemAllchecked() {
				console.log(this.allchecked)
				this.allchecked = !this.allchecked
				console.log(this.allchecked)
				// 同步数据全部选中或全部不选中
				this.cartlist.forEach(v => v.checked = this.allchecked)
				this.setCart(this.cartlist)
				uni.setStorageSync('cart', this.cartlist)
			},

			// 购买数量
			handleBuyNum(options, goodsId) {
				console.log(options)
				console.log(goodsId)
				let goodsIndex = this.cartlist.findIndex(v => v.goods_id === goodsId)
				this.cartlist[goodsIndex].num = options.value
				this.setCart(this.cartlist)
				uni.setStorageSync('cart', this.cartlist)
			},

			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.cartlist[index].swipeActionShow = true;
				this.cartlist.map((val, idx) => {
					if (index != idx) this.cartlist[idx].swipeActionShow = false;
				})
			},

			// 删除事件，第一个参数为通过Props传入的index参数，第二个参数为滑动按钮的索引
			handleSwiperAction(index, index1) {
				if (index1 == 0) {
					this.cartlist.splice(index, 1);
					this.$u.toast(`删除成功`);
					this.setCart(this.cartlist)
					uni.setStorageSync('cart', this.cartlist)
				} else {
					this.cartlist[index].swipeActionShow = false;
				}
			},

			// 跳转到支付页
			handlePay() {
				// if(!this.address.userName){
				// 	this.$u.toast("请选择收货地址！")
				// 	return
				// }

				if (this.totalNum === 0) {
					this.$u.toast("请选择商品！")
					return
				}

				this.$u.route('/pages/pay/pay');
			}
		},

		onShow() {
			// 每次打开获取一下地址
			const address = uni.getStorageSync('address')
			this.address = address

			// 获取购物车中的数据
			const cart = uni.getStorageSync('cart') || [];
			this.cartlist = cart
			this.setCart(cart)
		}
	}
</script>

<style>
	page {
		background-color: rgb(240, 240, 240);
		padding-bottom: 100rpx;
	}
</style>

<style lang="scss" scoped>
	.goodscart-list {
		margin-top: 10rpx;
		
		.item{
			overflow: hidden;
			border-radius: 20rpx;
			margin-bottom: 10rpx;
		}

		.goodscart-item {
			display: flex;
			background-color: #FFFFFF;
			height: 260rpx;
			padding: 20rpx;

			.cart-check {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
			}

			.cart-img {
				flex: 3;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 202rpx;
					height: 202rpx;
				}
			}

			.cart-info-wrap {
				flex: 6;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 20rpx;

				.goods-name {
					font-size: 28rpx;
				}

				.goods-price-wrap {
					display: flex;
					justify-content: space-between;

					.goods-price {
						color: $theme-color;
						font-size: 30rpx;
						font-weight: 600;
					}
				}
			}
		}
	}

	.foot-tool {
		position: fixed;
		left: 0;
		bottom: 90rpx;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		display: flex;

		.all-check-wrap {
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.total-price-wrap {
			flex: 4;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 10rpx;

			.total-price {
				display: flex;
				justify-content: flex-end;

				.total-price-text {
					font-size: 32rpx;
					font-weight: 600;
					color: $theme-color;
				}
			}

			.transform-price {
				display: flex;
				justify-content: flex-end;
				font-size: 22rpx;
			}
		}

		.order-pay-wrap {
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 10rpx;
		}
	}
</style>
