// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import Scrollspy from 'vue2-scrollspy/dist/index'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueI18n)

Vue.use(Scrollspy)

var array = window.location.pathname.split('/')

const i18n = new VueI18n({
  locale: array[1] ? array[1] : 'zh-cn',
  messages: {
    'zh-cn': require('@/i18n/zh-cn.js'),
    'en-us': require('@/i18n/en-us.js')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
