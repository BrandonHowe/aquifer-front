<template>
    <div class="user">
        <h3>{{user.username}}</h3>
    </div>
</template>

<script>
export default {
    name: "User",
    props: {
        user: Object,
    }
}
</script>

<style scoped>
    .user {
        width: 90%;
        /* height: 20px; */
        margin: -10px 0 -10px 0;
        text-align: left;
        user-select: none;
        padding: 0 5% 0 5%;
        color: #1A3E4C;
        /* text-overflow: clip; */
        /* white-space: nowrap; */
        /* overflow: hidden; */
        display: block;
    }
</style>