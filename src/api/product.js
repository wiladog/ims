/**
 * User Api
 */

import Util from '../libs/util'

export default {
  


saveParams(params) {
  return Util.ajax({
    method:'post',
    url:'api/product/params/save',
    data:params
  });
},

saveFiles(params) {
  return Util.ajax({
    method:'post',
    url:'api/product/params/savefiles',
    data:params
  });
},
  
  getProduct (params) {
    return Util.ajax({
      method: 'get',
      url: '/api/product',
      data: params
    });
  },

  createProduct (params) {
    return Util.ajax({
      method: 'post',
      url: '/api/product',
      data: params
    });
  },

  updateProduct (params) {
    return Util.ajax({
      method: 'put',
      url: '/api/product/'+params.id,
      data: params
    });
  },

  deleteProduct (params) {
    return Util.ajax({
      method: 'delete',
      url: '/api/product/' + params.id,
      data: params
    });
  },

  getProductParams (params) {
    return Util.ajax({
      method: 'post',
      url: '/api/product/params',
      data: params
    });
  },

  getproductFiles(params) {
    return Util.ajax({
      method:'post',
      url: '/api/product/getproductFiles',
      data:params
    });
  },

  getProductDemo (params) {
    return Util.ajax({
      method: 'get',
      url: '/api/product',
      data: params
    });
  },

}