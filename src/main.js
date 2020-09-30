import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';

import VueAxios from 'vue-axios'
import axios from 'axios'


import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

document.title = 'Antique';

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  const requiresVisitor = to.matched.some(route => route.meta.requiresVisitor)
  //const requiresVisitor = to.matched.some(route => route.meta.requiresVisitor)
  const isAuth = store.getters.loggedIn;
  if (requiresAuth && !isAuth) {
    next('/login')
  }else if(requiresVisitor&&isAuth){
    next('')
  } 
  else {
    next()
  }
});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
