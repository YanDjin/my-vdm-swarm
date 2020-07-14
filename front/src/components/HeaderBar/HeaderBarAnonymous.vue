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

            <v-btn text :to="{ name: 'register' }">
                Register
            </v-btn>
            <v-btn text :to="{ name: 'login' }">
                Login
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "HeaderBarAnonymous"
    }
</script>

<style scoped>

</style>