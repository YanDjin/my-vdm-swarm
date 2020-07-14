import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Toast, {POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css"; // toast css
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'; // loader css

import storeObject from './plugins/store';
import routes from './plugins/routes';

import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Toast, {
  position: POSITION.BOTTOM_LEFT
});
Vue.use(Loading);

const store = new Vuex.Store(storeObject);

const router = new VueRouter({
  routes
});

document.title = 'VDM';

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
