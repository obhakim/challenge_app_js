import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import FBSignInButton from 'vue-facebook-signin-button'
import lightbox from 'vlightbox';
import App from './App.vue'
import router from './router'
import store from './store'

// Use modules =======================================
Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueSession)
Vue.use(FBSignInButton)
Vue.use(lightbox)

// new Vue(Vue.util.extend({ router }, App)).$mount('#app');
// const router = new VueRouter({
//     routes: routes
//   });

 new Vue(Vue.util.extend({router, store}, App)).$mount('#app');
