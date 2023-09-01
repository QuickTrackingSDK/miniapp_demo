<template>
  <div class="event-pv">
    <div class="pv-btn">
      <button type="primary" @tap="navigateToApp">唤起App</button>
    </div>
    <div class="pv-btn">
      <button type="primary" @tap="sendPv">发送pv</button>
    </div>
  </div>
</template>

<script>
import UmengSDK from '../../../utils/umengAdaptor.js'

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
export default {
  methods: {
    sendPv: function () {
      console.log('yz-----sendPV')
      UmengSDK.sendPV({ a: 1, b: 2, c: 3, page_name: 'page_h2' })
    },
    navigateToApp() {
      console.log(browser.versions)
      if (browser.versions.ios) {
        // window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=xxx"; //问后端小哥哥要这个链接
      } else if (browser.versions.android) {
        window.location.href = "umeng://test.umengdemo/page_analytics";  //跳转spm_demo AnalyticsHome页
      }
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
