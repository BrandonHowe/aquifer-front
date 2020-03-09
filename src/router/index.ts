import Vue from 'vue';
import Router from 'vue-router';
import MessagesPage from '../components/MessagesPage.vue';
import AboutPage from '../components/AboutPage.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Messages",
            component: MessagesPage
        },
        {
            path: "/about",
            name: "About",
            component: AboutPage
        }
    ]
})