<template>
  <div class="event-pv">
    <div class="pv-btn">
      <button type="primary" @tap="navigateToApp">唤起App</button>
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
import UmengSDK from '../../utils/umengAdaptor.js'
// #ifdef H5
// vconsole 仅 H5 端启用：小程序运行环境无 navigator/window，模块初始化会报错
import VConsole from 'vconsole';

const vConsole = new VConsole({ theme: 'dark' });
// #endif

// #ifdef H5
// 浏览器嗅探仅 H5 端可用
const browser = {
  versions: function () {
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
// #endif
// #ifndef H5
// 小程序端降级：用 uni 系统信息提供 iOS/Android 判断（消费点 browser.versions.ios/android 不变）
const browser = {
  versions: function () {
    const platform = uni.getSystemInfoSync().platform || '';
    return {
      mobile: true,
      ios: platform === 'ios',
      android: platform === 'android'
    };
  }(),
  language: 'zh-cn'
};
// #endif

export default {
  methods: {
    sendPv: function () {
      console.log('yz-----sendPV')
      UmengSDK.sendPV({ a: 1, b: 2, c: 3, page_name: 'page_h2' })
    },
    navigateToApp() {
      console.log("JS 桥接")
      SpmAgent.updateNextPageProperties({ "transfer_from_h3": 'value_33' });
      console.log(SpmAgent)
      // console.log(browser.versions)
      if (browser.versions.ios) {
        window.location.href = "xxx"; //iOS链接
      } else if (browser.versions.android) {
        window.location.href = "umeng://test.umengdemo/page_spm";  //跳转spm_demo Home页
      }
    },
    toggleVConsole() {
      // #ifdef H5
      vConsole.show();
      // #endif
      // setTimeout(() => {
      //   vConsole.hide();
      // }, 1000);
      showTips();
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
