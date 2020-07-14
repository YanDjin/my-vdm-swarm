<template>
    <div>
        <v-app-bar
          app
          color="blue darken-1"
          dense
          dark
        >
            <v-btn icon :to="{ name: 'home' }">
                <v-icon>mdi-home</v-icon>
            </v-btn>

            <v-toolbar-title>VDM</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text @click="logout">
                Logout
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
  export default {
    name: "HeaderBarAuthenticated",
    methods: {
      logout() {
        this.$store.commit('resetToken');
      }
    }
  }
</script>

<style scoped>

</style>