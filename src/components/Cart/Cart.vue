<template>
    <div class="v-cart">
        <h1>Cart</h1>
        <CartItem/>
    </div>
</template>

<script>
import CartItem from "./CartItem"
export default {
    name:"Cart",
    components:{
        CartItem
    },
    props:{},
    data(){
        return{}
    },
    computed:{}
}
</script>