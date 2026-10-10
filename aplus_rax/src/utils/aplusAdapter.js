import { isWeb } from '@uni/env';
// 触发 QT SDK 初始化（内部已将 qt / qt_queue 挂载到平台全局对象上）
import './aplus';

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
  console.log('yz-----sendPV');
  if (isWeb) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.sendPV',
      arguments: [{ is_auto: false }, { ...params }]
    })
  } else {
    getMpGlobal().qt_queue.push({
      action: 'qt.sendPV',
      arguments: [{ is_auto: false }, { ...params }]
    })
  }
};

const sendEvent = (eventid, params, eventtype = 'CLK') => {
  console.log('yz-----sendEvent');
  if (isWeb) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.record',
      arguments: [eventid, eventtype, { ...params }]
    })
  } else {
    getMpGlobal().qt_queue.push({
      action: 'qt.record',
      arguments: [eventid, eventtype, { ...params }]
    })
  }
};

const sendUserInfo = (params) => {
  sendEvent('$$_user_profile', params, 'OTHER');
};

const setUserId = (userid) => {
  console.log('yz-----userid', userid);
  if (isWeb) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['_user_id', userid]
    })
  } else {
    getMpGlobal().qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['_user_id', userid]
    })
  }
};

const registerGlobalProperties = (params) => {
  if (isWeb) {
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
    getMpGlobal().qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['globalproperty', { ...params }]
    });
  }
};

const appendGlobalProperties = (params) => {
  if (isWeb) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.appendMetaInfo',
      arguments: ['globalproperty', { ...params }]
    })
  } else {
    getMpGlobal().qt_queue.push({
      action: 'qt.appendMetaInfo',
      arguments: ['globalproperty', { ...params }]
    })
  }
};

const getGlobalProperties = () => {
  if (isWeb) {
    const { qt } = window;
    return qt.getMetaInfo('globalproperty');
  } else {
    return getMpGlobal().qt.getMetaInfo('globalproperty');
  }
};

const clearGlobalProperties = () => {
  if (isWeb) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['globalproperty', {}]
    })
  } else {
    getMpGlobal().qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['globalproperty', {}]
    })
  }
};

const onAplusClk = (e) => {
  console.log(e, "eeee");
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
}

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