<template>
    <div  class="v-cart">
        <p class="text-center font-weight-light display-2">Корзина</p>
    <div v-if="cart.length">
                
        <v-container class="grey lighten-1" >
            <v-row no-gutters >
                <v-col>
        <v-simple-table >
      <thead>
        <tr>
          <th class="text-center">Артикль</th>
          <th class="text-center">Фото</th>
          <th class="text-center">Название</th>
          <th class="text-center">Цена</th>
          <th class="text-center">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.id }}</td>
          <td><img :src="url + '/images/photos/300_' + item.photos[0].path"/></td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }} грн.</td>
          <td>Удалить</td>
        </tr>
      </tbody>
  </v-simple-table>
                </v-col>
            </v-row>
  </v-container >
    </div>
    <div v-else-if="!cart.length">
        <p class="text-center font-weight-light display-6">К сожалению, ваша корзина пуста</p>
        
    </div>

    </div>
    
</template>

<script>

import { mapGetters} from 'vuex'


export default {
    name:"Cart",
    components:{
    },
    computed: {
      ...mapGetters([
        'cart',
      ])
  },
    data(){
        return{
            url: "https://localhost:44351"
        }
    }
}
</script>

