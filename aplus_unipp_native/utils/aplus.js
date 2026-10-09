// #ifdef MP
import { initQTSDK } from './qt_mini.umd.js';
const aplusConfig = {
	metaInfo: {
		'appKey': '您的appKey',
		'trackDomain': '采集日志上报域名，必填',
		'DEBUG': true,
		'aplus-waiting': 'MAN', //关闭自动pv
		_anony_id: 'testOpenId', //必填
		'globalproperty': {
			a: undefined,
			b: null,
			c: ''
		},
		'aplus-auto-exp': [{
			'cssSelector': '.banner_item',
			'logkey': 'test_auto_exp_banner',
			'props': ['data-index'],
		}, {
			'cssSelector': '.exposure-grid-item',
			'logkey': 'test_auto_exp_grid',
			'props': ['data-index', 'data-name'],
		}],
		'aplus-auto-clk': [{
			'cssSelector': '.auto_clk',
			'logkey': 'test_auto_clk',
			'props': ['data-product', 'data-productColor', 'data-productId'],
		}],
		'_user_id': 'testUserId',
		// 设置每个页面的page_name
		'pageConfig': {
			'pages/index/index': {
				'pageName': 'home_page'
			},
			'pages/click/click': {
				'pageName': 'click_page'
			},
			'pages/page1/page1': {
				'pageName': 'page1'
			},
			'pages/setting/index': {
				'pageName': 'setting_page'
			}
		}
	}
};

// initQTSDK 内部已将 qt / qt_queue 挂载到平台全局对象上，页面直接使用 wx.qt / wx.qt_queue
initQTSDK(aplusConfig);
// #endif


