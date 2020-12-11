<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#47d3ce" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view class="fb-main">
								<view class="fb-title">
									<text>问题的种类</text>
								</view>
								<view class="fb-tips">
									<text>功能建议</text>
									<text>购买遇到的问题</text>
									<text>性能问题</text>
									<text>其他</text>
								</view>
								<view class="fb-content">
									<textarea v-model="textVal" placeholder="请描述问题" />
									<view class="fb-tool">
										<button @click="handleUpImg">+</button>
										<view class="up-img-item" v-for="(item, index) in chooseImgs" :key="index">
											<up-img :index='index' @removeImg="handleRemoveImg" :src="item"></up-img>
										</view>
									</view>
								</view>
								<view class="form-btn-wrap">
									<view class="btn">
										<u-button @click="handleFormSubmit" type="error" plain size="mini" shape="square">提交</u-button>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								2
							</view>
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
				list: [
					{
						name: '体验问题'
					},
					{
						name: '商品、商家投诉'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				
				chooseImgs: [],
				textVal: '',
				
				// 外网图片路径数组
				upLoadImgs: []
			}

		},

		methods: {
			handleUpImg(){
				let that = this
				uni.chooseImage({
					success(res){
						that.chooseImgs = [...that.chooseImgs, ...res.tempFilePaths]
						// console.log(that.chooseImgs)
					}
				})
			},
			
			handleRemoveImg(index){
				this.chooseImgs.splice(index, 1)
			},
			
			handleFormSubmit(){
				let textVal = this.textVal.trim()
				if(!textVal){
					this.$u.toast("输入不合法...")
					return
				}
				
				uni.showLoading({
				    title: '正在提交中...',
					mask: true
				});
				if(this.chooseImgs.length !== 0){
					// 上传图片,无法多上传
					this.chooseImgs.forEach((v, i) => {
						// console.log(v)
						uni.uploadFile({
						            url: 'https://img.coolcr.cn/api/upload', //仅为示例，非真实的接口地址
						            filePath: v,
						            name: 'image',
						            formData: {},
						            success: (uploadFileRes) => {
						                console.log(uploadFileRes);
										let data = JSON.parse(uploadFileRes.data).data
										console.log(data)
										this.upLoadImgs.push(data.url)
										
										// 上传完毕触发
										if(i === this.chooseImgs.length - 1){
											
											uni.hideLoading();
											
											console.log("把图片地址数组和文本内容提交到后台")
											
											// 重置页面
											this.textVal = ''
											this.chooseImgs = []
											this.upLoadImgs = []
											
											// 返回上一页面
											this.$u.route({
												type: "navigateBack",
												delta: 1
											})
										}
						            },
									fail: (error) => {
										uni.hideLoading();
										// console.log(error)
										this.$u.toast("上传失败")
									}
						        });
					})
					
				}else{
					
					console.log("只提交文本到后台")
					
					uni.hideLoading()
					// 重置页面
					this.textVal = ''
					
					// 返回上一页面
					this.$u.route({
						type: "navigateBack",
						delta: 1
					})
				}
				
			},

			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
			},
			transition({detail: {dx}}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({detail: {current}}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
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

	.page-box{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}
	.fb-main{
		background-color: #eee;
		border-radius: 20rpx;
		color: #666;
		.fb-title{
			font-size: 24rpx;
			padding: 10rpx 20rpx;
		}
		.fb-tips{
			display: flex;
			flex-wrap: wrap;
			margin: 10rpx;
			text{
				width: 30%;
				background-color: #fff;
				padding: 10rpx;
				margin: 10rpx;
				border-radius: 10rpx;
				font-size: 24rpx;
				
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.fb-content{
			background-color: #fff;
			padding: 20rpx;
			margin: 20rpx;
			border-radius: 20rpx;
			
			.fb-tool{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				button{
					width: 90rpx;
					height: 90rpx;
					font-size: 60rpx;
					padding: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 10rpx 0 0 20rpx;
					color: #ccc;
				}
				
				.up-img-item{
					margin-top: 10rpx;
					margin-left: 20rpx;
				}
			}
		}
		.form-btn-wrap{
			display: flex;
			justify-content: flex-end;
			padding: 20rpx;
			padding-top: 0;
			
			.btn{
				margin-right: 20rpx;
			}
		}
	}
</style>
