import App from './App'



// #ifndef VUE3
import Vue from 'vue'

// #ifdef MP
// 触发 QT SDK 初始化（内部已将 qt / qt_queue 挂载到平台全局对象上）
import './utils/aplus.js'
// #endif

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  
  // #ifdef MP
  import './utils/aplus.js'
  // #endif
  
  return {
    app
  }
}
// #endif

