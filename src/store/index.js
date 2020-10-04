import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,

    cart: [],
    cart_total: 0
  },
  getters: {
    token(state){
      return state.token
    },
    loggedIn(state) {
      return state.token != null;
    },
    cart(state) {
      return state.cart;
    },
    total(state) {
      return state.cart_total;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null;
    },

    SET_CART: (state, product) => {
      if(state.cart.length){
        let isProductExist = false;
        state.cart.map(function(item){
          if(item.id===product.id){
            isProductExist = true;
          }
        })
        if(!isProductExist){
          state.cart.push(product);
        state.cart_total += product.price;
        }
      }else{
        state.cart.push(product);
        state.cart_total += product.price;
      }
    },
    CLEAR_CART: (state) => {
      state.cart = [];
    },
    REMOVE_FROM_CART:(state,index)=>{
      state.cart_total-=state.cart[index].price;
      state.cart.splice(index,1);
    }

  },
  actions: {
    retreiveToken(context, credentials) {
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      return new Promise((resolve, reject) => {

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
    destroyToken(context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve) => {

          localStorage.removeItem('access_token');
          context.commit("destroyToken");
          resolve(true);
        })
      }
    },
    ADD_TO_CART({ commit }, product) {
      commit('SET_CART', product);

    },
    DELETE_FROM_CART({commit},index){
      commit("REMOVE_FROM_CART",index);
    },
    FORM_ORDER({ commit, state }, credentials) {

      const order = {
        Name: credentials.name,
        Surname: credentials.surname,
        Number: credentials.number,
        City: credentials.city,
        Delivery: credentials.delivery_selected,
        Deliverynum: credentials.delivery_num,
        TotalPrice: credentials.total_price,
        Products: JSON.parse(JSON.stringify(state.cart))
      }

      return new Promise((resolve, reject) => {

        axios.post('https://localhost:44351/api/Orders/', order)
          .then(response => {
            commit("CLEAR_CART");
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error)
          })
      })
    }

  },
  modules: {
  }
})
