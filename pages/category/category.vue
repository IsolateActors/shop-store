<template>
	<view>
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
			}
		},
		computed: {  
				...mapState(['vuex_tabbar','vuex_tabbar_active_color'])  
			},  
		methods: {
			
		}
	}
</script>

<style>

</style>
