import Vue from 'vue';
import Router from 'vue-router';
import MessagesPage from '../components/MessagesPage.vue';
import AboutPage from '../components/AboutPage.vue';
import UserPage from '../components/UserPage.vue';

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
        },
        {
            path: "/user/:user",
            name: "User Profile",
            component: UserPage,
            props: true
        }
    ]
})