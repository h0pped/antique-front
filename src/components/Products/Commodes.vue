<template>
  <div>
    <v-row cols="12">
      <v-col>
        <p class="text-center font-weight-light display-2">Комоды</p>
      </v-col>
    </v-row>
    <ProductsService products_category="Комоды"/>
  </div>
</template>
<script>
import ProductsService from "./ProductsService/ProductsService.vue";
export default {
  name: "Commodes",
  components: {
    ProductsService,
  },
};
</script>
