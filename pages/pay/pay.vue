<template>
	<view>
		<!-- 收货地址 -->
		<view class="revice_address_row">
			<u-cell-group>
				<u-cell-item v-if="Object.keys(address).length <= 0" icon="map-fill" title="获取收货地址" @click="handleChooseAddress"></u-cell-item>
				<!-- 有默认地址时 -->
				<u-cell-item v-else icon="map" :title="address.userName + '  ' + address.telNumber" :label="address.all" value="更换收货地址"
				 @click="handleChooseAddress">
				</u-cell-item>
			</u-cell-group>
		</view>


		<!-- 购物车列表 -->
		<view class="goodscart-list">
			<view class="goodscart-item" v-for="(item, index) in cartlist" :key="item.goods_id">
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
						<view class="goods-num">
							x{{item.num}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部工具栏 -->
		<view class="foot-tool">
			<view class="total-price-wrap">
				<view class="total-price">
					合计: <text class="total-price-text">￥{{totalPrice}}</text>
				</view>
				<view class="transform-price">
					包含运费
				</view>
			</view>

			<view class="order-pay-wrap">
				<u-button size="medium" :custom-style="{color: '#47d3ce'}" shape="circle" @click="handleOrderPay">支付({{totalNum}})</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: {},
				cartlist: [],
				totalPrice: 0,
				totalNum: 0
			}
		},

		methods: {
			handleChooseAddress() {
				uni.chooseAddress({
					success(result) {
						console.log(result)
						result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
						uni.setStorageSync('address', result)
					}
				})
				// 新版不需要获取权限了。scopeAddress 都为true
				// 获取 权限状态
				// uni.getSetting({
				// 	success(res) {
				// 		console.log(res)
				// 		const scopeAddress = res.authSetting['scope.address']
				// 		console.log(scopeAddress)
				// 		if(scopeAddress === true || scopeAddress === undefined){
				// 			uni.chooseAddress({
				// 				success(result) {
				// 					console.log(result)
				// 				}
				// 			})
				// 		}else{
				// 			// 用户取消了授权
				// 			uni.openSetting({
				// 				success() {
				// 					uni.chooseAddress({
				// 						success(result) {
				// 							console.log(result)
				// 						}
				// 					})
				// 				}
				// 			})
				// 		}
				// 	}
				// })
			},
			// 支付
			async handleOrderPay() {
				const token = uni.getStorageSync('token')
				 
				 if(!token){
					 uni.navigateTo({
					 	url:"/pages/auth/auth"
					 })
					 return
				 }
				 
				 console.log(token)
				 
				 let goods = []
				 this.cartlist.forEach(v => goods.push({
					 goods_id: v.goods_id,
					 goods_number: v.num,
					 goods_price: v.goods_price
				 }))
				 
				 // 支付
				 try{
				 	const {order_number} = await this.$u.api.getOrderCreate({
				 						 order_price: this.totalPrice,
				 						 consignee_addr: this.address.all,
				 						 goods: goods
				 	})
				 	
				 	const {pay} = await this.$u.api.getOrderPay({
				 						 order_number
				 	})
				 	
				 	await uni.requestPayment(pay)
					
					// 查询支付状态
					const res = await this.$u.api({order_number})
					console.log(res)
					await this.$u.toast("支付成功")
					
					// 设回缓存
					let newCart = uni.getStorageSync('cart');
					newCart = newCart.filter(v=> !v.checked)
					uni.setStorageSync('cart', newCart)
					
					this.$u.route('/pages/order/order');
				 }catch(e){
				 	//TODO handle the exception
					await this.$u.toast("支付失败")
				 }
				 
				 console.log(res)
				 
			}
		},

		onShow() {
			// 每次打开获取一下地址
			const address = uni.getStorageSync('address')
			this.address = address

			// 获取购物车中的数据
			const cart = uni.getStorageSync('cart') || [];
			let checkedCart = cart.filter(v => v.checked)
			this.cartlist = checkedCart

			// 总价格 总数量
			let totalPrice = 0
			let totalNum = 0
			// 当数组为空时则不执行，所以要为空数组做一次判断
			checkedCart.forEach(v => {

				totalPrice += v.num * v.goods_price
				totalNum += v.num

			})
			this.totalPrice = totalPrice
			this.totalNum = totalNum

		}
	}
</script>

<style>
	page {
		background-color: rgb(240, 240, 240);
		padding-bottom: 100rpx;
	}
</style>
<style lang="scss">
	.revice_address_row {
		border-radius: 20rpx;
		overflow: hidden;
	}
	
	.goodscart-list {
		margin-top: 10rpx;
		}

	.goodscart-item {
		display: flex;
		background-color: #FFFFFF;
		height: 260rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		margin-bottom: 10rpx;

		.cart-img {
			flex: 3;
			display: flex;
			justify-content: center;
			align-items: center;

			.image {
				width: 202rpx;
				height: 202rpx;
			}
		}

		.cart-info-wrap {
			flex: 7;
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

				.goods-num {
					margin-right: 20rpx;
				}
			}
		}
	}


	.foot-tool {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		display: flex;


		.total-price-wrap {
			flex: 6;
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
