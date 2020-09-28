<template>
  <v-app id="inspire"  class="grey lighten-3">
    <v-main >
      <v-container fluid>
        <v-row justify="center">
          <v-col fluid>
            <v-card class="elevation-12" :loading="isLoading">
              <v-toolbar color="brown lighten-1" dark flat>
                <v-toolbar-title>Добавление нового товара</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form
                  @submit.prevent="addNewProduct"
                  id="newProductForm"
                  v-model="isFormValid"
                >
                  <v-text-field
                    label="Название товара"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="name"
                    :rules="[(v) => !!v || 'Поле должно быть заполнено']"
                    required
                  ></v-text-field>
                  <v-select
                    prepend-icon="mdi-clipboard-list"
                    v-model="category"
                    :items="category_list"
                    :rules="[(v) => !!v || 'Поле должно быть заполнено']"
                    label="Категория товара"
                    required
                  ></v-select>
                  <v-text-field
                    label="Цена"
                    name="price"
                    prepend-icon="mdi-numeric"
                    type="number"
                    v-model="price"
                    suffix="грн."
                    :rules="[(v) => !!v || 'Поле должно быть заполнено']"
                    required
                  ></v-text-field>

                  <v-textarea
                    id="description"
                    label="Описание товара"
                    name="description"
                    prepend-icon="mdi-card-text"
                    type="number"
                    v-model="description"
                    clearable
                    auto-grow
                    :rules="[(v) => !!v || 'Поле должно быть заполнено']"
                  ></v-textarea>
                  <v-file-input
                    multiple
                    label="Изображения товара"
                    v-model="files"
                    @change="filechange"
                    accept="image/*"
                  >
                  </v-file-input>
                  <v-container>
                  <v-row fluid>
                    <v-col
                      v-for="n in images.length"
                      :key="n"
                    >
                      <v-img
                      max-height="300px"
                      max-width="200px"
                      min-width="150px"
                      contain
                        :src="images[n-1]"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        :key="n"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>
                  </v-row>
                  </v-container>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  type="submit"
                  color="success"
                  form="newProductForm"
                  :disabled="!isFormValid"
                  >Добавить Новый товар</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="isSuccess" align="center" justify="center">
          <div>
            <p class="text-center font-weight-light text-h3">
              Товар успешно добавлен!
            </p>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
    ...mapGetters(["token"]),
  },
  data() {
    return {
      url: "https://localhost:44351",
      name: "",
      category: "",
      price: "",
      description: "",
      files: [],
      isSuccess: false,
      isLoading: false,
      isFormValid: false,
      images: [],

      category_list: [
        { text: "Комоды", value: "Комоды" },
        { text: "Мягкая часть", value: "Мягкая часть" },
        { text: "Столы и стулья", value: "Столы и стулья" },
        { text: "Часы", value: "Часы" },
        { text: "Разное", value: "Разное" },
      ],
    };
  },
  methods: {
    filechange: function (e) {
      console.log(e);
      this.createBase64Elements(e);
    },
    createBase64Elements: function (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          this.$set(this.images, this.images.length, reader.result);
        };
      }
      console.log(this.images);
    },
    addNewProduct:function(){
        const product = {
        Name: this.name,
        Category: this.category,
        Price:this.price,
        Description:this.description,
        ImgsBase64:JSON.parse(JSON.stringify(this.images))
      }
      console.log("PRODUCT:",product)
      this.axios.post(this.url+"/api/products/add",product, {
headers: {
      Authorization: 'Bearer ' + this.token,
   }
}).then((response)=>{
          console.log(response.data);
      }).
      catch(error=>{
          console.log(error);
      })
        

    }
  },
};
</script>