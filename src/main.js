import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'
import vuetify from "@/plugins/vuetify";
import router from "./router";
import axios from 'axios';

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = 'https://api.suupamaketo.xyz/api';
// Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {
//     authenticated: false
//   },
//   mutations: {
//     setAuthentication(state, status) {
//       state.authenticated = status;
//     }
//   }
// })

new Vue({
  vuetify,
  router,
  // store: store,
  render: h => h(App),
}).$mount('#app')
