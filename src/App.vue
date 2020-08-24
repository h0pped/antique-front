<template>
  <v-app >
      

    <v-content class="grey lighten-3">
    
    <Template/>
    <transition
        name="fade"
        mode="out-in"
      >
      <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Template from "./components/Template.vue"
export default {
  name: 'App',
  components: {
  Template
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.4s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
