<template>
  <v-app>
    

    <p class="text-center font-weight-light text-h3">{{this.checkbox?"Незавершенные заказы":"Все заказы"}}</p>
    <div v-if="loading">
  

    <v-row cols="12">
      <v-col>
        <v-text-field color="success" loading disabled></v-text-field>
      </v-col>
    </v-row>

  </div>
  <div v-if="!loading">

    <v-checkbox
      v-model="checkbox"
      :label="`Показать незавершенные заказы`"
      @change="check($event)"
    ></v-checkbox>
    <v-data-table
      :headers="headers"
      :items="this.checkbox == true ? undone_orders : all_orders"
      :items-per-page="10"
      class="elevation-1"
    >
      <template #item.full_name="{ item }"
        >{{ item.name }} {{ item.surname }}</template
      >
      <template #item.delivery="{ item }"
        >{{ item.delivery }} #{{ item.deliveryNum }}</template
      >
      <template #item.totalPrice="{ item }"
        >{{ item.totalPrice }} грн.</template
      >
      <template v-slot:item.actions="{ item }">
        <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      url: "https://localhost:44351",
      checkbox: false,
      loading: true,
      all_orders: [],
      undone_orders: [],

      headers: [
        { text: "Артикль", value: "id" },
        { text: "Имя", value: "full_name" },
        { text: "Город", value: "city" },
        { text: "Почта", value: "delivery" },
        { text: "Сумма заказа", value: "totalPrice" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    fetchOrders: function () {
      this.axios.get(this.url + "/api/orders/allOrders").then((response) => {
        this.all_orders = response.data;
      });
      this.axios.get(this.url + "/api/orders/undoneorders").then((response) => {
        this.undone_orders = response.data;
        this.loading = false;
      });
    },
    check: function () {
      this.loading=true;
      this.fetchOrders();
    },
  },
  mounted: function () {
    this.fetchOrders();
  },
};
</script>