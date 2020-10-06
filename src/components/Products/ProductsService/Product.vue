<template>
<div>
    <v-notification :messages="messages" :timeout="3000"/>

  <v-hover v-slot:default="{ hover }" open-delay="20">
    <v-card
      :elevation="hover ? 17 : 2"
      class="mx-auto"
      max-width="350"
      min-width="350"
      min-height="500"
    >
      <v-row>
        <v-dialog v-model="dialog" persistent width="700" v-if="loggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="ma-2 delete-label"
              color="grey lighten-1  accent-4"
              link
              x-default
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left> mdi-delete</v-icon>
              Удалить
            </v-chip>
          </template>
          <v-card>
            <v-card-title class="headline">
              <p class="text-center text-h5">
                Вы действительно хотите удалить этот товар?
              </p>
              <br />
            </v-card-title>
            <v-card-text>
              <p class="text-center black--text font-weight-light text-h5">
                {{ product.name }}
              </p>
              <v-row justify="center">
                <v-img
                  max-height="200px"
                  aspect-ratio="1"
                  contain
                  :src="url + '/images/photos/1280_' + product.photos[0].path"
                ></v-img>
              </v-row>

              <p class="text-center black--text font-weight-light text-h5">
                {{ product.description.slice(0, 100) }}...
              </p>
              <p class="text-center black--text font-weight-light text-h5">
                {{ product.price }}грн.
              </p>
            </v-card-text>
            <v-card-actions>
              <p
                class="text-center success--text font-weight-light text-h5"
                v-if="isSuccessDelete"
              >
                Товар был успешно удален!
              </p>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">
                Отменить
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="deleteProduct(product.id)"
              >
                Подтвердить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-img
        class="white--text"
        max-height="300px"
        :src="url + '/images/photos/1280_' + product.photos[0].path"
      ></v-img>
      <v-card-subtitle class="pb-0 headline"
        ><p class="black--text">{{ product.name }}</p></v-card-subtitle
      >

      <v-card-text class="text--primary pb-0">
        <div v-if="product.description.length < 100">
          {{ product.description }}
        </div>
        <div v-else>{{ product.description.slice(0, 100) }}...</div>
      </v-card-text>
      <v-card-text class="text--primary pb-0">
        <div>{{ product.price }} грн.</div>
      </v-card-text>
      <v-card-actions>
        <router-link :to="'description/' + product.id" tag="span">
          <v-btn color="orange" text> Подробнее </v-btn>
        </router-link>
        <v-btn color="orange" text @click="addToCart"> Купить </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vNotification from "../../Notifications/v-notification";
export default {
  computed: {
    ...mapGetters(["loggedIn", "token"]),
  },
  components:{
vNotification
  },
  name: "Product",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    url: String,
  },
  data() {
    return {
      dialog: false,
      isSuccessDelete: false,
      messages:[],
    };
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product);
    },
    deleteProduct(id) {
      this.axios
        .delete(this.url + "/api/products/delete/" + id, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.isSuccessDelete = true;
          let timeStamp = Date.now().toLocaleString();
          this.messages.unshift({
            name: "Товар был успешно удален!",
            id: timeStamp,
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          let timeStamp = Date.now().toLocaleString();
          this.messages.unshift({
            name: "Ошибка при удалении товара, попробуйте позже",
            id: timeStamp,
            type: "error",
          });
        });
    },
  },
};
</script>
<style scoped>
.delete-label {
  position: absolute;
  float: right;
  right: -3%;
  top: -5%;
  z-index: 2;
}
</style>