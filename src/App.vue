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

<style scoped lang="scss">
    body {
        width: calc(100vw + 10px);
        margin: 0;
        overflow-x: hidden;
        position: absolute;
    }
    #app {
         font-family: Avenir, Helvetica, Arial, sans-serif;
         -webkit-font-smoothing: antialiased;
         -moz-osx-font-smoothing: grayscale;
         text-align: center;
         color: #2c3e50;
         height: 100%;
         width: 100%;
         top: 0;
         left: 0;
    }
</style>
