<template>
    <div>
        <HeaderBarAuthenticated/>
        <slot></slot>
    </div>
</template>

<script>
    import HeaderBarAuthenticated from "../components/HeaderBar/HeaderBarAuthenticated";
    export default {
        name: "Authenticated",
        components: {
            HeaderBarAuthenticated
        }
    }
</script>

<style scoped>

</style>