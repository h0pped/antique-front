<template>
  <v-main>
    <v-row fluid no-gutters>
      <v-col>
        <v-card class="mx-auto" color="grey lighten-3">
          <v-card-text>
            <p class="text--primary font-weight-light text-h5">
              <strong>Заказ №:</strong> {{ invoice.id }}
            </p>
            <p class="text--primary font-weight-light text-h5">
              <strong>Статус заказа:</strong>
              {{ invoice.isDone ? "Завершён" : "Активный" }}
            </p>
            <p class="text--primary font-weight-light text-h6">
              <strong>Имя:</strong> {{ invoice.name }} {{ invoice.surname }}
            </p>
            <p class="text--primary font-weight-light text-h6">
              <strong>Номер телефона:</strong> +{{ invoice.number }}
            </p>
            <p class="text--primary font-weight-light text-h6">
              <strong>Адрес доставки:</strong>
              {{
                invoice.city +
                ", " +
                invoice.delivery +
                " №" +
                invoice.deliveryNum
              }}
            </p>
            <p class="text--primary font-weight-light text-h6">
              <strong>ТТН:</strong>
              {{ invoice.invoice != 0 ? invoice.invoice : "Ожидается" }}
            </p>
            <p class="text--primary font-weight-light text-h6">
              <strong>Товары:</strong>
            </p>

            <v-data-table
              :headers="headers"
              :items="invoice.items"
              :items-per-page="10"
              class="elevation-1"
              hide-default-footer
              color="grey"
            >
              <template v-slot:item.photo="{ item }">
                <v-img
                  :width="100"
                  :aspect-ratio="1"
                  contain
                  :src="
                    url + `/images/photos/300_` + item.product.photos[0].path
                  "
                ></v-img
              ></template>
              <template v-slot:item.product.price="{ item }">
                {{ item.product.price }} грн.
              </template>
            </v-data-table>

            <v-card-actions>
              <v-btn
                v-if="loggedIn && !invoice.isDone && !isMarkSuccess"
                large
                outlined
                @click="markAsDone"
                :loading="isMarkLoading"
                >Пометить как завершён</v-btn
              >
              <v-btn
                v-if="loggedIn && !invoice.isDone"
                large
                outlined
                @click="changeInvoiceNumToggle"
                >Сменить ТТН</v-btn
              >
            </v-card-actions>
            <v-row v-if="changeInvoice">
              <v-col class="col-10">
                <v-text-field
                  v-if="changeInvoice"
                  clearable
                  outlined
                  dense
                  color="black"
                  label="Номер ТТН"
                  v-model="newInvoiceNum"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col class="col-2" text-center
                ><v-btn
                  v-if="loggedIn"
                  medium
                  outlined
                  @click="changeInvoiceNum"
                  :loading="isInvoiceLoading"
                  >Подтвердить</v-btn
                >
              </v-col>
            </v-row>

            <p
              class="font-weight-light text-h6 green--text"
              v-if="isMarkSuccess"
            >
              Статус заказа успешно обновлён!
            </p>
            <p
              class="font-weight-light text-h6 green--text"
              v-if="isInvoiceSuccess"
            >
              Номер ТТН успешно обновлён!
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    invoice: Object,
  },
  computed: {
    ...mapGetters(["loggedIn"]),
  },
  data() {
    return {
      url: "https://localhost:44351",
      headers: [
        { text: "Артикль", value: "product.id" },
        { text: "Фото", value: "photo" },
        { text: "Название", value: "product.name" },
        { text: "Цена", value: "product.price" },
      ],
      invoiceId: this.invoice.id,
      isMarkLoading: false,
      isInvoiceLoading:false,
      isMarkSuccess: false,
      isInvoiceSuccess: false,
      changeInvoice: false,
      newInvoiceNum:null
    };
  },
  methods: {
    markAsDone() {
      this.isMarkLoading = true;
      this.axios
        .post(this.url + "/api/orders/markAsDone/" + this.invoice.id)
        .then((response) => {
          console.log("DONE!", response.data);
          this.isMarkLoading = false;
          this.isMarkSuccess = true;

          setTimeout(() => {
            this.$router.push("/");
          }, 3000);
        });
    },
    changeInvoiceNumToggle() {
      this.changeInvoice = true;
    },
    changeInvoiceNum(){
        this.isInvoiceLoading=true;
        this.axios.post(this.url+"/api/orders/addInvoice",{id:this.invoice.id,invoice:this.newInvoiceNum}).then(()=>{
            this.isInvoiceSuccess=true;
        this.isInvoiceLoading = false;

            setTimeout(() => {
            this.$router.push("/");
          }, 3000);
        }).catch(error=>{
            console.log(error);
        })
    }
  },
};
</script>