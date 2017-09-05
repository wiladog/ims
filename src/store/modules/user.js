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
  gtRoutes:[]

  
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
}

// function generateRoutes2(data) {
//   let tmpData = [];
//   // console.info(data);
//   data.forEach((item,k) => {


//     if(item.path == '/') {
//       console.info('后台根路由');
//       item.component = (resolve) => require(['../../compoments/layouts/'+item.component+'.vue'], resolve)
//       tmpData.push(item);

//     } else {
//       item.component = (resolve) => require(['../../views/'+item.component+'.vue'], resolve)
//     tmpData.push(item);
//       if(item.children) {
//       generateRoutes2(item.children);
//       }
//     }
    
    
//   });
//   return tmpData;

// }

// function generateRoutes(items) {
//   let routes = [];
//   items.forEach((item,k) => {
//     if(item.children) {
//       // if(item.path == '/') {
//       //   // console.info('ddd');
//       //   let route = {
//       //     path: item.path,
//       //     meta: item.meta,
//       //     icon: item.component,
//       //     component: (resolve) => require(['../../compoments/layouts/'+item.component+'.vue'], resolve),
//       //     children:[],
//       //   }

        
//       //   // console.info(route.children);
//       //   // console.info(item.children);

//       //   item.children.forEach((c,n)=>{
//       //     if(c.children) {
//       //       c.children.forEach((aa,i)=>{
//       //           route.children.push({
//       //             path:aa.path,
//       //             meta:aa.meta,
//       //             compoment: (resolve) => require(['../../views/'+aa.compoment+'vue'], resolve)
//       //           });
//       //       });
//       //     } else {
//       //       route.children.push({
//       //         path:c.path,
//       //         meta:c.meta,
//       //         compoment: (resolve) => require(['../../views/'+c.compoment+'vue'], resolve)
//       //       });
//       //     }
//       //   });
//       //   routes.push(route);
//       // }

//       let route = {
//         path: item.path,
//         meta: item.meta,
//         component: (resolve) => require(['../../compoments/layouts/'+item.component+'.vue'], resolve)
//       }
//       let childrens = [];
//       let tmpAchild = [];
//       item.children.forEach((it,n)=>{
//         childrens[n] = {
//           path: it.path,
//           meta: it.meta,
//           component: (resolve) => require(['../../views/'+it.component+'.vue'], resolve)
//         }
//         if(it.children) {
//           let tmpChild = [];
//           it.children.forEach((its,m)=>{
//             tmpChild[m] = {
//               path: its.path,
//               meta: its.meta,
//               component: (resolve) => require(['../../views/'+its.component+'.vue'], resolve)
//             } 
//           });
//           childrens[n].childrens = tmpChild;
//           if(item.path == '/') {
//             tmpAchild = tmpChild;
//           }
//           // console.info(k+'--'+n+ item.path);
//         }
//       });
//       route.children = childrens;


//       routes.push(route);
//     } else {
//       let route = {
//         path: item.path,
//         meta: item.meta,
//         component: (resolve) => require(['../../views/'+item.component+'.vue'], resolve)
//       }
//       routes.push(route);
//     }
//     // return false;
    
    
//   });


// const notFoundRoute = {
//       path: '*',
//       meta: {
//         title:'404',
//       },
//       component: (resolve) => require(['../../views/NotFoundComponent.vue'], resolve)
//     };
//   routes.push(notFoundRoute);
//   // console.info(routes);
//   return routes;
    
// }


function generateRoutes(data) {
  // console.info(data);
  let routes = [];
  data.forEach((line, k) => {
    if(line.children) {
      // console.info('dddd');
      let tmpAbc = [];
      line.children.forEach((l,i) =>{
        // console.info(l.path);
        // let tmpCba = [];
        
        if(l.children) {
          l.children.forEach((it,m)=>{
            tmpAbc.push({
              path:it.path,
              meta:it.meta,
              component: (resolve) => require(['../../views/'+it.component+'.vue'], resolve),
            });
          });
        } else {
          tmpAbc.push({
          path:l.path,
          meta:l.meta,
          component: (resolve) => require(['../../views/'+l.component+'.vue'], resolve),
        });
        }
        // console.info(l.children);
      });
      routes.push({
        path:line.path,
        meta:line.meta,
        component: (resolve) => require(['../../compoments/layouts/'+line.component+'.vue'], resolve),
        children:tmpAbc
      });
    } else {
      routes.push({
        path:line.path,
        meta:line.meta,
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
  }
}

// actions
const actions = {
  
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