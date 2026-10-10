
declare const wx: any;
declare const getCurrentPages: any;

const sendPV = function (args: object) {
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

const record = function (trackEventCode: string, eventType: string, eventParams: object): void {
  const qt_queue = wx.qt_queue;
  console.log('yz-----qt_queue', trackEventCode, eventType, eventParams);

  qt_queue.push({
    action: 'qt.record',
    arguments: [trackEventCode, eventType, eventParams],
  });
}

const setMetaInfo = function(metaKey: string, metaValue: any): void {
  const qt_queue = wx.qt_queue;
  qt_queue.push({
    action: 'qt.setMetaInfo',
      arguments: [metaKey, metaValue]
    });
}

const appendMetaInfo = function(metaKey: string, metaValue: any): void {
  const qt_queue = wx.qt_queue;
  qt_queue.push({
    action: 'qt.appendMetaInfo',
      arguments: [metaKey, metaValue]
    });
}

const onAplusClk = function (e: any) {
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

const onAplusTouch = function (e: any) {
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
