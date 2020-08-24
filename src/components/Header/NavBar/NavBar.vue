<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="nav">
          <ul>
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
              <router-link to="/">
                Статус заказа
              </router-link>
            </li> 
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    
  }),
};
</script>

<style scoped>
@import "./NavBar.css";
</style>