import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"; // toast css
import Buefy from 'buefy'
import 'buefy/dist/buefy.css' // buefy css

import storeObject from './plugins/store';
import routes from './plugins/routes';

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Toast);
Vue.use(Buefy);

const store = new Vuex.Store(storeObject);

const router = new VueRouter({
  routes
});

document.title = 'VDM';

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
