
const sendPV = function (args: object) {
  const qt_queue = my.qt_queue;
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
  const qt_queue = my.qt_queue;
  qt_queue.push({
    action: 'qt.record',
    arguments: [trackEventCode, eventType, eventParams],
  });
}

const setMetaInfo = function(metaKey: string, metaValue: any): void {
  const qt_queue = my.qt_queue;
  qt_queue.push({
    action: 'qt.setMetaInfo',
      arguments: [metaKey, metaValue]
    });
}

const appendMetaInfo = function(metaKey: string, metaValue: any): void {
  const qt_queue = my.qt_queue;
  qt_queue.push({
    action: 'qt.appendMetaInfo',
      arguments: [metaKey, metaValue]
    });
}

export {
  sendPV,
  record,
  setMetaInfo,
  appendMetaInfo,
}
