<template>
    <div class="event-pv">
        <div class="pv-title">页面浏览事件（PV）</div>
        <div class="pv-tip">
            <ul>
                <li>默认为页面页面浏览事件自动采集，如需关闭自动，需配置aplus-waiting=“MAN”，手动控制发送pv</li>
                <li>自动采集的页面浏览事件中，页面编码为path路径，日志发送时间为页面消失，点击“返回”按钮可以看到上报日志。</li>
            </ul>
        </div>
        <div class="pv-btn">
            <button type="primary" @tap="senPv">手动pv事件 页面编码"yemian_1"</button>
            <view>手动采集的页面浏览事件中，页面编码为自定义值，使用page_name字段设置。</view>
        </div>
    </div>
</template>

<script>
import aplus from '../../utils/aplus';


export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    senPv() {
        console.log('手动pv事件按钮被点击了')
        aplus.sendPV(
        {is_auto: false
        },{
        page_title: "页面一", //默认为pageConfig中的值，如果这里设置了，则为这里设置的值 (非必传)
        page_name: "yourCurrentPageName", //默认为pageConfig中的值，如果这里设置了，则为这里设置的值 (非必传)
        //自定义事件属性
        x: 111,
        y: 222
        })
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.event-pv {
    padding: 30px 3%;
}
.pv-title {
    font-size: 24px;
    line-height: 48px;
}
.pv-tip {
    font-size: 16px;
    line-height: 22px;
}
.pv-tip view {
        margin: 10px 0;
    }
.pv-btn button{
    width: 216px;
    line-height: 35px;
    margin: 45px 0 15px;
}
.pv-btn view {
    font-size: 16px;
    line-height: 22px;
}
</style>
