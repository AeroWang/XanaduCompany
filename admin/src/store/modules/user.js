import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    id: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ID: (state, id) => {
    state.id = id
  },
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        // const { data: res } = response
        // console.log(response.data)
        commit('SET_TOKEN', response.data.data.token)
        setToken(response.data.data.token)
        resolve()
      }).catch(error => {
        reject(error)
        // console.log(error)
      })
    })
  },

  // get user info
  getInfo ({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response.data
        // console.log(data)
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {
          roles,
          name,
          avatar,
          id
        } = data.userInfo
        // console.log(roles)
        // roles 必须是非空数组
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ID', id)
        resolve(data.userInfo)
        // resolve(roles)
      }).catch(error => {
        // console.log(error)
        reject(error)
      })
    })
  },

  // user logout
  logout ({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 必须先删除token
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

