/**
 * User Api
 */

import Util from '../libs/util'

export default {
  
  
  getPermissions (params) {
    return Util.ajax({
      method: 'get',
      url: '/api/permissions',
      data: params
    });
  },

  createPermissions(params) {
    return Util.ajax({
      method:'post',
      url: '/api/permissions',
      data:params
    });
  },

  updatePermissions(params) {
  	return Util.ajax({
  		method:'put',
  		url: '/api/permissions/' + params.id,
  		data:params
  	});
  },

  deletePermissions(params) {
    return Util.ajax({
      method:'delete',
      url: '/api/permissions/' + params.id,
      data:params
    });
  },

  getRoles (params) {
    return Util.ajax({
      method: 'get',
      url: '/api/roles',
      data: params
    });
  },

  createRoles(params) {
    return Util.ajax({
      method:'post',
      url: '/api/roles',
      data:params
    });
  },

  updateRoles(params) {
    return Util.ajax({
      method:'put',
      url: '/api/roles/' + params.id,
      data:params
    });
  },

  deleteRoles(params) {
    return Util.ajax({
      method:'delete',
      url: '/api/roles/' + params.id,
      data:params
    });
  }




}