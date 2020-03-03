<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import MessagesPage from './components/MessagesPage.vue';

export default {
    name: 'App',
    components: {
        MessagesPage
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* display: grid; */
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
}
</style>
