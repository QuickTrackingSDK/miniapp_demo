// import { isWeb } from '@uni/env';
const aplusMini = require('../utils/aplus');
console.log(window, 'window')

// 小程序端 QT SDK 将 qt / qt_queue 挂载在平台全局对象上，探测顺序与 SDK getPlatformContext 一致
const getMpGlobal = () => {
  if (typeof my !== 'undefined') return my;
  if (typeof tt !== 'undefined') return tt;
  if (typeof swan !== 'undefined') return swan;
  if (typeof wx !== 'undefined') return wx;
  if (typeof jd !== 'undefined') return jd;
  return {};
};

const sendPV = (params) => {
  if (window.qt_queue) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.sendPV',
      arguments: [{ is_auto: false }, { ...params }]
    })
  } else {
    const qt_queue = getMpGlobal().qt_queue;
    qt_queue.push({
      action: 'qt.sendPV',
      arguments: [{ is_auto: false }, { ...params }]
    })
  }
};

const sendEvent = (eventid, params, eventtype = 'CLK') => {
  if (window.qt_queue) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.record',
      arguments: [eventid, eventtype, { ...params }]
    })
  } else {
    const qt_queue = getMpGlobal().qt_queue;
    qt_queue.push({
      action: 'qt.record',
      arguments: [eventid, eventtype, { ...params }]
    })
  }
};

const sendUserInfo = (params) => {
  sendEvent('$$_user_profile', params, 'OTHER');
};

const setUserId = (userid) => {
  if (window.qt_queue) {
    console.log('yz-----userid', userid);

    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['_user_id', userid]
    })
  } else {
    const qt_queue = getMpGlobal().qt_queue;
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['_user_id', userid]
    })
  }
};

const registerGlobalProperties = (params) => {
  if (window.qt_queue) {
    const { qt_queue } = window;
    /**
     * @example:
     * @params 一级平铺自定义全局属性键值对，不支持嵌套
     */
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['globalproperty', { ...params }]
    });
  } else {
    const qt_queue = getMpGlobal().qt_queue;
    /**
     * @example:
     *  qt_queue.push({action: 'qt.setMetaInfo', arguments: ['globalproperty', { a: 1, b: '2', c: null, d: undefined, e: '' }]});
     * @params 一级平铺自定义全局属性键值对，不支持嵌套
     */
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['globalproperty', { ...params }]
    });
  }
};

const appendGlobalProperties = (params) => {
  if (window.qt_queue) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.appendMetaInfo',
      arguments: ['globalproperty', { ...params }]
    })
  } else {
    const qt_queue = getMpGlobal().qt_queue;
    qt_queue.push({
      action: 'qt.appendMetaInfo',
      arguments: ['globalproperty', { ...params }]
    })
  }
};

const getGlobalProperties = () => {
  if (window.qt_queue) {
    const { qt } = window;
    return qt.getMetaInfo('globalproperty');
  } else {
    const qt = getMpGlobal().qt;
    return qt.getMetaInfo('globalproperty');
  }
};

const clearGlobalProperties = () => {
  if (window.qt_queue) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['globalproperty', {}]
    })
  } else {
    const qt_queue = getMpGlobal().qt_queue;
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['globalproperty', {}]
    })
  }
};

const onAplusClk = (e) => {
  const qt_queue = getMpGlobal().qt_queue;
  const cp = getCurrentPages();
  const cpl = cp.length;
  qt_queue.push({
    action: 'qt.qt_pubsub.publish',
    arguments: ['onAplusClk', {
      status: 'ready',
      event: e,
      context: cp[cpl - 1]
    }]
  })
};

export default {
  sendPV,
  sendEvent,
  sendUserInfo,
  setUserId,
  registerGlobalProperties,
  appendGlobalProperties,
  getGlobalProperties,
  clearGlobalProperties,
  onAplusClk
};
