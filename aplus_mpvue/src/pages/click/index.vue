<template>
  <div class="event-click" @click.stop="onAplusClk">
    <div class="click-detail">
      <img src="https://gd1.alicdn.com/imgextra/i4/2207297515629/O1CN01W5rDzt1rS89qNHD1f_!!2207297515629.jpg_400x400.jpg"
        alt="">
      <div>
        <p v-for="(item, index) in detail" :key="index">{{ item.name }}: {{ item.value }}</p>
      </div>
    </div>
    <div class="click-purchase">
      <button 
      class="auto_click" 
      type="default" 
      data-name="test_click" 
      data-pagename="test_page" 
     >点击购买(自动)</button>
      <button type="default" @tap="navigateToClick">点击购买(手动)</button>
    </div>
  </div>
</template>

<script>
import aplus from '../../utils/aplus';

export default {
  data() {
    return {
      detail: [
        { name: '商品名称', value: '床头灯' },
        { name: '颜色', value: '黄色' },
        { name: '商品ID', value: '003' }
      ]
    }
  },
  components: {
  },
  methods: {
    navigateToClick() {
      console.log('点击事件被触发了')
      aplus.record('test_clk', 'CLK', {})
    },
    onAplusClk(e) {
    if (wx) {
      wx.aplus_queue.push({
      action: 'aplus.aplus_pubsub.publish',
      arguments: ['onAplusClk', {
        status: 'ready',
        event: e,
			  context: this
      }]
     })
    } else {

      aplus.aplus_pubsub.publish('onAplusClk', {
        status: 'ready',
        event: e,
			  context: this
      })
    }
  },

  created() {

  }
}
}
</script>

<style scoped>
.event-click {
  padding: 30px 5%;
}

.click-detail {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 30px 0 50px;
}

.click-detail img {
  width: 50%;
  height: 180px;
}

.click-detail view {
  font-size: 18px;
  line-height: 30px;
}

.click-purchase {
  display: flex;
  justify-content: space-between;
}

.click-purchase button {
  width: 48%;
  margin: 0;
  font-size: 16px;
}
</style>
