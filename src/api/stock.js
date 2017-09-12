/**
 * User Api
 */

import Util from '../libs/util'

export default {
  

  archiveAc(params) {
    return Util.ajax({
      method:'post',
      url:'/api/archiving',
      data:params
    });
  },

  
  getRecord (params) {
    return Util.ajax({
      method: 'get',
      url: '/api/archives',
      // data: params,
      params: params
    });
  },
  showRecord(params) {
    return Util.ajax({
      method:'get',
      url:'/api/archives/' + params.id,
      data:params
    })
  },

  allocation(params) {
  	return Util.ajax({
  		method:'post',
  		url: '/api/allocation',
  		data:params
  	});
  },
  audit(params) {
    return Util.ajax({
      method:'post',
      url:'/api/audit',
      data:params
    });
  }


}