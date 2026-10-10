/**
 * umeng H5/小程序/iOS/Android 四端sdk适配层
 */
// #ifdef MP
// 触发 QT SDK 初始化（内部已将 qt / qt_queue 挂载到平台全局对象上）
import './aplus.js';
// #endif


export default {
	sendPV: function (params) {
		// #ifdef APP
		// 如果是APP环境，页面浏览事件区分为onPageStart 和 onPageEnd，具体埋点请参照 pages/page1/page1.vue内代码
		// #endif 

		// #ifdef MP
		wx.qt_queue.push({
			action: 'qt.sendPV',
			arguments: [
				{ is_auto: false },
				{ ...params }
			]
		})
		// #endif

		// #ifdef H5
		const { qt_queue } = window;
		qt_queue.push({
			action: 'qt.sendPV',
			arguments: [
				{ is_auto: false },
				{ ...params }
			]
		})
		// #endif
	},

	sendEvent: function (eventId, params, eventType = 'CLK', method = 'POST') {
		// #ifdef MP
		console.log('yz-----qt_queue', eventId, params, eventType);
		wx.qt_queue.push({
			'action': 'qt.record',
			'arguments': [eventId, eventType, { ...params }, method]
		})
		// #endif

		// #ifdef H5
		const { qt_queue } = window;
		qt_queue.push({
			action: 'qt.record',
			arguments: [eventId, eventType, { ...params }, method]
		})
		// #endif

		// #ifdef APP
		const UmengAnalytics = uni.requireNativePlugin('UmengAnalytics')
		/**
		 * @description UmengAnalytics.onEventObject(String eventId, String params)
		 * @eventId 自定义事件名(字符串类型)
		 * @params 一级平铺自定义参数属性键值对，不支持嵌套，并且iOS端不支持值为 null 和 "" 类型的键 
		 */
		console.log('yz---------ekvid', eventId);
		console.log('yz------params', params);
		UmengAnalytics.onEventObject(eventId, JSON.stringify(params));
		// #endif
	},

	registerGlobalProperties: function (params) {
		// #ifdef APP
		const UmengAnalytics = uni.requireNativePlugin('UmengAnalytics')
		/**
		 * @description UmengAnalytics.registerGlobalProperties(String params)
		 * @params 一级平铺全局参数属性键值对，不支持嵌套，并且iOS端不支持值为 null 和 "" 类型的键
		 */
		const value = JSON.stringify(params);
		UmengAnalytics.registerGlobalProperties(value);
		// #endif

		// #ifdef H5
		const { qt_queue } = window;
		/**
		 * @example:
		 * @params 一级平铺自定义全局属性键值对，不支持嵌套
		 */
		qt_queue.push({
			action: 'qt.setMetaInfo',
			arguments: ['globalproperty', { ...params }]
		});
		// #endif

		// #ifdef MP
		/**
		 * @example:
		 *  qt_queue.push({action: 'qt.setMetaInfo', arguments: ['globalproperty', { a: 1, b: '2', c: null, d: undefined, e: '' }]});
		 * @params 一级平铺自定义全局属性键值对，不支持嵌套
		 */
		wx.qt_queue.push({
			action: 'qt.setMetaInfo',
			arguments: ['globalproperty', { ...params }]
		});
		// #endif
	},

	// #ifdef MP | H5
	appendGlobalProperties: function (params) {
		// #ifdef H5
		const { qt_queue } = window;
		qt_queue.push({
			action: 'qt.appendMetaInfo',
			arguments: ['globalproperty', { ...params }]
		})
		// #endif

		// #ifdef MP
		wx.qt_queue.push({
			action: 'qt.appendMetaInfo',
			arguments: ['globalproperty', { ...params }]
		})
		// #endif
	},
	// #endif
	getGlobalProperties: function () {
		// #ifdef APP
		const UmengAnalytics = uni.requireNativePlugin('UmengAnalytics')
		return UmengAnalytics.getGlobalProperties();
		// #endif

		// #ifdef H5
		const { qt } = window;
		return qt.getMetaInfo('globalproperty');
		// #endif

		// #ifdef MP
		return wx.qt.getMetaInfo('globalproperty');
		// #endif
	},

	clearGlobalProperties: function () {
		// #ifdef APP
		const UmengAnalytics = uni.requireNativePlugin('UmengAnalytics')
		UmengAnalytics.clearGlobalProperties();
		// #endif

		// #ifdef H5
		const { qt_queue } = window;
		qt_queue.push({
			action: 'qt.setMetaInfo',
			arguments: ['globalproperty', {}]
		})
		// #endif

		// #ifdef MP
		wx.qt_queue.push({
			action: 'qt.setMetaInfo',
			arguments: ['globalproperty', {}]
		})
		// #endif
	},

	// #ifdef APP
	unregisterGlobalProperty: function (key) {
		const UmengAnalytics = uni.requireNativePlugin('UmengAnalytics')
		/**
		 * @@description 删除某个全局属性接口
		 * @param {key} 全局属性名 字符串类型   
		 */
		UmengAnalytics.unregisterGlobalProperty(key);
	},
	// #endif 
	setUserId: function (puid, organization = 'testOrganization') {
		// #ifdef APP
		console.log('yz---------', puid, organization)
		const UmengAnalytics = uni.requireNativePlugin('UmengAnalytics')
		UmengAnalytics.onProfileSignIn(puid, organization)
		// #endif

		// #ifdef H5
		const { qt_queue } = window;
		qt_queue.push({
			action: 'qt.setMetaInfo',
			arguments: ['_user_id', puid]
		})
		// #endif

		// #ifdef MP
		wx.qt_queue.push({
			action: 'qt.setMetaInfo',
			arguments: ['_user_id', puid]
		})
		// #endif
	}

}