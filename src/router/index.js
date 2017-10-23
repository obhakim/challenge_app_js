import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Import views template =============================
import SignUp from '../components/user/SignUp.vue';
import SignIn from '../components/user/SignIn.vue';
import Profil from '../components/Profil.vue';

export default new Router({

    mode: 'history',
    routes: [
        {
            name: 'Profil',
            path: '/profil',
            component: Profil
        },
        {
            name: 'SignIn',
            path: '/',
            component: SignIn
        },
        {
            name: 'SignUp',
            path: '/signup',
            component: SignUp
        }
    ]
})
