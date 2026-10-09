
// 小程序端 QT SDK 将 qt / qt_queue 挂载在平台全局对象上，探测顺序与 SDK getPlatformContext 一致
const getMpGlobal = () => {
  if (typeof my !== 'undefined') return my;
  if (typeof tt !== 'undefined') return tt;
  if (typeof swan !== 'undefined') return swan;
  if (typeof wx !== 'undefined') return wx;
  if (typeof jd !== 'undefined') return jd;
  return {};
};

const sendPV = function (args) {
  const qt_queue = getMpGlobal().qt_queue;
  qt_queue.push({
    action: 'qt.sendPV',
    arguments: [{
      is_auto: false
    }, {
      ...args
    }],
  });
}

const record = function (trackEventCode, eventType, eventParams) {
  const qt_queue = getMpGlobal().qt_queue;
  qt_queue.push({
    action: 'qt.record',
    arguments: [trackEventCode, eventType, eventParams],
  });
}

const setMetaInfo = function (metaKey, metaValue) {
  const qt_queue = getMpGlobal().qt_queue;
  qt_queue.push({
    action: 'qt.setMetaInfo',
    arguments: [metaKey, metaValue]
  });
}

const appendMetaInfo = function (metaKey, metaValue) {
  const qt_queue = getMpGlobal().qt_queue;
  qt_queue.push({
    action: 'qt.appendMetaInfo',
    arguments: [metaKey, metaValue]
  });
}

const onAplusClk = function (e) {
  const qt_queue = getMpGlobal().qt_queue;
  const cp = getCurrentPages();
  const cpl = cp.length;
  qt_queue.push({
    action: 'qt.qt_pubsub.publish',
    arguments: ['onAplusClk', {
      status: 'ready',
      event: e,
      context: cp[cpl - 1]
    }],
  });
}

const onAplusTouch = function (e) {
  const qt_queue = getMpGlobal().qt_queue;
  const cp = getCurrentPages();
  const cpl = cp.length;
  qt_queue.push({
    action: 'qt.qt_pubsub.publish',
    arguments: ['onAplusTouch', {
      status: 'ready',
      event: e,
      context: cp[cpl - 1]
    }],
  });
}

export default {
  sendPV,
  record,
  setMetaInfo,
  appendMetaInfo,
  onAplusClk,
  onAplusTouch,
}