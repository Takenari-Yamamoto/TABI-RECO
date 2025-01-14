import Vue from 'vue';
import Router from "vue-router";

import Dictation from './pages/Dictation.vue';
import BulltenBorad from './pages/BulletenBoard.vue';
import List from './pages/List.vue';

import Support from './pages/Support.vue';
import Login from './pages/Login.vue';
import Error from './pages/errors/Error.vue';
import TopPage from './pages/TopPage.vue';
import Recommend from './pages/Recommend.vue';

import store from './store';
import SystemError from './pages/errors/System.vue';

//ページコンポーネントのインポート

Vue.use(Router);

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/Dictation/:dictationId',
            name: 'dictation.show',
            component: Dictation,
            props: true
        },
        {
            path: '/list',
            name: 'list',
            component: List,
        },
        {
            path: '/bulleten_board',
            name: 'bulleten_board',
            component: BulltenBorad,
        },
        {
            path: '/support',
            name: 'support',
            component: Support,
        },
        {
            path: '',
            name: 'TopPage',
            component: TopPage,
        },
        {
            path: '/recommendation',
            name: 'Recommend',
            component: Recommend,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter (to, from, next) {
                if (store.getters['auth/check']) {
                    next('/');
                } else {
                    next();
                }
            }
        },
        {
            path: '/500',
            component: SystemError
        },
        {
            path: '*',
            name: 'Error',
            component: Error
        }
    ]
});
