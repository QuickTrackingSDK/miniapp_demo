// index.js
// const app = getApp()
Page({
  data: {
    tips: [{
      text: '注意：'
    }, {
      text: '1. appkey: 要填写您平台对应的appkey'
    }, {
      text: '2. trackDomain: 需填写您的收数域名'
    }, {
      text: '3. _anony_id: 务必填写'
    }]
  },

  sendPv() {
    console.log('yz-----sendPV');
    jd.qt_queue.push({
      action: 'qt.sendPV',
      arguments: [{
        is_auto: false
      }, {
        a: 1,
        b: 2,
        c: 3,
        page_name: 'manpv_page_custom',
        d: undefined,
        e: null,
        f: ''
      }]
    });
  }

});