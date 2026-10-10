// import { isWeb } from '@uni/env';   
const aplusMini = require('./aplus');
console.log(window, 'window')
const sendPV = (params) => {
  if (window) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.sendPV',
      arguments: [{ is_auto: false }, { ...params }]
    })
  } else {
    const qt_queue = wx.qt_queue;
    qt_queue.push({
      action: 'qt.sendPV',
      arguments: [{ is_auto: false }, { ...params }]
    })
  }
};

const sendEvent = (eventid, params, eventtype = 'CLK') => {
  if (window) {
    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.record',
      arguments: [eventid, eventtype, { ...params }]
    })
  } else {
    console.log(wx.qt, 'wx.qt')
    const qt_queue = wx.qt_queue;
    qt_queue.push({
      action: 'qt.record',
      arguments: [eventid, eventtype, { ...params }]
    })
  }
};

const onAplusClk = (e) => {
  const qt_queue = wx.qt_queue;
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

const sendUserInfo = (params) => {
  sendEvent('$$_user_profile', params, 'OTHER');
};

const setUserId = (userid) => {
  if (window) {
    console.log('yz-----userid', userid);

    const { qt_queue } = window;
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['_user_id', userid]
    })
  } else {
    const qt_queue = wx.qt_queue;
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['_user_id', userid]
    })
  }
};

const registerGlobalProperties = (params) => {
  if (window) {
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
    const qt_queue = wx.qt_queue;
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
    const qt_queue = wx.qt_queue;
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
    const qt = wx.qt;
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
    const qt_queue = wx.qt_queue;
    qt_queue.push({
      action: 'qt.setMetaInfo',
      arguments: ['globalproperty', {}]
    })
  }
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