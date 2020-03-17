import Vue from 'vue';
import Router from 'vue-router';
import Messages from '../views/Messages.vue';
import AboutPage from '../components/AboutPage.vue';
import LoginPage from '../components/LoginPage.vue';
import UserPage from '../components/UserPage.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Messages",
            component: Messages
        },
        {
            path: "/about",
            name: "About",
            component: AboutPage
        },
        {
            path: "/login",
            name: "Login",
            component: LoginPage,
        },
        {
            path: "/user/:user",
            name: "User Profile",
            component: UserPage,
            props: true
        }
    ]
})
