<template>
  <v-container class="    ">
    <p class="text-center font-weight-light text-h3">Статус заказа</p>

    <v-row>
      <v-col class="col-10">
        <v-text-field
          clearable
          outlined
          color="black"
          label="Номер заказа"
          v-model="invoice_num"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col class="col-2" text-center>
        <v-btn x-large outlined @click="findOrder" :disabled="invoice_num==null||invoice_num==''">Найти заказ</v-btn>
      </v-col>
    </v-row>
    <v-row fluid  v-if="loading">
      <v-col>
        <v-text-field color="success" loading disabled></v-text-field>
      </v-col>
    </v-row>
     <v-row fluid  v-if="error">
      <v-col>
    <p class="text-center font-weight-light text-h3">Заказ с данным номером не был найден</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "InvoicePage",
  data() {
    return {
      invoice_num: null,
       url: "https://localhost:44351",
       loading:false,
       error:false
    };
  },
  methods: {
    findOrder() {
        this.loading=true;
     this.axios
          .get(this.url + "/api/orders/" + this.invoice_num)
          .then((response) => {
            console.log(response.data);
            this.loading=false;
            this.error=false;
          })
          .catch(()=>{
              this.error= true;
              this.loading=false
          });

    },
  },
};
</script>