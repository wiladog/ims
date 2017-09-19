/**
 * User Api
 */

import Util from '../libs/util'

export default {



  addBox(params) {
    return Util.ajax({
        method:'post',
        url:'/api/addBox',
        data:params
    });
  },

  addRack(params) {
    return Util.ajax({
        method:'post',
        url:'/api/addRack',
        data:params
    });
  },
  addLocation(params) {
    return Util.ajax({
        method:'post',
        url:'/api/addLocation',
        data:params
    });
  },

  deleteFileRack(params) {
    return Util.ajax({
        method:'post',
        url:'/api/deleteFileRack',
        data:params
    });
  },
  editBox(params) {
    return Util.ajax({
        method:'post',
        url:'/api/editBox',
        data:params
    });
  },
  editRack(params) {
    return Util.ajax({
        method:'post',
        url:'/api/editRack',
        data:params
    });
  },
  editLocation(params) {
    return Util.ajax({
        method:'post',
        url:'/api/editLocation',
        data:params
    });
  },
  rack(params) {
    return Util.ajax({
        method:'post',
        url:'/api/rack',
        data:params
    });
  },
  secondmentFinish(params) {
    return Util.ajax({
        method:'post',
        url:'/api/secondmentFinish',
        data:params
    });
  },
  secondmentGiveback(params) {
    return Util.ajax({
        method:'post',
        url:'/api/secondmentGiveback',
        data:params
    });
  },
  secondmentTake(params) {
    return Util.ajax({
        method:'post',
        url:'/api/secondmentTake',
        data:params
    });
  },
  secondmentDistribute(params) {
    return Util.ajax({
      method:'post',
      url:'/api/secondmentDistribute',
      data:params
    });
  },
  secondmentAudit(params) {
    return Util.ajax({
      method:'post',
      url:'/api/secondmentAudit',
      data:params
    })
  },
  secondmentList(params) {
    return Util.ajax({
      method:'post',
      url:'/api/secondmentList',
      data:params
    });
  },
  secondment(params) {
    return Util.ajax({
      method:'post',
      url:'/api/secondment',
      data:params
    });
  },
  profile(params) {
    return Util.ajax({
      method:'post',
      url:'/api/profile',
      data:params
    });
  },
  profileList(params) {
    return Util.ajax({
      method:'post',
      url:'/api/profileList',
      data:params
    });
  },
  addPaper(params) {
    return Util.ajax({
      method:'post',
      url:'/api/addPaper',
      data:params,
    })
  },
  searchNumber(params) {
    return Util.ajax({
      method:'post',
      url:'/api/searchNumber/',
      data:params,
    })
  },
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