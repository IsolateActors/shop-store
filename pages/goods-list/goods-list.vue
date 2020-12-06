<template>
	<view>
		<!-- 搜索框 -->
		<u-sticky>
			<search-input></search-input>
		</u-sticky>
		

		<!-- 导航tabs -->
		<u-sticky offset-top="90">
		<view class="tabs-title">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#eb4450"></u-tabs>
		</view>
		</u-sticky>
		
		<!-- 商品列表 -->
		<view class="tabs-content">
			<block v-if="current == 0">
				<view class="first-tab">
					<view class="goods-item" v-for="item in goodslist" :key="item.goods_id" @click="goDetail(item.goods_id)">
						<view class="goods-img-wrap">
							<u-image  width="175rpx" height="175rpx" :src="item.goods_small_logo">
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
					
					<u-divider v-if="showHasMore" bg-color="rgb(240, 240, 240)" height="40" margin-top="5" margin-bottom='10'>没有更多数据了</u-divider>
				</view>
			</block>
			<block v-else-if="current == 1">
				<view class="first-tab">
					<view class="goods-item" v-for="item in goodslist" :key="item.goods_id" @click="goDetail(item.goods_id)">
						<view class="goods-img-wrap">
							<u-image  width="175rpx" height="175rpx" :src="item.goods_small_logo">
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
					
					<u-divider v-if="showHasMore" bg-color="rgb(240, 240, 240)" height="40" margin-top="5" margin-bottom='10'>没有更多数据了</u-divider>
				</view>
			</block>
			<block v-else="current == 2">
				<view class="first-tab">
					<view class="goods-item" v-for="item in goodslist" :key="item.goods_id" @click="goDetail(item.goods_id)">
						<view class="goods-img-wrap">
							<u-image  width="175rpx" height="175rpx" :src="item.goods_small_logo">
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
					
					<u-divider v-if="showHasMore" bg-color="rgb(240, 240, 240)" height="40" margin-top="5" margin-bottom='10'>没有更多数据了</u-divider>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '综合'
				}, {
					name: '销量'
				}, {
					name: '价格',
				}],
				current: 0,
				
				// 请求参数
				queryInfo: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				
				goodslist: [],
				total: 0,
				totalPages: 0,
				showHasMore: false
			};
		},
		methods: {
			change(index) {
				this.current = index;
			},
			
			async getGoodsList(){
				const res = await this.$u.api.getGoodsSearch(this.queryInfo)
				
				console.log(res)
				this.goodslist = [...this.goodslist, ...res.goods]
				this.total = res.total
				this.totalPages = Math.ceil(res.total / this.queryInfo.pagesize)
			},
			
			goDetail(id){
				this.$u.route({
					url: 'pages/goods-detail/goods-detail',
					params: {
						goods_id: id
					}
				})
			}
		},
		onLoad(options) {
			console.log(options)
			this.queryInfo.cid = options.cid
			
			this.getGoodsList()
		},
		// 上拉加载
		onReachBottom(){
			console.log("到底了")
			if(this.queryInfo.pagenum >= this.totalPages){
				// 无下一页
				this.showHasMore = true
			}else{
				// 有下一页
				this.queryInfo.pagenum += 1
				// 防抖
				this.$u.throttle(this.getGoodsList(), 500)
			}
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.queryInfo.pagenum = 1
			this.goodslist = []
			this.showHasMore = false
			this.getGoodsList()
			uni.stopPullDownRefresh()
		}
	}
</script>

<style>
	page{
		background-color: rgb(240, 240, 240);
	}
	.u-tabs{
		border-radius: 8rpx;
	}
</style>

<style lang="scss">
	.tabs-title{
		border-radius: 8rpx;
	}
.goods-item{
	border-radius: 8rpx;
	margin: 10rpx 0;
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
