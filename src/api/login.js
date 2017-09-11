/**
 * Mocking client-server processing
 */

import Util from '../libs/util'

export default {
  

  // captcha:this.loginData.captcha
  checkC (params, cb) {

    Util.ajax.post('http://demo.jixinghai.com/yidaiwang/public/index.php/api/login',{
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
  }
}