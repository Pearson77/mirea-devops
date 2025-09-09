import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from "@/pages/LoginPage.vue";
import GamePage from "@/pages/GamePage.vue";
import FinalPage from "@/pages/FinalPage.vue";
import AdminPage from "@/pages/AdminPage.vue";

const routes = [
    {
        path: '/',
        name: 'game',
        component: GamePage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/final',
        name: 'final',
        component: FinalPage
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminPage
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const is_registered = !!localStorage.getItem('gender');
    const is_completed = !!localStorage.getItem('isCompleted');

    if (!is_registered) {
        if (to.name !== 'login')
            next({ name: 'login' });
        next();
    } else {
        if (to.name === 'login')
            next({ name: 'game' });
        if (to.name === 'final') {
            if (is_completed) next();
            else next({ name: 'game' });
        }
        next();
    }
});

export default router;
