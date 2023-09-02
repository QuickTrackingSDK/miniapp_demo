<template>
	<div class="event-pv">
		<div class="pv-btn">
			<button type="primary" @tap="navigateToApp">H3打开A3</button>
		</div>
		<div class="pv-btn">
			<button type="primary" @tap="navigateToH2">返回H2(带透传属性)</button>
		</div>
		<div class="pv-btn">
			<button type="primary" @tap="refresh">刷新H3</button>
		</div>
		<div class="pv-btn">
			<button type="primary" @tap="sendPv">发送pv</button>
		</div>
		<div class="pv-btn">
			<button type="primary" @tap="toggleVConsole">调试</button>
		</div>
	</div>
</template>

<script>
	import UmengSDK from '../../../utils/umengAdaptor.js'
	import VConsole from 'vconsole';

	const vConsole = new VConsole({
		theme: 'dark'
	});

	const browser = {
		versions: function() {
			const u = navigator.userAgent,
				app = navigator.appVersion;
			return {
				trident: u.indexOf('Trident') > -1,
				/*IE内核*/
				presto: u.indexOf('Presto') > -1,
				/*opera内核*/
				webKit: u.indexOf('AppleWebKit') > -1,
				/*苹果、谷歌内核*/
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
				/*火狐内核*/
				mobile: !!u.match(/AppleWebKit.*Mobile.*/),
				/*是否为移动终端*/
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				/*ios终端*/
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
				/*android终端或者uc浏览器*/
				iPhone: u.indexOf('iPhone') > -1,
				/*是否为iPhone或者QQHD浏览器*/
				iPad: u.indexOf('iPad') > -1,
				/*是否iPad*/
				webApp: u.indexOf('Safari') == -1,
				/*是否web应该程序，没有头部与底部*/
				souyue: u.indexOf('souyue') > -1,
				superapp: u.indexOf('superapp') > -1,
				weixin: u.toLowerCase().indexOf('micromessenger') > -1,
				Safari: u.indexOf('Safari') > -1
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	};

	export default {
		onShow() {
			this.sendPv();
		},
		
		methods: {
			sendPv: function() {
				// #ifdef H5
				aplus_queue.push({
					action: 'aplus.aplus_pubsub.subscribe',
					arguments: [
						'aplusReady',
						function(status) {
							if (status === 'complete') {
								aplus.updatePageProperties('h3_page',  { cusp_h3_p: 'h3页面浏览的事件属性'});
								
								console.log('h3的页面属性：', aplus.getPageProperties('h3_page'));
								
								console.log("事件属性 cusp_h3_p ==", aplus.getPageProperty("h3_page", "cusp_h3_p", "cusp"));
								console.log("透传事件属性 transp_from_h2 ==", aplus.getPageProperty("h3_page", "transp_from_h2",
									"transp"));
							}
						}
					],
				});
				
				
				// #endif
				UmengSDK.sendPV({
					a: 1,
					b: 2,
					c: 3,
					page_name: 'h3_page'
				})
			},
			navigateToApp() {
				console.log("JS 桥接")
				// SpmAgent.updateNextPageProperties({
				// 	"transfer_from_h3": 'value_33'
				// });
				// console.log(SpmAgent)
				// console.log(browser.versions)
				if (browser.versions.ios) {
					// window.location.href = "xxx"; //iOS链接
					// #ifdef H5
					let string = JSON.stringify({
						test : 1
					});
					 window.webkit.messageHandlers.transpBridgeDemo.postMessage(string);
					// #endif
					
					
					
				} else if (browser.versions.android) {
					window.location.href = "umeng://test.umengdemo/page_spm"; //跳转spm_demo Home页
				}
			},
			navigateToH2() {
				aplus.updateNextPageProperties({
					transp_from_h3: 'h3给h2的透传属性'
				})
				
				console.log("如果执行了页面刷新动作，那就需要执行此行为 刷新次数 + 1");
				uni.navigateBack({
					delta:1
				});
			},
			refresh() {
				// #ifdef H5
				location.reload();
				// #endif
			},
			toggleVConsole() {
				vConsole.show();
				// setTimeout(() => {
				//   vConsole.hide();
				// }, 1000);
				// showTips();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.event-pv {
		padding: 30px 3%;
	}

	.pv-btn {
		button {
			width: 216px;
			line-height: 35px;
			margin: 45px 0 15px;
		}

		view {
			font-size: 16px;
			line-height: 22px;
		}
	}
</style>