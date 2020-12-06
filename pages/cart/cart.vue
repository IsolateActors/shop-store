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
			<view class="goodscart-item" v-for="item in cartlist" :key="item.goods_id">
				<view class="cart-check ">
					<u-checkbox @change="handleItemChange(item.goods_id)" v-model="item.checked" active-color="#eb4450"></u-checkbox>
				</view>
				<view class="cart-img">
					<image mode="widthFix" :src="item.goods_small_logo"></image>
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
		</view>
		<!-- 底部工具栏 -->
		<view class="foot-tool">
			<view class="all-check-wrap">
				<u-checkbox @change='handleItemAllchecked' v-model="allchecked" active-color="#eb4450">全选</u-checkbox>
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
				<u-button size="medium" type="error" shape="circle">结算({{totalNum}})</u-button>
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
				address: {},
				cartlist: [],
				allchecked: false,
				totalPrice: 0,
				totalNum: 0
			}
		},
		computed: {
			...mapState(['vuex_tabbar', 'vuex_tabbar_active_color'])
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
			
			// 选中项
			handleItemChange(goodsId){
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
			setCart(cart){
				// 计算全选
				// every 遍历空数组返回true
				// this.allchecked = cart.length > 0 ? cart.every(v => v.checked) : false
				let allchecked = cart.length > 0 ? true : false
				
				// 总价格 总数量
				let totalPrice = 0
				let totalNum= 0
				// 当数组为空时则不执行，所以要为空数组做一次判断
				cart.forEach(v => {
					if(v.checked){
						totalPrice += v.num * v.goods_price
						totalNum += v.num
					}else{
						allchecked = false
					}
				})
				this.totalPrice = totalPrice
				this.totalNum = totalNum
				this.allchecked = allchecked
			},
			
			// 全选功能
			handleItemAllchecked(){
				console.log(this.allchecked)
				this.allchecked = !this.allchecked
				console.log(this.allchecked)
				// 同步数据全部选中或全部不选中
				this.cartlist.forEach(v => v.checked = this.allchecked)
				this.setCart(this.cartlist)
				uni.setStorageSync('cart', this.cartlist)
			},
			
			// 购买数量
			handleBuyNum(options, goodsId){
				console.log(options)
				console.log(goodsId)
				let goodsIndex = this.cartlist.findIndex(v => v.goods_id === goodsId)
				this.cartlist[goodsIndex].num = options.value
				this.setCart(this.cartlist)
				uni.setStorageSync('cart', this.cartlist)
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
	}
</style>

<style lang="scss" scoped>
	.revice_address_row {
		border-radius: 20rpx;
		overflow: hidden;
	}

	.goodscart-list {
		margin-top: 20rpx;
		margin-bottom: 100rpx;

		.goodscart-item {
			display: flex;
			background-color: #FFFFFF;
			height: 260rpx;
			padding: 20rpx;
			border-radius: 20rpx;
			margin-bottom: 10rpx;

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
					width: 100%;
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
	
	.foot-tool{
		position: fixed;
		left: 0;
		bottom: 100rpx;
		width: 100%;
		height: 90rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		
		.all-check-wrap{
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.total-price-wrap{
			flex: 4;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 10rpx;
			.total-price{
				display: flex;
				justify-content: flex-end;
				.total-price-text{
					font-size: 32rpx;
					font-weight: 600;
					color: $theme-color;
				}
			}
			.transform-price{
				display: flex;
				justify-content: flex-end;
				font-size: 22rpx;
			}
		}
		.order-pay-wrap{
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 10rpx;
		}
	}
</style>
