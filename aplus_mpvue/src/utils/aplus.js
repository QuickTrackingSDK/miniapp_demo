
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
    'aplus-auto-exp': [{
      'cssSelector':'.exp-txt', // 你要曝光的元素的class
      'logkey':'autgao-exp-id', // 自定义事件的id
      // 注意：
      // 1、如果CSSSelector能匹配上多个元素则一定要在页面节点上埋data-tracker,否则aplusJS无法识别元素唯一性，进而导致一个列表多个元素只能触发一次曝光；
      // 2、目前支付宝小程序不支持该属性采集
      'props': ['data-name', 'data-pagename'],
    }]
  }
};

const aplus = initQTSDK(aplusConfig).ctx.aplus;
export default aplus;
