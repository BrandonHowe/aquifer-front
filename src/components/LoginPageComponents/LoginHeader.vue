<template>
    <div @click="changeSelection()" class="loginHeader">
        <div :class="{selected: selected === id}" class="loginOverbar"></div>
        <h2 class="loginTitle">{{ name }}</h2>
        <div :class="{selected: selected === id}" class="loginBar"></div>
    </div>
</template>

<script>
    export default {
        name: "LoginHeader",
        props: {
            name: String,
            id: Number,
            selected: Number
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
        height: 5px;
        border-radius: 10px;
        margin-top: 3px;
        transition: background-color 0.2s, padding-left 0.2s, padding-right 0.2s;
        padding-left: 0;
        padding-right: 0;
        width: 0;
    }
    .loginOverbar {
        background-color: #78A4B5;
        height: 5px;
        border-radius: 10px;
        margin-top: 5px;
        transition: background-color 0.2s, padding-left 0.2s;
        padding-left: 0;
        width: 0;
        float: right;
        clear: left;
    }
    .loginHeader {
        width: max-content;
        margin-left: auto;
        margin-right: auto;
    }
    .loginHeader:hover > .loginBar {
        background-color: #459DBF;
        padding-left: 50%;
        padding-right: 50%;
    }
    .loginHeader:hover > .loginOverbar {
        background-color: #459DBF;
        padding-left: 50%;
        padding-right: 50%;
    }
    .selected {
        background-color: #459DBF;
        padding-left: 50%;
        padding-right: 50%;
    }
    .loginTitle {
        font-size: 24px;
        margin: 0;
        clear: both;
    }
</style>
