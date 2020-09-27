<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" :loading="isLoading">
              <v-toolbar color="grey lighten-1" dark flat>
                <v-toolbar-title class="grey--text text--darken-4">Авторизация</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login" id="loginform" v-model="isFormValid">
                  <v-text-field
                    label="Имя пользователя"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                    :rules="[v => !!v || 'Поле должно быть заполнено']"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :rules="[v => !!v || 'Поле должно быть заполнено']"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" outlined  color="blue" form="loginform" :disabled="!isFormValid">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  name: "Login",
  data() {
    return {
      isFormValid: false,

      isLoading: false,
      isFailed: false,
      username: "",
      password: "",
      
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$store
        .dispatch("retreiveToken", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/");
          this.isLoading = false;
        });
    },
  },
};
</script>
<style scoped>
@import "./Login.css";
</style>