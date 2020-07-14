<template>
    <b-navbar fixed-top type="is-white" spaced>
        <template slot="brand">
            <b-navbar-item tag="div">
                <img
                  src="../../assets/logo.png"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item>
                <router-link :to="{ path: '/' }">
                    Home
                </router-link>
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <router-link class="button is-primary" :to="{ path: '/register' }">
                        <strong>Sign up</strong>
                    </router-link>
                    <router-link class="button is-light" :to="{ path: '/authentication' }">
                        Log in
                    </router-link>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
    export default {
        name: "HeaderBarAnonymous"
    }
</script>

<style scoped>

</style>