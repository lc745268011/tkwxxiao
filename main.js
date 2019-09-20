import Vue from 'vue'
import App from './App'
import store from './store' 
Vue.prototype.$store = store
uni.getStorage({
	      key: 'token',
	      success: function (res) {
	          Vue.prototype.token=res.data
	      }
	  });
Vue.config.productionTip = false


const app = new Vue({
    ...App
})
app.$mount()
