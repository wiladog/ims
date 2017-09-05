/**
 * User Api
 */

import Util from '../libs/util'

export default {
  

  // captcha:this.loginData.captcha
  checkC (params, cb) {

    Util.ajax.post('/api/login',{
      params:params
    })
    .then(function(response) {
      // if(response.data.status)
      console.info(response);
      cb(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  login (params, cb) {
    console.info(params);
    Util.ajax({
      method: 'post',
      url: '/api/login',
      data: params
    }).then(function (response) {
      // console.info('updateArticle');
      cb(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    return false;
  },
  routes(params) {
    return Util.ajax({
      method:'post',
      url:'/api/routes',
      data:params
    });
  },
  logins (params) {
    // console.info('aaaa');
    // console.info(params);
    return Util.ajax({
      method: 'post',
      url: '/api/login',
      data: params
    });


  },

  // login ()
}