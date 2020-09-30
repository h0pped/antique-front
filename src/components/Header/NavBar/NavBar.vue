<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="nav">
          <ul>
            <li class="mr-10">
              <router-link to="/adminPanel">
                 <i class="fas fa-user-tie"></i>
              </router-link>
            </li> 
            <li>
              <router-link to="/commodes">
                Комоды
              </router-link>
            </li>
            <li>
              <router-link to="/soft">
                Мягкая часть
              </router-link>
            </li>
            <li>
              <router-link to="/tables">
                Столы и стулья
              </router-link>
            </li>
            <li>
              <router-link to="/clocks">
                Часы
              </router-link>
            </li>
            <li>
              <router-link to="/another">
                Разное
              </router-link>
            </li> 
            <li>
              <router-link to="/invoice">
                Статус заказа
              </router-link>
            </li> 
            <li v-if="!loggedIn">
              <router-link to="/login">
                Авторизация
              </router-link>
            </li>
            <li v-if="loggedIn">
              <router-link to="/logout">
                Выйти
              </router-link>
            </li>

            <li class="ml-10">
              <router-link to="/cart">
                 {{cart.length?cart.length:""}}

                 <i class="fas fa-shopping-cart"></i>
              </router-link>
            </li> 
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "NavBar",
  data: () => ({
    
  }),
  computed:{
    ...mapGetters(["cart"]),
    loggedIn(){
      return this.$store.getters.loggedIn
    }
  }
};
</script>

<style scoped>
@import "./NavBar.css";
</style>