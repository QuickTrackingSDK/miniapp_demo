import { Component } from "react";
import Taro from "@tarojs/taro";
import "./app.less";

let trackerInfo: any = {};
try {
  trackerInfo = Taro.getStorageSync("__trackerInfo");
  console.log("trackerInfo === ", trackerInfo);
} catch (e) {
  console.log("error === ", e);
}

function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};
const random = getRandom(1, 1000);

const aplusConfig = {
  metaInfo: {
    "appKey": trackerInfo.appKey,
    'trackDomain': '您的收数域名',
    "_anony_id": "testOpenId" + random,
    '_user_id': 'testUserId_' + random,
    "DEBUG": true, // 埋点调试使用
    // 全局属性
    'globalproperty': {
      from: 'taro3x_native'
    },
    // 设置每个页面的page_name
    pageConfig: {
      'pages/pv/pv': {
        'pageName': 'manpv_page'
      },
      'pages/click/click': {
        'pageName': 'clickevent_page'
      },
      'pages/setting/index': {
        'pageName': 'setting_page'
      },
      'pages/custom/custom': {
        'pageName': 'customevent_page'
      },
    },
  },
};

const { initQTSDK } = require('./utils/qt_mini.umd.js')
// initQTSDK 内部已将 qt / qt_queue 挂载到平台全局对象上，封装层直接使用 wx.qt / wx.qt_queue
initQTSDK(aplusConfig)

class App extends Component {

  // constructor() {
  //   super(props)
  //   this.state = {
  //     //
  //   }
  // }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
