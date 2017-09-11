import permissions from '../../api/permissions'
import * as types from '../mutation-types'
import routes from '../../router/routes'


const state = {
  permissions: [],
  roles:[],
  
}
// getters
const getters = {
  permissions: state => state.permissions,
  roles: state => state.roles,
  
}




// mutations
const mutations = {
  
  [types.GET_PERMISSIONS] (state, data) {
    console.info(data);
      state.permissions = data;
  },

  [types.UPDATE_PERMISSIONS] (state, data) {
    state.permissions.splice(data.index, 1, data.tmp);
  },

  [types.CREATE_PERMISSIONS] (state, data) {
    state.permissions.push(data)
  },

  [types.DELETE_PERMISSIONS] (state, data) {
    console.info(data);
    state.permissions.splice(data, 1);
  },

  [types.GET_ROLES] (state, data) {
      state.roles = data;
  },

  [types.UPDATE_ROLES] (state, data) {
    state.roles.splice(data.index, 1, data.tmp);
  },

  [types.CREATE_ROLES] (state, data) {
    state.roles.push(data)
  },

  [types.DELETE_ROLES] (state, data) {
    state.roles.splice(data, 1);
  }

  // 
  

}

// actions
const actions = {
  
  getPermissions ({commit,state}, p) {
    permissions.getPermissions(p).then((rsp)=>{
      commit(types.GET_PERMISSIONS, rsp.data.data);
    });
  },
  updatePermissions ({commit, state}, p) {
    let index = p.index;
    delete p.index;
    permissions.updatePermissions(p).then((rsp)=>{
      let tmp = rsp.data.data;
      commit(types.UPDATE_PERMISSIONS, {tmp, index});
    });
    
  },
  createPermissions({commit, state}, p) {
    permissions.createPermissions(p).then((rsp) =>{
      commit(types.CREATE_PERMISSIONS, rsp.data.data);
    });
  },
  deletePermissions({commit, state}, p) {
    let index = p.index;
    delete p.index;
    permissions.deletePermissions(p).then((rsp)=>{
      console.info(rsp);
      commit(types.DELETE_PERMISSIONS, index);
    });
    
  },

  getRoles ({commit,state}, p) {
    permissions.getRoles(p).then((rsp)=>{
      commit(types.GET_ROLES, rsp.data.data);
    });
  },
  updateRoles ({commit, state}, p) {
    let index = p.index;
    delete p.index;
    permissions.updateRoles(p).then((rsp)=>{
      let tmp = rsp.data.data;
      commit(types.UPDATE_ROLES, {tmp, index});
    });
    
  },
  createRoles({commit, state}, p) {
    permissions.createRoles(p).then((rsp) =>{
      commit(types.CREATE_ROLES, rsp.data.data);
    });
  },
  deleteRoles({commit, state}, p) {
    let index = p.index;
    delete p.index;
    permissions.deleteRoles(p).then((rsp)=>{
      console.info(rsp);
      commit(types.DELETE_ROLES, index);
    });
    
  }


}


export default {
  state,
  getters,
  actions,
  mutations
}