import { Store, install } from 'vuex'
import Vue from 'vue'
import banner from './bannerStore'
import setting from './settingStore'
import about from './aboutStore'
import project from './projectStore'

if (!window.Vuex) {
  install(Vue);
}

const store = new Store({
  modules: {
    about,
    banner,
    setting,
    project
  },
});

window.store = store;

export default store;