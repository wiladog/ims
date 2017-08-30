const routes = [{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['../compoments/layouts/main.vue'], resolve),
    children:[
    	{
    		path:'dashboard',
    		meta: {
    			title:'后台首页'
    		},
    		component: (resolve) => require(['../views/dashboard.vue'], resolve)
    	}
    ]
},{
	path: '/login',
	meta:{
		title: '登录',
	},
	component: (resolve) => require(['../views/login.vue'], resolve)
}

];

export default routes;