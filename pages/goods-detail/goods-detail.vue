<template>
	<view v-if="Object.keys(goodsData).length !== 0">
		<!-- 商品轮播图 -->
		<view class="swiper">
			<u-swiper @click="handlePreviewImg()" bg-color='#ffffff' mode='number' indicator-pos='bottomRight' height='487'
			 img-mode='aspectFit' :list="goodsData.pics" name='pics_mid'></u-swiper>
		</view>

		<!-- 商品标题 -->
		<view class="goods-title">
			<view class="goods-price">
				￥{{goodsData.goods_price}}
			</view>
			<view class="good-name-row">
				<view class="goode-name u-line-2">
					{{goodsData.goods_name}}
				</view>
				<view class="goods-collect">
					<u-icon name="star" size="28"></u-icon>
					<view class="collect-text">
						收藏
					</view>
				</view>
			</view>
		</view>

		<!-- 商品详情 -->
		<view class="goods-info">
			<view class="goods-info-title">
				图文详情
			</view>
			<view class="goods-info-content">
				<rich-text :nodes="goodsData.goods_introduce"></rich-text>
			</view>
		</view>

		<!-- 提交栏 -->
		<view class="navigation">
			<view class="left">
				<view class="item contact">
					<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
					<button class="btn" open-type="contact"></button>
				</view>
				<view class="item">
					<u-icon name="share" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">分享</view>
					<button class="btn" open-type="share"></button>
				</view>
				<view class="item car" @click="goCart()">
					<u-badge class="car-num" :count="cartcount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="handleAddCart">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsData: {},
				cartcount:0
			};
		},
		onLoad(options) {
			console.log(options)
			this.getGoodsDetail(options.goods_id)
			
			// 购物车数量
			let cart = uni.getStorageSync('cart') || [];
			this.cartcount = cart.length
		},
		methods: {
			async getGoodsDetail(goodsId) {
				const res = await this.$u.api.getGoodsDetail({
					goods_id: goodsId
				})
				console.log(res)
				this.goodsData = {
					goods_price: res.goods_price,
					goods_name: res.goods_name,
					goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
					pics: res.pics,
					goods_id :res.goods_id,
					goods_small_logo: res.goods_small_logo
				}
			},

			// 预览图片
			handlePreviewImg(index) {
				console.log(index)
				// 预览图片
				const urls = this.goodsData.pics.map(p => p.pics_mid)
				uni.previewImage({
					urls: urls,
					current: index,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},

			goCart() {
				this.$u.route({
					type: "switchTab",
					url: 'pages/cart/cart'
				})
			},
			
			// 添加购物车
			handleAddCart(){
				console.log("添加购物车")
				
				this.$u.debounce(()=>{
					let cart = uni.getStorageSync('cart') || [];
					let index = cart.findIndex(v => v.goods_id === this.goodsData.goods_id)
					if(index === -1){
						// 不存在
						console.log(index)
						this.goodsData.num = 1
						// 滑块画出状态
						this.goodsData.swipeActionShow = false
						// 选中状态
						this.goodsData.checked = true
						cart.push(this.goodsData)
						this.cartcount ++
					}else{
						// 已存在
						cart[index].num ++
					}
					
					// 把购物车重新添加回缓存中
					uni.setStorageSync('cart', cart)
					
					this.$refs.uToast.show({
						title: '添加成功',
						type: 'default'
						// url: '/pages/user/index'
					})
				}, 500)
				
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 110rpx;
	}

	.u-swiper-item u-swiper-item {
		justify-content: center;
		align-items: center;
	}
</style>
<style lang="scss">
	.goods-price {
		padding: 15rpx 15rpx 0 15rpx;
		font-size: 32rpx;
		font-weight: 600;
		color: $theme-color;
		border-top: 1rpx solid #eee;
		padding-left: 20rpx;
	}

	.good-name-row {
		display: flex;
		border-bottom: 5rpx solid #eee;
		padding: 10rpx 0;

		.goode-name {
			flex: 5;
			color: #000;
			font-size: 30rpx;
			padding: 0 20rpx;
			line-height: 50rpx;
			font-weight: 500;
		}

		.goods-collect {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;


			.collect-text {
				font-size: 28rpx;
			}
		}
	}

	.goods-info {
		.goods-info-title {
			font-size: 32rpx;
			color: $theme-color;
			font-weight: 600;
			padding: 20rpx;
		}

		.goods-info-content {}
	}

	.navigation {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;

		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 30rpx;
				position: relative;

				.btn {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
				}


				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ff7900;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ed3f14;
			}
		}
	}
</style>
