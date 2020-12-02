<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			console.log(this.$u.config.v);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 导入uview-ui样式，同时给style标签加入lang="scss"属性 */
		@import "uview-ui/index.scss";
	/*每个页面公共css */
	page,view,text,image,navigator{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
</style>
