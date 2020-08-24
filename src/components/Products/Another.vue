<template>
  <div>
    <v-row cols="12">
      <v-col>
        <p class="text-center font-weight-light display-2">Разноe</p>
      </v-col>
    </v-row>
    <ProductsService products_category="Разноe"/>
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
