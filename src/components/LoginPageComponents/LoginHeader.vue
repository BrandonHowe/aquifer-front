<template>
    <div @click="changeSelection()" class="loginHeader">
        <h2 class="loginTitle">{{ name }}</h2>
        <div class="loginBar"></div>
    </div>
</template>

<script>
    export default {
        name: "LoginHeader",
        props: {
            name: String
        },
        methods: {
            changeSelection() {
                this.$emit('changeSelected')
            }
        }
    }
</script>

<style scoped>
    .loginBar {
        background-color: #78A4B5;
        height: 8px;
        border-radius: 10px;
        margin-top: 5px;
        transition: background-color 0.2s;
    }
    .loginHeader {
        width: max-content;
        margin-left: auto;
        margin-right: auto;
    }
    .loginHeader:hover .loginBar {
        background-color: #459DBF;
    }
    .loginTitle {
        font-size: 24px;
        margin: 0;
    }
</style>
