<template>
  <div>
    <v-notification :messages="messages" :timeout="3000"></v-notification>
    <div class="v-cart">
      <p class="text-center font-weight-light display-2">Корзина</p>
      <div v-if="cart.length">
        <v-container class="grey lighten-1">
          <v-row no-gutters>
            <v-col>
              <v-simple-table>
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
                  <tr v-for="(item, index) in cart" :key="index">
                    <td>{{ item.id }}</td>
                    <td>
                      <img
                        :src="url + '/images/photos/300_' + item.photos[0].path"
                      />
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }} грн.</td>
                    <td>
                      <v-btn icon color="black" @click="deleteFromCart(index)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col class="text-center">
              <router-link to="/order" tag="li">
                <v-btn color="success">
                  Оформить заказ
                  <i class="fas fa-shopping-cart"></i>
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else-if="!cart.length">
        <p class="text-center font-weight-light display-6">
          К сожалению, ваша корзина пуста
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import vNotification from "../Notifications/v-notification";
export default {
  name: "Cart",
  components: {
    vNotification,
  },
  computed: {
    ...mapGetters(["cart"]),
  },
  data() {
    return {
      url: "https://localhost:44351",
      messages: [],
    };
  },
  methods: {
    ...mapActions(["DELETE_FROM_CART"]),
    deleteFromCart: function (index) {
      this.DELETE_FROM_CART(index).then((response) => {
          let timeStamp = Date.now().toLocaleString();
        if(response==true){
          this.messages.unshift({
            name: "Товар был успешно удален из корзины",
            id: timeStamp,
            type: "success",
          });
        }else{
          this.messages.unshift({
            name: "Ошибка при удалении товара из корзины",
            id: timeStamp,
            type: "danger",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
li {
  list-style-type: none;
}
</style>
