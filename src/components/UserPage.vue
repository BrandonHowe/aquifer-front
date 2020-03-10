<template>
    <div class="userPage">
        <h1>{{ $route.params.user }}</h1>
    </div>
</template>

<script>
    export default {
        name: "UserPage",
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');

    .userPage {
        font-family: 'Montserrat'
    }
</style>