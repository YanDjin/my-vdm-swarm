<template>
    <v-container>
        <HeaderBarAuthenticated/>
        <v-main
          :class="margin ? 'mt-10' : ''"
          class="mb-10"
        >
            <slot></slot>
        </v-main>
    </v-container>
</template>

<script>
  import HeaderBarAuthenticated from "../components/HeaderBar/HeaderBarAuthenticated";

  export default {
    name: "Authenticated",
    components: {
      HeaderBarAuthenticated
    },
    props: {
      margin: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      token() {
        return this.$store.state.token
      }
    },
    watch: {
      token(){
        if (this.token === null){
          this.$router.push({name: 'login'});
        }
      }
    },
    created() {
      if (this.token === null){
        this.$router.push({name: 'login'});
      }
    }
  }
</script>

<style scoped>

</style>