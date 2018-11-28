// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'styles/iconfont.css'
import 'styles/reset.css'
import 'styles/border.css'

Vue.config.productionTip = false

// 跳过eslint的校验，no-new 是名字
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
