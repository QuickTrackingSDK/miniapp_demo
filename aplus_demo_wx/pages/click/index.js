// index.js
// const app = getApp()
Page({
  data: {
    detail: {
      product: '水杯',
      productColor: '黄色',
      productId: '003'
    }
  },
  clickEvent() {
    wx.qt_queue.push({
      action: 'qt.record',
      arguments: ['test_man_clk', 'CLK', this.data.detail]
    });
  }
});
