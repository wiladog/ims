const routes = [{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['../compoments/layouts/main.vue'], resolve)
}];
export default routes;