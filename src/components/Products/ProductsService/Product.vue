<template>
     <v-hover v-slot:default="{ hover }" open-delay="20">
          <v-card
            :elevation="hover ? 17 : 2"
            class="mx-auto"
            max-width="350"
            min-width="350"
            min-height="500"
          >
            <v-img
              class="white--text align-end"
              max-height="300px"
              :src="url + '/images/photos/600_' + product.photos[0].path"
              ><v-card-title></v-card-title
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
                <v-btn color="orange" text>
                  Подробнее
                </v-btn>
              </router-link>
              <v-btn color="orange" text @click="addToCart">
                Купить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
</template>

<script>
export default {
    name:"Product",
    props:{
        product:{
            type:Object,
            default(){
                return {}
            }
        },
        url:String
    },
    data(){
        return {}
    },
    methods:{
        addToCart(){
            this.$emit("addToCart",this.product);
        }
    }
}
</script>