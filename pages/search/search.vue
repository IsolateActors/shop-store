<template>
	<view>
		<view class="search-input">
			<u-search @clear="clearSearch" :show-action="false" @change="handleSearch" 
			shape="round" placeholder="请输入关键字" input-align="center" v-model="keyword"></u-search>
		</view>
		
		<view class="search-content">
			<u-cell-group>
					<u-cell-item @click="goDetail(item.goods_id)" v-for="item in goods" :key="item.goods_id" :title="item.goods_name" :arrow="true"></u-cell-item>
				</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				goods: []
			}
		},
		TimeId: -1,
		methods: {
			handleSearch(){
				// 防抖
				clearTimeout(this.TimeId)
				this.TimeId = setTimeout(async () => {
					
					let keyword = this.keyword.trim()
					if(!keyword){
						this.goods = []
						return
					}
					const res = await this.$u.api.getQSearch({
						query : keyword
					})
					
					this.goods = res
				}, 800)
				
			},
			
			goDetail(goodId){
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?goods_id=' + goodId
				})
			},
			
			clearSearch(){
				this.goods = []
			}
		}
	}
</script>

<style>
	page {
		background-color: rgb(240, 240, 240);
	}
</style>
<style lang="scss">
.search-input{
	padding: 20rpx;
	background-color: #fff;
	border-radius: 0 0 20rpx 20rpx;
}

.search-content{
	padding: 20rpx;
	border-radius: 20rpx;
	
	.u-cell-item-box{
		border-radius: 20rpx;
	}
	.u-cell_title{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
}

</style>
