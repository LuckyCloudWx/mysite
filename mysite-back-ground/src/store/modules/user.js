import { loginAPI, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import { reject, resolve } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    // token: getToken(),
    // name: '',
    // avatar: ''
    user: null,
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state, payload) => {
    state.user = payload;
    // Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  SET_USER: (state, payload) => {
    state.user = payload;
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return loginAPI(userInfo).then(resp => {
      return new Promise((resolve, reject) => {
        if (typeof resp === 'string' || !resp.data) {
          // 验证码错误或账号、密码错误：
          reject(resp);
        } else {
          // 表单信息全部正确
          const { data } = resp;
          commit('SET_USER', data);
          resolve(resp);
        }
      })
    });

    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    // 新的配置
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (typeof res === 'string') {
          reject(res)
        } else {
          commit('RESET_STATE', res.data)
          resolve(res.data)
        }
      })
    })

    // admin-config-template的配置
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response

    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }

    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
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

