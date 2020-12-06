<template>
	<view>
		<view class="u-page">
			<!-- 搜索框 -->
		<search-input></search-input>
		<!-- 轮播图 -->
		<u-swiper :list="swiperList" mode='rect' name="image_src" height="340"></u-swiper>
		
		<!-- 导航栏 -->
		<u-grid :col="4" :border="false">
				<u-grid-item v-for="item in catitems" :key="item.name">
					<u-image width="100rpx" height="130rpx" :src="item.image_src"></u-image>
				</u-grid-item>
			</u-grid>
		</view>
		
		<!-- 楼层 -->
		<floor-card :list="floorList"></floor-card>
		
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="vuex_tabbar" :active-color='vuex_tabbar_active_color'></u-tabbar>
	</view>
</template>

<script>
	import {mapState} from 'vuex'; 
	export default {
		data() {
			return {
				current: 0,
				swiperList: [],
				catitems: [],
				floorList: []
			}
		},
		computed: {  
				...mapState(['vuex_tabbar','vuex_tabbar_active_color'])  
			},  
		onLoad() {
			this.getSwiper()
			this.getCatitems()
			this.getFloor()
		},
		methods: {
			async getSwiper(){
				const res = await this.$u.api.getSwiperdata()
				this.swiperList = res
				console.log(this.swiperList)
			},
			async getCatitems(){
				const res = await this.$u.api.getCatitems()
				this.catitems = res
				console.log(this.catitems)
			},
			async getFloor(){
				const res = await this.$u.api.getFloordata()
				this.floorList = res
				console.log(this.floorList)
			}
		}
	}
</script>

<style lang="scss">
	.u-grid-item{
		flex: 1;
		
	}
</style>
