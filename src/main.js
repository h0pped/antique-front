import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';

import VueAxios from 'vue-axios'
import axios from 'axios'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.requiresAuth)){
    if(!store.getters.loggedIn){
      next({
        path:"/login",
      })
    }
    else{
      next();
    }
  }if(to.matched.some(record=>record.meta.requiresVisitor)){
    if(store.getters.loggedIn){
      next({
        path:"",
      })
    }
    else{
      next();
    }
  }
  else{
    next();
  }
})

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
