import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null
  },
  getters:{
    loggedIn(state){
      return state.token!=null;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
   destroyToken(state){
     state.token = null;
   }

  },
  actions: {
    retreiveToken(context, credentials) {
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      return new Promise((resolve,reject)=>{

      axios.post('https://localhost:44351/api/users/authenticate', formData)
        .then(response => {
          const token = response.data.token
          localStorage.setItem('access_token', token);
          context.commit('retrieveToken', token);

          resolve(response);

          console.log(token);
        })
        .catch(error => {
          reject(error);
          console.log(error)
        })
      })
    },
    destroyToken(context){
      if(context.getters.loggedIn){
      return new Promise((resolve)=>{

        localStorage.removeItem('access_token');
        context.commit("destroyToken");
        resolve(true);
      })


      }
    }
  },
  modules: {
  }
})
