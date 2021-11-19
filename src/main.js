/* eslint-disable no-unused-vars */


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./style/theme/index.css"
import  echarts  from 'echarts'
import serial from 'serialport'
// const serial = require("serialport")
Vue.$SP = serial
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
