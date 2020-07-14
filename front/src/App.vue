<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    // Authenticated,
  },
  computed: {
    token() {
      return '';
    }
  }
}
</script>

<style>
#app {
  margin-top: 30px;
}
</style>
