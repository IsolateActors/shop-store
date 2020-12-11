<template>
	<view>
		<view class="user-info-wrap">
			<view class="user-img-wrap">
				<image class="user-bg" :src="userInfo.avatarUrl" mode=""></image>
				<view class="user-info" v-if="Object.keys(userInfo).length > 0">
					<u-image width="150" height="150" :src="userInfo.avatarUrl" shape="circle" mode="widthFix"></u-image>
					<view class="user-name">
						{{userInfo.nickName}}
					</view>
				</view>
				<view class="info-btn" v-else>
					<u-button open-type="getUserInfo" @getuserinfo="handleGetUserInfo" plain size="mini" :ripple="true" type="primary">登录</u-button>
				</view>
			</view>
		</view>

		<view class="user-content">
			<view class="user-main">
				<!-- 足迹 -->
				<view class="histor-wrap">
					<navigator>
						<view class="his-num">
							0
						</view>
						<view class="his-name">
							收藏的店铺
						</view>
					</navigator>
					<navigator url="/pages/collect/collect">
						<view class="his-num">
							{{collectNum}}
						</view>
						<view class="his-name">
							收藏的商品
						</view>
					</navigator>
					<navigator>
						<view class="his-num">
							0
						</view>
						<view class="his-name">
							关注的商品
						</view>
					</navigator>
					<navigator>
						<view class="his-num">
							0
						</view>
						<view class="his-name">
							我的足迹
						</view>
					</navigator>
				</view>

				<view class="orders-wrap">
					<u-card title="我的订单" :full="true" title-size="26" padding='18'>
						<view class="order-content" slot="body">
							<navigator url="/pages/order/order?type=1">
								<u-icon name="order" size='40'></u-icon>
								<view class="order-name">
									全部订单
								</view>
							</navigator>

							<navigator url="/pages/order/order?type=2">
								<u-icon name="rmb-circle" size='40'></u-icon>
								<view class="order-name">
									待付款
								</view>
							</navigator>

							<navigator url="/pages/order/order?type=3">
								<u-icon name="car" size='40'></u-icon>
								<view class="order-name">
									待收货
								</view>
							</navigator>

							<navigator>
								<u-icon name="clock" size='40'></u-icon>
								<view class="order-name">
									退货/退款
								</view>
							</navigator>
						</view>
					</u-card>
				</view>
				
				<view class="address-wrap">
					<u-cell-group>
						<u-cell-item title="收货地址管理" :arrow="true"></u-cell-item>
					</u-cell-group>
				</view>
				<u-gap height="10" bg-color="#f0f0f0"></u-gap>
				<view class="app-info-wrap">
					<u-cell-group>
						<u-cell-item title="联系客服" value="18312093392"></u-cell-item>
						<u-cell-item @click='handleFeedBack' title="意见反馈" :arrow="true"></u-cell-item>
						<u-cell-item title="关于我们" :arrow="true"></u-cell-item>
					</u-cell-group>
				</view>
				<u-gap height="10" bg-color="#f0f0f0"></u-gap>
				<view class="recommend-wrap">
					<u-cell-group>
						<u-cell-item title="推荐" :arrow="true"></u-cell-item>
					</u-cell-group>
				</view>
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
				current: 3,
				userInfo: {},
				collectNum: 0
			}
		},
		computed: {
			...mapState(['vuex_tabbar', 'vuex_tabbar_active_color'])
		},
		methods: {
			handleGetUserInfo(e) {
				// console.log(e)
				const {userInfo} = e.detail
				uni.setStorageSync("userInfo", userInfo)
				this.userInfo = userInfo
			},
			
			handleFeedBack(){
				this.$u.route('/pages/feedback/feedback')
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
			this.collectNum = uni.getStorageSync('collect').length
		}
	}
</script>

<style lang="scss">
	page {
		background-color: rgb(240, 240, 240);
		padding-bottom: 100rpx;
		
		.u-cell-item-box{
			border-radius: 10rpx !important;
		}
		
	}
</style>
<style lang="scss" scoped>
	.user-info-wrap {
		height: 45vh;
		overflow: hidden;
		// background-color: $theme-color;
		// border-bottom-left-radius: 100% 100%; //设置左下角
		// border-bottom-right-radius: 100% 100%; //设置左下角
		border-radius: 0 0 25% 25%;

		.user-img-wrap {
			position: relative;
			
			.user-bg {
				width: 100%;
				height: 50vh;
				// 模糊
				filter: blur(10rpx);
			}

			.user-info {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 20%;
				text-align: center;

				.user-name {
					color: #FFFFFF;
					margin-top: 40rpx;
				}
			}

			.info-btn {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 40%;
				text-align: center;
			}
		}
	}

	.user-content {
		position: relative;
		
		.user-main {
			position: absolute;
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
			top: -50rpx;
			// background-color: #fff;
			padding-bottom: 110rpx;

			.histor-wrap {
				background-color: #fff;
				display: flex;
				padding: 20rpx;
				border-radius: 10rpx;

				navigator {
					flex: 1;
					text-align: center;
					padding: 10rpx 0;

					.his-num {
						color: $theme-color;
					}

					.his-name {}
				}
			}
		}
	}

	.order-content {
		display: flex;

		navigator {
			flex: 1;
			text-align: center;

			.order-name {
				font-size: 24rpx;
			}
		}
	}
	
</style>
