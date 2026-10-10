
const sendPV = function (args) {
  const qt_queue = wx.qt_queue;
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
  const qt_queue = wx.qt_queue;
  qt_queue.push({
    action: 'qt.record',
    arguments: [trackEventCode, eventType, eventParams],
  });
}

const setMetaInfo = function (metaKey, metaValue) {
  const qt_queue = wx.qt_queue;
  qt_queue.push({
    action: 'qt.setMetaInfo',
    arguments: [metaKey, metaValue]
  });
}

const appendMetaInfo = function (metaKey, metaValue) {
  const qt_queue = wx.qt_queue;
  qt_queue.push({
    action: 'qt.appendMetaInfo',
    arguments: [metaKey, metaValue]
  });
}

const onAplusClk = function (e) {
  const qt_queue = wx.qt_queue;
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
  const qt_queue = wx.qt_queue;
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

export {
  sendPV,
  record,
  setMetaInfo,
  appendMetaInfo,
  onAplusClk,
  onAplusTouch,
}