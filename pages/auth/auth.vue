<template>
	<view>
		<view class="btn">
			<u-button open-type="getUserInfo" @getuserinfo="handleGetUserInfo" plain size="medium" :ripple="true" :custom-style="{color: '#47d3ce'}">获取登录授权</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			handleGetUserInfo(e){
				console.log(e)
				const {encryptedData, rawData, iv, signature} = e.detail
				let that = this
				uni.login({
					timeout: 10000,
					success(res){
						console.log(res)
						
						// const result = await that.$u.api.getToken({
						// 	encryptedData,
						// 	rawData,
						// 	iv,
						// 	signature,
						// 	code: res.code
						// })
						
						// console.log(result)
						const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
						uni.setStorageSync('token', token)
						
						uni.navigateBack({
							delta:1
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.btn{
	margin: 100rpx auto;
	text-align: center;
}
</style>
