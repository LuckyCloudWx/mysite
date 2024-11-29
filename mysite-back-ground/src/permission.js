import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { locale } from 'core-js'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // mysite的新配置

  const getUserInfo = store.getters.user;
  const curToken = localStorage.getItem('authorToken');
  // 首先验证是否需要鉴权：
  if (to.meta.auth) {
    // 当页面需要鉴权时，执行下一步
    if (getUserInfo) {
      // 如果有用户信息，直接跳转
      next()
    } else {
      // 如果无用户信息，检查token
      if (curToken) {
        // 有token，则重新获取用户信息
        store.dispatch('user/getInfo').then(() => {
          next();
        }).catch(error => {
          Message.error('登录超时，请重新登录')
          next(`/login?redirect=${to.fullPath}`);
        })
      } else {
        Message.warning('还未登录，请登录您的账号')
        next(`/login?redirect=${to.fullPath}`)
      }
    }
    NProgress.done();
  } else {
    // 页面不需要鉴权时，执行下一步
    if (to.path === '/login' && getUserInfo) {
      // 前往登录界面且有用户信息
      next({ path: '/' });
    } else {
      // 前往未鉴权界面或无信息登录
      next();
    }
    NProgress.done();
  }

  // user-admin-template的默认配置
  // determine whether the user has logged in
  // const hasToken = getToken()

  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
