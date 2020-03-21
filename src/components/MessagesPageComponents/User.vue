<template>
    <div class="user">
        <router-link
            :to="'/user/' + user.username + '/' + user.usernum"
            class="routerLink"
        >
            <h3>{{user.username}}</h3>
        </router-link>
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
        margin: -10px 0 -10px 0;
        text-align: left;
        user-select: none;
        padding: 0 5% 0 5%;
        color: var(--aquifer-text-dark-1);
        display: block;
        transition: background-color 0.3s;
    }
    .user:hover {
        background-color: var(--aquifer-medium-2);
    }
    .routerLink {
        text-decoration: none;
        color: var(--aquifer-text-dark-1);
    }
</style>
