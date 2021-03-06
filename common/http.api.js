// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let swiperdataUrl = '/home/swiperdata';
let catitemsUrl = '/home/catitems';
let floordataUrl = '/home/floordata';
let categoriesUrl = '/categories';
let goodssearchUrl = '/goods/search';
let goodsdetailUrl = '/goods/detail';
let wxloginUrl = '/users/wxlogin';
let ordercreatelUrl = '/my/orders/create';
let orderspayUrl = '/my/orders/req_unifiedorder';
let chkOrderUrl = '/my/orders/chkOrder';
let allorderUrl = '/my/orders/all';
let qsearchUrl = '/goods/qsearch';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	let getSwiperdata = (params = {}) => vm.$u.get(swiperdataUrl);
	let getCatitems = (params = {}) => vm.$u.get(catitemsUrl);
	let getFloordata = (params = {}) => vm.$u.get(floordataUrl);
	let getCategories = (params = {}) => vm.$u.get(categoriesUrl);
	let getGoodsSearch = (params = {}) => vm.$u.get(goodssearchUrl, params);
	let getGoodsDetail = (params = {}) => vm.$u.get(goodsdetailUrl, params);
	let getAllOrder = (params = {}) => vm.$u.get(allorderUrl, params);
	let getQSearch = (params = {}) => vm.$u.get(qsearchUrl, params);
	
	// 此处使用了传入的params参数，一切自定义即可
	let getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	let getToken = (params = {}) => vm.$u.post(wxloginUrl, params);
	let getOrderCreate = (params = {}) => vm.$u.post(ordercreatelUrl, params);
	let getOrderPay = (params = {}) => vm.$u.post(orderspayUrl, params);
	let getOrderPayChecked = (params = {}) => vm.$u.post(chkOrderUrl, params);
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {getSwiperdata,getCatitems,getFloordata, getCategories,
	getGoodsSearch,getGoodsDetail, getToken, getOrderCreate, 
	getOrderPay, getOrderPayChecked, getAllOrder,getQSearch};
}

export default {
	install
}