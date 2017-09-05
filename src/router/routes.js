const routes = [

{
	path: '/login',
	meta:{
		title: '登录',
	},
	component: (resolve) => require(['../views/login.vue'], resolve)
}

];

export default routes;