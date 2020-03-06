<template>
    <div class="user">
        <h3>{{user.username}}</h3>
    </div>
</template>

<script>
    import '../../assets/colorVars.css';
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
        color: var(--aquifer-text-dark-1);
        /* text-overflow: clip; */
        /* white-space: nowrap; */
        /* overflow: hidden; */
        display: block;
    }
</style>