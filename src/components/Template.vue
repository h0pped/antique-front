<template>
  <div class="hello">
    <Logo/>
    <NavBar/>
  
  </div>
</template>



<script>
import Logo from "./Header/Logo/Logo.vue"
import NavBar from "./Header/NavBar/NavBar.vue"
export default {
  name: 'Template',
  components:{
  Logo,
  NavBar,
  },
  props: {
    msg: String,
    message: String
  },
  methods:{
    setMessage: function(event){
      this.message = event.target.value;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>