<template>
  <div>
    <v-row cols="12">
      <v-col>
        <p class="text-center font-weight-light display-2">Новые поступления</p>
      </v-col>
    </v-row>
    <ProductsService />
  </div>
</template>
<script>
import ProductsService from "../Products/ProductsService/ProductsService.vue";
export default {
  name: "All",
  components: {
    ProductsService,
  },
};
</script>
