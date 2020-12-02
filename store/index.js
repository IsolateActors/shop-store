import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 自定义tabbar数据
		vuex_tabbar: [{
				iconPath: "home",
				selectedIconPath: "home-fill",
				text: '首页',
				pagePath: '/pages/index/index',
			},
			{
				iconPath: "grid",
				selectedIconPath: "grid-fill",
				text: '分类',
				pagePath: '/pages/category/category'
			},
			{
				iconPath: "shopping-cart",
				selectedIconPath: "shopping-cart-fill",
				text: '购物车',
				pagePath: '/pages/cart/cart'
			},
			{
				iconPath: "account",
				selectedIconPath: "account-fill",
				text: '我的',
				pagePath: '/pages/user/user'
			}
		],
		vuex_tabbar_active_color: '#eb4450'
	}
	
})

export default store