<template>
	<div class="event-pv">
		<div class="pv-btn">
			<button type="primary" @tap="sendPv">发送pv</button>
		</div>
		<div class="pv-btn">
			<button type="primary" @tap="navigateToH1">返回H1(带透传属性)</button>
		</div>
		<div class="pv-btn">
			<button type="primary" @tap="navigateToH3">进入H3</button>
		</div>
		<div class="pv-btn">
			<button type="primary" @tap="refresh">H2页面刷新</button>
		</div>
	</div>
</template>

<script>
	import UmengSDK from '../../../utils/umengAdaptor.js'
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
								aplus.updatePageProperties('h2_page',{
										cusp_h2_p: 'h2页面浏览的事件属性'
								});
								
								console.log('h2的页面属性：', aplus.getPageProperties('h2_page'));
								
								console.log("事件属性 cusp_h2_p ==", aplus.getPageProperty("h2_page", "cusp_h2_p", "cusp"));
								console.log("透传事件属性 transp_from_h1 ==", aplus.getPageProperty("h2_page", "transp_from_h1",
									"transp"));
								console.log("透传事件属性 transp_from_h3 ==", aplus.getPageProperty("h2_page", "transp_from_h3",
									"transp"));
							}
						}
					],
				});
				
				// #endif
				//允许自定义页面编码 page_name
				UmengSDK.sendPV({
					a: 1,
					b: 2,
					c: 3,
					page_name: 'h2_page'
				})
			},
			navigateToH3() {
				aplus.updateNextPageProperties({
					transp_from_h2: 'h2给h3的透传属性'
				})

				uni.navigateTo({
					url: '/pages/transp/h3'
				})
			},
			
			navigateToH1() {
				aplus.updateNextPageProperties({
					transp_from_h2: 'h2给h1的透传属性'
				})
				uni.navigateBack({
					delta: 1
				});
			},
			
			refresh() {
				// #ifdef H5
				location.reload();
				// #endif
			}
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