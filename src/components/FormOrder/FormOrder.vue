<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" :loading="isLoading">
              <v-toolbar color="brown lighten-1" dark flat>
                <v-toolbar-title>Оформление заказа</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="formOrder" id="orderForm">
                  <v-text-field
                    label="Ваше имя"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="name"
                    :rules="[v => !!v || 'Поле должно быть заполнено']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Ваша фамилия"
                    name="surname"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="surname"
                    :rules="[v => !!v || 'Поле должно быть заполнено']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Номер телефона"
                    name="phone"
                    prepend-icon="mdi-cellphone"
                    type="number"
                    v-model="number"
                    :rules="[v => !!v || 'Поле должно быть заполнено']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Название города"
                    name="city"
                    prepend-icon="mdi-city"
                    type="text"
                    v-model="city"
                    :rules="[v => !!v || 'Поле должно быть заполнено']"
                    required
                  ></v-text-field>
                  <v-select
                  prepend-icon="mdi-car-multiple"
                    v-model="delivery_selected"
                    :items="delivery_options"
                    :rules="[v => !!v || 'Поле должно быть заполнено']"
                    label="Служба доставки"
                    required
                  ></v-select>
                  <v-text-field
                    id="delivery_num"
                    label="Номер отделения"
                    name="delivery_num"
                    prepend-icon="mdi-numeric"
                    type="number"
                    v-model="delivery_num"
                    :rules="[v => !!v || 'Поле должно быть заполнено']"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <p class=" font-weight-light display-6">Стоимость покупки: {{this.total}} грн.</p>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="success" form="orderForm">Оформить заказ</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FormOrder",
  components: {},
  computed: {
    ...mapGetters(["cart","total"]),
  },
  data() {
    return {
      url: "https://localhost:44351",
      isLoading: false,
      isFailed: false,
      name: "",
      surname: "",
      number: "",
      city:"",
      delivery_num:null,
      delivery_selected: "",
      delivery_options: [
        { text: "Новая почта", value: "1" },
        { text: "Интайм", value: "2" },
        { text: "УкрПочта", value: "3" },
      ],
    };
  },
  props: {
    source: String,
  },
  methods: {
    formOrder() {
      this.isLoading = true;
      this.$store
        .dispatch("FORM_ORDER", {
          name: this.name,
          surname: this.surname,
          number: this.number,
          city:this.city,
          delivery_selected: this.delivery_selected,
          delivery_num: this.delivery_num,
          total_price: this.total,
          products:this.cart
        })
        .then((response) => {
          console.log(response);
          //this.$router.push("/");
          this.isLoading = false;
        });
    },
  },
};
</script>