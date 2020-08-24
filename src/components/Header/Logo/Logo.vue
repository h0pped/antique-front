<template>
    <div class="logo">
    <v-container fluid>
        <v-row class="text-center">
      <v-col cols="12">
        <v-divider/>
        <router-link  tag="p" to="/">
        <p class="font-regular display-3 title-text">Антикварная лавка</p>
        </router-link>

        <v-divider/>
      </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default{
    name:"Logo"
}
</script>

<style scoped>
    @import './Logo.css';
</style>