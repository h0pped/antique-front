<template
  >
  <div>
    <v-notification :messages="messages" :timeout=3000 />

    <v-container>
      <v-row>
        <v-col v-for="product in propsproducts" :key="product.id">
          <Product :product="product" :url="url" @addToCart="addToCart" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Product from "./Product";
import vNotification from "../../Notifications/v-notification";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductsViewer",
  components: {
    Product,
    vNotification,
  },
  props: {
    propsproducts: Array,
    url: String,
  },
  data() {
    return {
      messages: [],
    };
  },

  computed: {
    ...mapGetters(["cart"]),
  },
  methods: {
    ...mapActions(["ADD_TO_CART"]),
    addToCart(data) {
      this.ADD_TO_CART(data).then((response) => {
        let timeStamp = Date.now().toLocaleString();
        if (response == true) {
          this.messages.unshift({
            name: "Товар был успешно добавлен в корзину",
            id: timeStamp,
            type: "success",
          });
        }else{
          this.messages.unshift(
          {name:"Товар уже находится в корзине",id:timeStamp,type:"warning"}
        )
        }
      });
    },
  },
};
</script>
