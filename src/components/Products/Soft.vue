<template>
  <div>
    <v-row cols="12">
      <v-col>
        <p class="text-center font-weight-light display-2">Мягкая часть</p>
      </v-col>
    </v-row>
    <ProductsService products_category="Мягкая%20часть"/>
  </div>
</template>
<script>
import ProductsService from "./ProductsService/ProductsService.vue";
export default {
  name: "Soft",
  components: {
    ProductsService,
  },
};
</script>
