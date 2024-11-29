import Vue from 'vue';
import VueRouter from 'vue-router';
import Notfound from '@/views/404';
import { titleControl } from '../utils';

if (!window.VueRouter) {
  Vue.use(VueRouter); // 使用一个vue插件

}

const router = new VueRouter({
  routes: [
    {
      name: '/', path: '/', component: () => import(/**webpackChunk home */'@/views/Home'), meta: {
        title: '首页',
      }
    },
    {
      name: '/about', path: '/aboutMe', component: () => import(/**webpackChunk home */'@/views/About'), meta: {
        title: '关于我'
      }
    },
    {
      name: '/blog', path: '/article', component: () => import(/**webpackChunk home */'@/views/Blog'), meta: {
        title: '文章'
      }
    },
    {
      name: '/category', path: '/article/cate:categoryId', component: () => import(/**webpackChunk home */'@/views/Blog'), meta: {
        title: '博客分类'
      }
    },
    {
      name: '/message', path: '/message', component: () => import(/**webpackChunk home */'@/views/Message'), meta: {
        title: '留言板'
      }
    },
    {
      name: '/project', path: '/project', component: () => import(/**webpackChunk home */'@/views/Project'), meta: {
        title: '项目&成果'
      }
    },
    {
      name: '/detail', path: '/article/:id', component: () => import(/**webpackChunk home */'@/views/Blog/detail'), meta: {
        title: '博客详情'
      }
    },
    {
      name: '/404', path: '*', component: Notfound
    },
  ],
  mode: 'history'
});

router.afterEach((to) => {
  titleControl.setRouterTitle(to.meta.title);
  titleControl.setTitle();
});
export default router;