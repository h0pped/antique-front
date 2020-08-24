<template>
  <div>
    <v-row cols="12">
      <v-col>
        <p class="text-center font-weight-light display-2">Столы и стулья</p>
      </v-col>
    </v-row>
    <ProductsService products_category="Столы и стулья"/>
  </div>
</template>
<script>
import ProductsService from "./ProductsService/ProductsService.vue";
export default {
  name: "Tables",
  components: {
    ProductsService,
  },
};
</script>
