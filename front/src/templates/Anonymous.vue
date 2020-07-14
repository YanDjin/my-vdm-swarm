<template>
    <div>
        <HeaderBarAnonymous/>
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import HeaderBarAnonymous from "../components/HeaderBar/HeaderBarAnonymous";
    export default {
        name: "Anonymous",
        components: {
            HeaderBarAnonymous
        }
    }
</script>

<style scoped>

</style>