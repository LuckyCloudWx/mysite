// 必要模块
// import './mock'
import Vue from 'vue'
import App from './App.vue'
import '@/styles/global.less'
import router from './router'
import showMessage from './utils/showMessage'
import './api/banner'
import eventBus from "./eventBus";
import store from "./store";
store.dispatch('setting/fetchSetting');

// 工具函数
Vue.prototype.$showMessage = showMessage;
window.eventBus = eventBus;

// 自定义指令
import vLoading from './directives/loading/index.js';
import vLazy from './directives/lazy/index.js';
Vue.directive('loading', vLoading);
Vue.directive('lazy', vLazy);

// 挂载
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')