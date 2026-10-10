import { getStorageSync } from 'remax/wechat';
import './app.css';

let trackerInfo = {};
try {
  trackerInfo = getStorageSync("__trackerInfo");
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
    "appInfoId": trackerInfo.appInfoId,
    "trackDomain": trackerInfo.aplusRhostV, //日志发送去向，填域名，必填
    "_anony_id": "testOpenId" + random,
    '_user_id': 'testUserId_' + random,
    // "appId": "您的appid", //和project.config.json里的appid保持一致 ，必填
    // 'aplus-waiting':'MAN', //关闭自动PV,
    "DEBUG": true, // 埋点调试使用
    // 全局属性
    'globalproperty': {
      from: 'taro'
    },
    //自动曝光
    "aplus-auto-exp": [
      {
        cssSelector: "banner-item", //sdk会自动处理为： .banner-item
        logkey: "test_auto_exp_banner",
        props: ['data-index'], //Taro不支持传值到小程序的dataset，可使用下述方法
      },
      {
        cssSelector: "ListItem", //sdk会自动处理为： .ListItem
        logkey: "ShowListItem",
        props: ["data-keyword"], //Taro不支持传值到小程序的dataset，可使用下述方法
      },
      {
        cssSelector: "LongListItem", //sdk会自动处理为： .ListItem
        logkey: "test_auto_exp_grid",
        props: ['data-index', 'data-name'],
      },
    ],
    // 自动曝光回调
    // "aplus-auto-exp-userfn": function (element, selector) {
    //   // Taro不支持传值到小程序的dataset 详见https://docs.taro.zone/docs/react-overall#dataset
    //   // 通过回调的方式，获取当前触发曝光的元素element & selector, 然后使用document的方法获取到dataset
    //   const eles = document.getElementsByClassName(selector);
    //   let kWord = {};
    //   for (let i = 0; i < eles.length; i++) {
    //     const ele = eles[i];
    //     const { index, name } = ele.dataset;
    //     if (element.id === ele.uid) {
    //       kWord = {
    //         name, index
    //       };
    //       break;
    //     }
    //   }
    //   return { keyword: kWord };
    // },

    // 自动点击
    "aplus-auto-clk": [
      {
        cssSelector: ".auto-click",
        logkey: "test_auto_clk",
        props: ['data-product', 'data-productColor', 'data-productId'],
      },
    ],
    // 自动点击回调
    // "aplus-auto-clk-userfn": function (element, selector) {
    //   // 同自动曝光回调
    //   const eles = document.getElementsByClassName(selector);
    //   let kWord = {};
    //   for (let i = 0; i < eles.length; i++) {
    //     const ele = eles[i];
    //     const { product, productColor, productId } = ele.dataset;
    //     if (element.id === ele.uid) {
    //       kWord = {
    //         product,
    //         productColor,
    //         productId
    //       };
    //       break;
    //     }
    //   }
    //   console.log("===> kWord", kWord);
    //   return kWord;
    // },

    // 设置每个页面的page_name
    pageConfig: {
      'pages/index/index': {
        'pageName': 'home_page'
      },
      'pages/vt/vtdemo1': {
        'pageName': 'vtdemo1'
      },
      'pages/click/click': {
        'pageName': 'clickevent_page'
      },
      'pages/pv/pv': {
        'pageName': 'manpv_page'
      },
      'pages/setting/index': {
        'pageName': 'setting_page'
      },
      'pages/exposure/swiper': {
        'pageName': 'exp_page'
      },
      'pages/exposure/virtualList': {
        'pageName': 'exp_virtual_list_page'
      },
      'pages/exposure/longList': {
        'pageName': 'exp_long_list_page'
      },
      'pages/custom/custom': {
        'pageName': 'customevent_page'
      },
      'pages/integrate/integrate': {
        'pageName': 'integrate_page'
      },
      // 'pages/car/shop': {
      //   'pageName': 'carshop_page'
      // }
    },
  },
};

const { initQTSDK } = require('./utils/qt_mini.umd.js')
// initQTSDK 内部已将 qt / qt_queue 挂载到平台全局对象上，封装层直接使用 wx.qt / wx.qt_queue
initQTSDK(aplusConfig)


const App = props => props.children;

export default App;
