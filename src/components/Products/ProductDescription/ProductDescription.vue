<template>
  <v-container class="text-center">
    <div v-if="loading">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <p class="font-weight-light display-1">Загрузка...</p>
            <v-sheet class="px-3 pt-7 pb-7 mx-auto"  height="320">
              <v-skeleton-loader
                class="mx-auto"
                max-width="500"
                type="card"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(photo, i) in product.photos"
      :key="i"
    >
     <v-img
          contain
          class="white--text align-end"
          height="100%"
          :src="url + '/images/photos/1280_' + product.photos[i].path"
          >
        
      </v-img>
    </v-carousel-item>
  </v-carousel>
        
        <v-card-subtitle class="pb-0 headline"
          ><p class="black--text">{{ product.name }}</p></v-card-subtitle
        >

        <v-card-text class="text--primary pb-0">
          <div >
            {{ product.description }}
          </div>
        </v-card-text>
        <v-card-text class="text--primary pb-0">
          <div>{{ product.price }} грн.</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="orange" text>
            Купить
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Description",
  data: () => ({
    url: "http://91.238.103.88",
    loading: true,
    product: null,
  }),
  props: {
    id: String,
  },
  mounted: function() {
    this.axios.get(this.url + "/api/Products/" + this.id).then((response) => {
      this.product = response.data;
      this.loading = false;
    });
  },
};
</script>
