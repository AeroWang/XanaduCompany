import { createStore } from 'vuex'
export type MainStates = {
  BannerHeight: number;
  headerShadowActive: boolean;
  headerShow: boolean;
  headerLogoShow: boolean;
  navDarkActive: boolean;
  articlePath: string;
}
export default createStore<MainStates>({
  state: {
    BannerHeight: 0,
    headerShadowActive: false,
    headerShow: false,
    headerLogoShow: true,
    navDarkActive: false,
    articlePath: ''
  },
  mutations: {
    setBannerHeight (state, value) {
      state.BannerHeight = value.BannerHeight
    },
    setShadowActive (state, value) {
      state.headerShadowActive = value.headerShadowActive
    },
    setHeaderShow (state, value) {
      state.headerShow = value.headerShow
    },
    setHeaderLogo (state, value) {
      state.headerLogoShow = value.headerLogoShow
    },
    setNavDarkActive (state, value) {
      state.navDarkActive = value.navDarkActive
    },
    SET_ARTICLE_PATH: (state, value) => {
      state.articlePath = value.path
    }
  },
  actions: {
    setArticlePath ({ commit }, path) {
      return new Promise(resolve => commit('SET_ARTICLE_PATH', path))
    }
  },
  modules: {
  }
})
