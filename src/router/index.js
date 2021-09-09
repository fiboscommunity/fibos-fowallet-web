import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/zh-cn',
      name: 'Home',
      component: resolve => require(['@/pages/Home'], resolve)
    },
    {
      path: '/zh-cn/fowallet',
      name: 'fowallet',
      component: resolve => require(['@/pages/fowallet'], resolve)
    },
    {
      path: '/en-us/fowallet',
      name: 'fowallet',
      component: resolve => require(['@/pages/fowallet'], resolve)
    },
    {
      path: '/redpacket',
      name: 'Redpacket',
      component: resolve => require(['@/pages/redpacket'], resolve)
    },
    {
      path: '/zh-cn',
      name: 'Home',
      component: resolve => require(['@/pages/Home'], resolve)
    },
    {
      path: '/zh-cn/documentation',
      name: 'Documentations',
      component: resolve => require(['@/pages/Documentations'], resolve)
    },
    {
      path: '/zh-cn/fos_zh-cn',
      name: 'FosZh_cn',
      component: resolve => require(['@/pages/fos_zh-cn'], resolve)
    },
    {
      path: '/zh-cn/privacy_zh-cn',
      name: 'PrivacyZh_cn',
      component: resolve => require(['@/pages/privacy_zh-cn'], resolve)
    },
    {
      path: '/en-us',
      name: 'Home',
      component: resolve => require(['@/pages/Home'], resolve)
    },
    {
      path: '/en-us/documentation',
      name: 'Documentations',
      component: resolve => require(['@/pages/Documentations'], resolve)
    },
    {
      path: '/pay*',
      name: 'Pay',
      component: resolve => require(['@/pages/pay'], resolve)
    },
    {
      path: '/keyStore*',
      name: 'keyStore',
      component: resolve => require(['@/pages/keyStore'], resolve)
    },
    {
      path: '/Dapp*',
      name: 'Dapp',
      component: resolve => require(['@/pages/Dapp'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/')
  } else {
    next()
  }
})

export default router
