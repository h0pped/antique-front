<template>
    <h1>Form order!</h1>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
    name:"FormOrder",
    components:{
    },
    computed: {
      ...mapGetters([
        'cart',
      ])
  },
    data(){
        return{
            url: "https://localhost:44351"
        }
    }
}
</script>