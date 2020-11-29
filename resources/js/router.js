import Vue from 'vue';
import Router from "vue-router";

import Homepage from './pages/Homepage.vue';
import BulltenBorad from './pages/BulletenBoard.vue';
import List from './pages/List.vue';
import MyPage from './pages/MyPage.vue';
import Support from './pages/Support.vue';
import Login from './pages/Login.vue';

//ページコンポーネントのインポート

Vue.use(Router);

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Homepage,
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
            path: '/mypage',
            name: 'mypage',
            component: MyPage,
        },
        {
            path: '/support',
            name: 'support',
            component: Support,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        }

    ]
});