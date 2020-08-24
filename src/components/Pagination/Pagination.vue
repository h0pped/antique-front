<template>
  <div class="text-center">
    <v-pagination
              v-model="page"
              class="my-4"
              :length="Math.ceil(this.totalProducts / this.productsPerPage)"
              :total-visible="7"
              @input="onPageChange"
            ></v-pagination>
  </div>
</template>
<script>
export default {
    name:"Pagination",
    data:function(){return{
        page:this.currentPage,
        paglength:0
    }
    },
    props:{
        productsPerPage:Number,
        currentPage:Number,
        totalProducts:Number,
        onPageChange:Function



    },
    mounted: function(){
        
    }
}
</script>

