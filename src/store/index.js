import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    retreiveToken(context,credentials){
      const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
      axios.post('https://localhost:44351/api/users/authenticate',formData)
      .then(response=>{
        console.log(response);
      })
      .catch(error=>{
        console.log(error)
      })
    }
  },
  modules: {
  }
})
