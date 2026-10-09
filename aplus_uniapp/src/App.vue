<script>
	// #ifdef H5
	// vconsole 仅 Web/H5 端启用：小程序运行环境无 navigator/window，
	// vconsole 模块初始化会 patch navigator.sendBeacon 导致 app.js 启动报错白屏
	import VConsole from 'vconsole';

	const vConsole = new VConsole({
		theme: 'dark'
	});
	// #endif
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
