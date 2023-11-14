<template>
    <div class="event-click">
        <div class="click-detail">
            <img src="https://gd1.alicdn.com/imgextra/i4/2207297515629/O1CN01W5rDzt1rS89qNHD1f_!!2207297515629.jpg_400x400.jpg"/>
            <view><p v-for="(item, index) in detail" :key="index">{{item.name}}: {{item.value}}</p></view>
        </div>
        <button class="click-purchase" type="primary" @tap="navigateToClick">点击购买</button>
    </div>
</template>

<script>

import aplus from '../../utils/aplus';

export default {
  data () {
    return {
        detail: [
            {name: '商品名称', value: '床头灯'},
            {name: '颜色', value: '黄色'},
            {name: '商品ID', value: '003'}
        ]
    }
  },
  components: {
  },
  methods: {

    navigateToClick() {
        
        aplus.record('test_other_ekv', 'OTHER', {
        x: '111',
        y: '222',
        z: 333,
        page_name: "demoPageName", //您当前页面的自定义页面编码（非必传）
        })
           



    }
  },

  created () {
 
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
    width: 80%;
    display: flex;
    justify-content: center;
}
</style>
