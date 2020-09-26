<template>
  <v-app>
    <p class="text-center font-weight-light text-h3">Заказы</p>
    <v-data-table
    :headers="headers"
    :items="orders"
    :items-per-page="10"
    class="elevation-1"
  >
  <template #item.full_name="{ item }">{{ item.name }} {{ item.surname }}</template>
  <template #item.delivery="{ item }">{{ item.delivery }} #{{ item.deliveryNum }}</template>
  <template #item.totalPrice="{ item }">{{ item.totalPrice }} грн.</template>
<template v-slot:item.actions="{ item }">
      <v-icon
        medium
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        medium
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      url: "https://localhost:44351",
      loading:true,
      orders: [],
      headers: [
          { text: 'Артикль', value: 'id' },
          { text: 'Имя', value: 'full_name' },
          { text: 'Город', value: 'city' },
          { text: 'Почта', value: 'delivery' },
          { text: 'Сумма заказа', value: 'totalPrice' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
    };
  },
  methods: {
    fetchOrders: function () {
        this.axios.get(this.url+"/api/orders/allOrders")
        .then((response)=>{
            this.orders = response.data
            console.log(this.orders);
            this.loading = false;

        })
    },
  },
  mounted: function () {
    this.fetchOrders();
  },
};
</script>