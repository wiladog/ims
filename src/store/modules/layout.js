import user from '../../api/user'
import * as types from '../mutation-types'

const state = {
  navtabs:[
    {
      name:'首页',
      icon:'ios-home-outline',
      path:'/dashboard',
      isActive: true,
    }
  ],
}
// getters
const getters = {
  navtabs: state => state.navtabs,
}

// mutations
const mutations = {
  [types.CHANGE_NAV_TABS] (state, data) {
    // console.info(data);
    let tmp = {
        name:data.meta.title,
        icon: data.meta.icon,
        isActive: true,
        path: data.path,
    };
    let index = 0;
    let isAdd = false;
    for(var i=0;i<state.navtabs.length;i++){
      // console.info(state.navtabs[i].path);
      // console.info(tmp.path);
        if(state.navtabs[i].path === tmp.path) {
          index = i;
          isAdd = true;
          break;
        } 
    }
    // console.info(isAdd);

    if(isAdd) {
      state.navtabs.forEach((line,k)=>{
        if(line.path === tmp.path) {
          state.navtabs[k].isActive = true;
        } else {
          state.navtabs[k].isActive = false;
        }
      });
    } else {
      state.navtabs.forEach((line,k)=>{
        if(line.isActive === true) {
          state.navtabs[k].isActive = false;
        } 
      });
      state.navtabs.push(tmp);
    }
  },

  [types.REMOVE_NAV_TABS] (state, index) {
    state.navtabs.splice(index, 1);
  }

}

// actions
const actions = {
  

  changeNavtabs ({commit,state}, p) {
    commit(types.CHANGE_NAV_TABS, p);
  },

  removeNavtab ({commit, state} ,p) {
    return new Promise(resolve => {
        let tmpss = {};
        for(var i=0;i<state.navtabs.length;i++){
          if(state.navtabs[i].isActive === true) {
            tmpss.index = i;
            break;
          } 
        }
        commit(types.REMOVE_NAV_TABS, p);
        if(p == tmpss.index) {
          tmpss.index = p - 1;
          tmpss.isPush = true;
        } else {
          tmpss.isPush = false;
        }
        resolve(tmpss)
    })
    
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}