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

<style>
    .user {
        width: 90%;
        /* height: 20px; */
        margin: -10px 0px -10px 0px;
        text-align: left;
        user-select: none;
        padding: 0px 5% 0px 5%;
        color: #1A3E4C;
        /* text-overflow: clip; */
        /* white-space: nowrap; */
        /* overflow: hidden; */
        display: block;
    }
</style>