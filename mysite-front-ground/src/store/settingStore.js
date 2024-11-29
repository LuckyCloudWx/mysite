import getSetting from '@/api/setting';
import myIcon from "@/assets/favicon3.webp";
import { titleControl } from '@/utils';
import { SERVER_URL } from '@/serverUrl'

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    }
  },
  actions: {
    async fetchSetting(ctx) {
      ctx.commit('setLoading', true);
      const resp = await getSetting();
      ctx.commit('setData', resp);
      ctx.commit('setLoading', false);
      if (resp.favicon) {
        if (document.querySelector("link[rel=icon]")) {
          return;
        }
        const head = document.querySelector("head");
        const icon = document.createElement("link");
        icon.rel = "icon";
        icon.href = SERVER_URL + resp.favicon;
        head.appendChild(icon);
      }
      if (resp.siteTitle) {
        titleControl.setSiteTitle(resp.siteTitle);
        titleControl.setTitle();
      }
    }
  }
}