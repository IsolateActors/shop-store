<template>
	<view>
		<!-- 搜索框 -->
		<search-input></search-input>
		
		<!-- 菜单 -->
		<mall-menu :tabbar="categories"></mall-menu>
		
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="vuex_tabbar" :active-color='vuex_tabbar_active_color'></u-tabbar>
	</view>
</template>

<script>
	import {mapState} from 'vuex'; 
	export default {
		data() {
			return {
				current: 1,
				// 分类
				categories: [],
			}
		},
		computed: {  
				...mapState(['vuex_tabbar','vuex_tabbar_active_color'])  
			},  
		methods: {
			async getCategories(){
				const res = await this.$u.api.getCategories()
				this.categories = res
				
				uni.setStorageSync('cates', {time:Date.now(), data: this.categories})
			},
			
			
		},
		
		onLoad(){
			const Cates = uni.getStorageSync("cates")
			if(!Cates){
				this.getCategories()
			} else{
				if(Date.now() - Cates.time > 1000*10){
					this.getCategories()
				}else{
					this.categories = Cates.data
				}
			}
		}
	}
</script>

<style>
	
</style>