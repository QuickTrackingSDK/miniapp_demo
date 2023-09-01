<template>
  <div class="event-pv">
    <div class="pv-btn">
      <button type="primary" @tap="sendPv">发送pv</button>
    </div>
    <div class="pv-btn">
      <button type="primary" @tap="navigateToH3">进入H3</button>
    </div>
  </div>
</template>

<script>
import UmengSDK from '../../../utils/umengAdaptor.js'
export default {
  methods: {
    sendPv: function () {
      console.log('yz-----sendPV')
      UmengSDK.sendPV({ a: 1, b: 2, c: 3, page_name: 'page_h2' })
    },
    navigateToH3() {
      uni.navigateTo({
        url: '/pages/transp/h3'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.event-pv {
  padding: 30px 3%;
}

.pv-btn {
  button {
    width: 216px;
    line-height: 35px;
    margin: 45px 0 15px;
  }

  view {
    font-size: 16px;
    line-height: 22px;
  }
}
</style>
