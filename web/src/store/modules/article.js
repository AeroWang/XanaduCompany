const state = {
  article_path: ''
}
const mutations = {
  SET_ARTICLE_PATH: (state, path) => {
    state.article_path = path
  }
}
const actions = {
  setArticlePath({ commit }, path) {
    return new Promise(resolve =>
      commit('SET_ARTICLE_PATH'), path)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
