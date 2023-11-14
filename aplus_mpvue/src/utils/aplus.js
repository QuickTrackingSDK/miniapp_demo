
import { initQTSDK } from './qt_mini.esm'
const aplusConfig = {
  'metaInfo': {
    'appKey': '您的appKey',
	  'DEBUG': true,
	  'trackDomain': '您的收数域名',
	  '_anony_id': 'mpvue_openid',
    'aplus-auto-clk': [{
      'cssSelector':'.auto_click',
      'logkey':'auto-clk-id',
      // 注意: 目前支付宝小程序不支持该属性采集
      'props': ['data-name', 'data-pagename'],
    }],
  }
};

const aplus = initQTSDK(aplusConfig).ctx.aplus;
export default aplus;
