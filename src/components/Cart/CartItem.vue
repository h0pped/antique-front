<template>
    <div class="v-cart-item">
        <v-img
              class="white--text align-end"
              :src="url + '/images/photos/600_' + product.photos[0].path"
              max-height="200px"
              max-width="200px"
              />
    <div class="v-cart-item__info">
      <p>{{product.name}}</p>
      <p>{{product.price | toFix | formattedPrice}}</p>
    </div>
    <button @click="deleteFromCart">Delete</button>
  </div>
</template>

<script>
export default {
    name:"CartItem",
    props:{
        product:{
            type:Object,
            default(){
                return {}
            }
        },
        url:String
    },
    data(){
        return {}
    },
    computed:{}
}
</script>
<style lang="scss">
  .v-cart-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    &__image {
      max-width: 50px;
    }
    .quantity__btn {
      cursor: pointer;
    }
    .quantity__tools {
      user-select: none;
    }
  }
</style>