<template>
    <div
        @click="changeSelection()"
        class="loginHeader"
    >
        <div
            :class="{
                selected: selected === id
            }"
            class="loginOverbar"
        ></div>
        <h2 class="loginTitle">{{ name }}</h2>
        <div
            :class="{
                selected: selected === id
            }"
            class="loginBar"
        ></div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
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
    })
</script>

<style scoped>
    .loginBar {
        background-color: var(--aquifer-light-3);
        height: 4px;
        border-radius: 10px;
        margin-top: 2px;
        transition: background-color 0.2s, padding-left 0.2s, padding-right 0.2s;
        padding-left: 0;
        padding-right: 0;
        width: 0;
    }
    .loginOverbar {
        background-color: var(--aquifer-light-3);
        height: 4px;
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
        background-color: var(--aquifer-medium-2);
        padding-left: 50%;
        padding-right: 50%;
    }
    .loginHeader:hover > .loginOverbar {
        background-color: var(--aquifer-medium-2);
        padding-left: 50%;
        padding-right: 50%;
    }
    .selected {
        background-color: var(--aquifer-medium-2);
        padding-left: 50%;
        padding-right: 50%;
    }
    .loginTitle {
        font-size: 24px;
        margin: 0;
        clear: both;
        user-select: none;
    }
</style>
