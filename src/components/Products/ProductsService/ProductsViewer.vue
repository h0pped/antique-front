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
export default {
  name: "ProductsViewer",
  components:{
    Product
  },
  props: {
    propsproducts: Array,
    url: String,
  },
  methods:{
    addToCart(data){
      //this.$emit('addToCart',this.product);
      console.log(data);
    }
  }
};
</script>
