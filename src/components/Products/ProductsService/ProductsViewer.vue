<template
  ><v-container>
    <v-row>
      <v-col v-for="product in propsproducts" :key="product.id">
       <Product :product="product" :url="url" @addToCart="addToCart"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from './Product'

import {mapActions, mapGetters} from 'vuex'

export default {
  name: "ProductsViewer",
  components:{
    Product
  },
  props: {
    propsproducts: Array,
    url: String,
  },
  computed: {
      ...mapGetters([
        'cart',
      ])
  },
  methods:{
     ...mapActions([
        'ADD_TO_CART'
      ]),
    addToCart(data){
      this.ADD_TO_CART(data);
    }
  }
}
</script>
