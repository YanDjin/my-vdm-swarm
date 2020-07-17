<template>
    <v-container>
        <HeaderBarAnonymous/>
        <v-main
          :class="margin ? 'mt-10' : ''"
          class="mb-10"
        >
            <slot></slot>
        </v-main>
    </v-container>
</template>

<script>
  import HeaderBarAnonymous from "../components/HeaderBar/HeaderBarAnonymous";

  export default {
    name: "Anonymous",
    components: {
      HeaderBarAnonymous
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
        if (this.token !== null){
          this.$router.push({name: 'dashboard'});
        }
      }
    },
    created() {
      if (this.token !== null){
        this.$router.push({name: 'dashboard'});
      }
    }
  }
</script>

<style scoped>

</style>