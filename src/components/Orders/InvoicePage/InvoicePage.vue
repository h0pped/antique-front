<template>
  <v-container class="    ">
    <p class="text-center font-weight-light text-h3">Статус заказа</p>
    <v-form @submit.prevent="findOrder" id="invoiceForm">
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
          <v-btn
          
            x-large
            outlined
            :disabled="invoice_num == null || invoice_num == ''"
            type="submit"
            :loading="this.loading"
            >Найти заказ</v-btn
          >
        </v-col>
      </v-row>
     
      <v-row fluid v-if="error">
        <v-col>
          <v-alert outlined type="error">
            Заказ с номером <strong>{{ error_invoice_num }}</strong> не был
            найден
          </v-alert>
        </v-col>
      </v-row>
    </v-form>
    <OrderStatus
      :invoice="this.invoice"
      v-if="
        this.loading == false && this.error == false && this.success == true
      "
    ></OrderStatus>
  </v-container>
</template>
<script>
import OrderStatus from "../OrderStatus/OrderStatus.vue";
export default {
  components: {
    OrderStatus,
  },
  name: "InvoicePage",
  data() {
    return {
      invoice_num: null,
      error_invoice_num: null,
      url: "https://localhost:44351",
      loading: false,
      success: false,
      error: false,
      invoice: null,
    };
  },
  methods: {
    findOrder() {
      this.loading = true;
      this.success = false;
      this.axios
        .get(this.url + "/api/orders/" + this.invoice_num)
        .then((response) => {
          console.log(response.data);
          this.invoice = response.data;
          this.loading = false;
          this.success = true;
          this.error = false;
        })
        .catch(() => {
          this.error_invoice_num = this.invoice_num;
          this.error = true;
          this.loading = false;
        });
    },
  },
};
</script>