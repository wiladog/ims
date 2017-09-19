import user from '../../api/user'
import * as types from '../mutation-types'
import routes from '../../router/routes'

// console.info(routes);
// initial state
// shape: [{ id, quantity }]
const state = {
  added: [],
  loging:false,
  checkoutStatus: null,
  is_vailed: false,
  captcha_src:'http://n.api.admin.hdpfans.dev/captcha/default?'+Math.random(),
  message:'',
  addRoutes:[],
  routes:routes,
  gtRoutes:[],
  user:[],

  
}
// getters
const getters = {
  checkoutStatus: state => state.checkoutStatus,
  is_vailed: state => state.is_vailed,
  loging: state => state.loging,
  captcha_src: state => state.captcha_src,
  message: state => state.message,
  addRoutes: state => state.addRoutes,
  routes:state => state.routes,
  gtRoutes: state => state.gtRoutes,
  user:state => state.user,
}

function generateRoutes(data) {
  // console.info(data);
  let routes = [];
  data.forEach((line, k) => {
    if(line.children) {
      let tmpAbc = [];
      line.children.forEach((l,i) =>{
        if(l.children) {
          l.children.forEach((it,m)=>{
            tmpAbc.push({
              path:it.path,
              meta:it.meta,
              name:it.name,
              component: (resolve) => require(['../../views/'+it.component+'.vue'], resolve),
            });
          });
        } else {
          tmpAbc.push({
          path:l.path,
          meta:l.meta,
          name:l.name,
          component: (resolve) => require(['../../views/'+l.component+'.vue'], resolve),
        });
        }
      });
      routes.push({
        path:line.path,
        meta:line.meta,
        name:line.name,
        component: (resolve) => require(['../../compoments/layouts/'+line.component+'.vue'], resolve),
        children:tmpAbc
      });
    } else {
      routes.push({
        path:line.path,
        meta:line.meta,
        name:line.name,
        component: (resolve) => require(['../../views/'+line.component+'.vue'], resolve),
      });
    }
  });



  const notFoundRoute = {
      path: '*',
      meta: {
        title:'404',
      },
      component: (resolve) => require(['../../views/NotFoundComponent.vue'], resolve)
  };

  routes.push(notFoundRoute);


  return routes;

}

// mutations
const mutations = {
  [types.ADD_ROUTES] (state, payload) {
    // console.info(payload.data);
    const addRoutes = generateRoutes(payload.data);
    // console.info(payload.data[0].children);
    state.gtRoutes = payload.data[0].children;
    // const tmpAddRoutes = generateRoutes2(payload.data);

    // console.info(tmpAddRoutes);

    // console.info(addRoutes);
    state.addRoutes = addRoutes;

  },

  [types.LOGIN] (state, payload) {
    window.localStorage.setItem('token',payload.data.token);
    window.localStorage.setItem('permissions', JSON.stringify(payload.data.routes));
    let permissions = JSON.parse(window.localStorage.getItem('permissions'));
    console.info(permissions);
    state.is_vailed = true;
    state.message = payload.message + '-' +Math.random();
    state.loging = false;
    

    
  },
  [types.CHECK_CAPTCHA] (state, payload) {
    // console.info('aa');
    // console.info(payload);
    state.is_vailed = true;
    if(payload.status) {
      // state.route.path = '/admin';
      // console.info(state.route);
    } else {
      // state.captcha_src = 'http://n.api.admin.hdpfans.dev/captcha/default?'+Math.random();
      // state.loginData.captcha = '';
      
    }
    state.message = payload.message + '-' +Math.random();
    state.loging = false;
  },
  [types.CHANGE_LOGING_STATUS] (state) {
      state.loging = !state.loging;
  },
  [types.INTERNAL_ERROR] (state) {
      state.message = '网络错误!-' + Math.random();
      state.loging = !state.loging;
  },
  [types.GET_USERS] (state, data) {
    state.user = data;
  },
  [types.DELETE_USER] (state, data) {
    // state.user = data;
  },
  [types.CREATE_USER] (state, data) {
    state.user.push(data);
  }

}

// actions
const actions = {

  getUsers ({commit, state}, p) {
    user.getUsers(p).then((rsp)=>{
      // console.info(rsp);
      commit(types.GET_USERS, rsp.data.data);
    });
  },

  createUser ({commit, state}, p) {
    // console.info(p);
    user.createUser(p).then((rsp)=>{
      // console.info(rsp);
      commit(types.CREATE_USER, rsp.data.data);
    });
  },

  deleteUser ({commit, state}, p) {
    user.deleteUser(p).then((rsp)=>{
      // commit(types.DELETE_USER, rsp.data.data);
    });
  },
  
  login ({commit,state}, p) {
    // console.info(state);
    commit(types.CHANGE_LOGING_STATUS);
    // user.login(
    //   p,
    //   (rsp) => commit(types.LOGIN, rsp)
    // )
    
    // let logins = user.logins(p);
    // console.info(logins);
    // logins.then((rsp) => {
    //   // console.info(rsp.data);
    //   // console.info('--------');
    //   commit(types.LOGIN, rsp.data);
    //   return 'aa';
    // });
    // console.info(logins);
    // return logins;
    // console.info(logins);
    // user.logins.then(() =>{
    //   console.info('pross');
    // });
    
    let logins = user.logins(p);
    logins.then((rsp) =>{
      // console.info(rsp);
      commit(types.LOGIN, rsp.data);
    }).catch((error) => {
      commit(types.INTERNAL_ERROR);
      // console.info(error);
    });
    return logins;


  },
  getRoutes({commit,state},p) {
    // console.info(p);
    let getRoutesss = user.routes(p);
    getRoutesss.then((rsp)=>{
      // console.info(rsp.data);
      commit(types.ADD_ROUTES,rsp.data);
    });
    return getRoutesss;
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}