<template>
<div>
  <div v-if="loading">
    <v-row cols="12">
      <v-col>
        <v-text-field color="success" loading disabled></v-text-field>
      </v-col>
    </v-row>
  </div>
  <div v-else>

    <v-container>
      <v-row cols="12">
        <v-col>
          <v-text-field
            clearable
            outlined
            color="black"
            label="Поиск"
            :value="searchvalue"
            @input="onSearchChange"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <ProductsViewer
      :propsproducts="currentProducts"
      :url="url"
    ></ProductsViewer>
    <Pagination
      :productsPerPage="perPage"
      :currentPage="currentPage"
      :totalProducts="filteredproducts.length"
      :onPageChange="paginate"
    ></Pagination>
  </div>
  </div>
</template>

<script>
import Pagination from "../../Pagination/Pagination.vue";
import ProductsViewer from "../ProductsService/ProductsViewer.vue";

export default {
  name: "All",
  components: {
    Pagination,
    ProductsViewer
  },
  data: function() {
    return {
            url: "https://localhost:44351",

      category: this.products_category,
      loading: true,
      products: [],
      filteredproducts: [],
      currentProducts: [],
      totalProducts: 0,
      perPage: 12,
      currentPage: 1,

      searchvalue: "",
      messages:[
      ],
      fab: false
    };
  },
  props: {
    products_category: String,
  },
  methods: {
    fetchProducts: function() {
      if (this.category) {
        this.axios
          .get(this.url + "/api/Products/GetByCategory/" + this.category)
          .then((response) => {
            console.log(response.data);
            this.products = response.data;
            this.loading = false;
            this.updateData();
          });
      } else {
        this.axios.get(this.url + "/api/Products/").then((response) => {
          console.log(response.data);
          this.products = response.data;
          this.loading = false;
          this.updateData();
        });
      }
    },
    updateData: function() {
      this.filteredproducts = this.products.filter((product) => {
        return (
          product.name.toLowerCase().indexOf(this.searchvalue.toLowerCase()) !=
          -1
        );
      });
      (this.indexOfLastProduct = this.currentPage * this.perPage),
        (this.indexOfFirstProduct = this.indexOfLastProduct - this.perPage),
        (this.currentProducts = this.filteredproducts.slice(
          this.indexOfFirstProduct,
          this.indexOfLastProduct
        ));
    },
    paginate: function(page) {
      if (
        page < 1 ||
        page > Math.ceil(this.filteredproducts.length / this.productsPerPage)
      ) {
        return;
      } else {
        this.currentPage = page;
        this.updateData();
        this.toTop();
      }
    },
    onSearchChange: function(text) {
      this.searchvalue = text;
      this.updateData();
    },
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      if(this.currentProducts.length<6){
      this.$vuetify.goTo(200,{easing: 'easeInOutCubic',offset:200,duration:300})

      }
      if(this.currentProducts.length==12){
      this.$vuetify.goTo(200,{easing: 'easeInOutCubic',offset:200,duration:600})

      }
      else{
      this.$vuetify.goTo(200,{easing: 'easeInOutCubic',offset:200,duration:1200})
      }

    }
  },
  mounted: function() {
    this.fetchProducts();
  },
};
</script >