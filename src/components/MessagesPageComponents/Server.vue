<template>
    <div class="server">
        <p class="serverText">{{name.charAt(0)}}</p>
    </div>
</template>

<script>
    export default {
        name: "Server",
        props: {
            name: String
        }
    }
</script>

<style scoped>
    .server {
        width: 80%;
        border-radius: 50%;
        /*background-color: #459DBF;*/
        padding-top: 40%;
        padding-bottom: 40%;
        margin: 10%;
        position: relative;
        display: inline-block;
        vertical-align: middle;
    }
    .server:hover {
        /*background-color: #67AFCB;*/
    }
    .serverText {
        margin: 0;
        position: absolute;
        top: 15%;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 4vh;
        line-height: calc(100%);
    }
</style>
