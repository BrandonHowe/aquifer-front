<template>
    <div
        class="userList"
    >
        <User
            v-for="user in userList"
            :key="user.id"
            :user="user"
        ></User>
    </div>
</template>

<script>
    import User from './User.vue';
    import '../../assets/colorVars.css';

    export default {
        name: "UserList",
        components: {
            User
        },
        props: {
            userList: Object
        }
    }
</script>

<style scoped lang="scss">
    .userList {
        background: var(--aquifer-medium-1);
        border: solid black;
        border-width: 0 0 2px 2px;
        grid-column: 18 / 21;
        grid-row: 1 / 21;
    }
</style>
