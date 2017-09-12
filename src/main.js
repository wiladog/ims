import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';

import * as filters from './filters' // 全局filter

import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
// import '../assets/css/bootstrap.min.css';
// import './assets/css/bootstrap.min.css';

import VueI18n from 'vue-i18n';
import StoreConstructorOptions from './store';
import RouterConstructionOptions from './router';
import locales from './locales';
import { sync } from 'vuex-router-sync'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
// const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';
const lang = 'zh-CN'; // 设置语言为 zh-CN
Vue.config.lang = lang;

// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

// store configuration
const store = new Vuex.Store(StoreConstructorOptions);
// 路由配置

const router = new VueRouter(RouterConstructionOptions);

router.beforeEach((to, from, next) => {

    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if(window.localStorage.getItem('token')){
        if (to.path === '/login') {
            next({path:'/dashboard'});
        } else {
            if(store.getters.addRoutes.length == 0) {
                // 动态根据用户增加路由
                store.dispatch('getRoutes',{token:window.localStorage.getItem('token')}).then((rsp) =>{
                   console.info(store.getters.addRoutes);
                    router.addRoutes(store.getters.addRoutes);
                    next({...to});
                // next('/roles');
                });
            } else {
                // 这里还可以做验证
                // console.info(router);
                // console.info(to);
                store.dispatch('changeNavtabs', to);
                next();
            }
            
        }

    } else {
        if(to.path == '/login') {
            next();
        } else {
            next('/login');
        }
        // next('/login');
        console.info('没有登录');
    }
    
    
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

sync(store, router);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});