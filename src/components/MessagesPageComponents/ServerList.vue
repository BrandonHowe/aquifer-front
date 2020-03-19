<template>
    <div class="serverList">
        <Server
            v-for="server in servers"
            :key="server.id"
            :name="server.name"
        ></Server>
    </div>
</template>

<script>
    import Server from './Server.vue';
    export default {
        name: "ServerList",
        components: {
            Server
        },
        props: {
            servers: Object
        },
    }
</script>

<style scoped>
    .serverList {
        grid-column: 1;
        grid-row: 1 / 21;
        /* background-color: #044289; */
        background-color: var(--aquifer-dark-2);
    }
</style>
