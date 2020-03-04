<template>
    <div class="userlist">
        <User v-for="user in userList" :key="user.id" :user="user"></User>
    </div>
</template>

<script>
import User from './User.vue';

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

<style>
.userlist {
    background: #67AFCB;
    border: solid black;
    border-width: 0px 0px 2px 2px;
    grid-column: 18 / 21;
    grid-row: 1 / 21;
}
</style>