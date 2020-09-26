<template>
  <v-app>

  <v-bottom-navigation
    v-model="activeMenu"
    background-color="grey lighten-1"
    color="dark"
    shift
    grow
  >
    <v-btn>
      <span>Заказы</span>
      <v-icon>mdi-clipboard-list-outline</v-icon>
    </v-btn>

    <v-btn>
      <span>Новый товар</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-btn>
      <span>Статистика</span>
      <v-icon>mdi-numeric</v-icon>
    </v-btn>

    <v-btn>
      <span>Настройки</span>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-bottom-navigation>

  <v-container fluid>
      <v-row justify="center" >
    <v-col v-if="activeMenu==0">
        <OrdersTable></OrdersTable>
    </v-col>
    <v-col v-if="activeMenu==1">
        <p class="text-center font-weight-light text-h3">Добавить новый товар</p>
    </v-col>
    <v-col v-if="activeMenu==2">
        <p class="text-center font-weight-light text-h3">Статистика</p>
    </v-col>
    <v-col v-if="activeMenu==3">
        <p class="text-center font-weight-light text-h3">Настройки</p>
    </v-col>
    </v-row>
    </v-container>
      
  </v-app>
</template>

<script>
import OrdersTable from '../Orders/OrdersService/OrdersTable'
export default {
    components: {
    OrdersTable,
  },
    data(){
        return{
            activeMenu:0
        }
    }
    
}
</script>