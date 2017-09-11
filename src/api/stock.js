/**
 * User Api
 */

import Util from '../libs/util'

export default {
  



  
  getRecord (params) {
    return Util.ajax({
      method: 'get',
      url: '/api/archives',
      data: params
    });
  },

  allocation(params) {
  	return Util.ajax({
  		method:'post',
  		url: '/api/allocation',
  		data:params
  	});
  }


}