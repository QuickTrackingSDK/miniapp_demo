/* eslint-disable */
// MPA 模式下该文件无效
import { runApp } from 'rax-app';
// 触发 QT SDK 初始化（内部已将 qt / qt_queue 挂载到平台全局对象上）
import './utils/aplus';


const appConfig = {
  router: {
    type: 'browser', //前端路由 改为 BrowserHistory 模式
  },
};
runApp(appConfig);
