import stock from '../../api/stock'
import * as types from '../mutation-types'
import routes from '../../router/routes'


const state = {
  record: [],
  curRecord:{},
  recordTotal:0,
  profileList:[],
  profileTotal:0,
  curProfile:[],
  secondmentList:[],
  secondmentListTotal:0,
  rack:[],
}
// getters
const getters = {
  record: state => state.record,
  curRecord: state => state.curRecord,
  recordTotal: state => state.recordTotal,
  profileList: state => state.profileList,
  profileTotal: state => state.profileTotal,
  curProfile: state => state.curProfile,
  secondmentList: state => state.secondmentList,
  secondmentListTotal:state => state.secondmentListTotal,
  rack: state => state.rack,
}




// mutations
const mutations = {
  
  [types.GET_RECORD] (state, data) {
      state.record = data.data;
      state.recordTotal = data.total;
  },

  [types.ALLOCATION] (state, data) {
    
  },
  [types.SHOW_RECORD] (state, data) {
    state.curRecord = data.data;
  },

  [types.ARCHIVEAC] (state, data) {

  },

  [types.GET_PROFILE_LIST] (state, data) {
    state.profileList = data.data;
    state.profileTotal = data.total;
  },
  [types.GET_PROFILE] (state, data) {
    state.curProfile = data.data;
  },

  [types.SECONDMENT_LIST] (state, data) {
    state.secondmentList = data.data;
    state.secondmentListTotal = data.total;
  },
  [types.SECONDMENT_AUDIT] (state, rsp) {
    state.secondmentList[rsp.index].status = rsp.status;
  },
  [types.SECONDMENT_DISTRIBUTE] (state, rsp) {
    state.secondmentList[rsp.index].status = rsp.status;
  },

  [types.SECONDMENT_TAKE] (state, rsp) {
    state.secondmentList[rsp.index].status = rsp.status;
  },

  [types.SECONDMENT_GIVEBACK] (state, rsp) {
    state.secondmentList[rsp.index].status = rsp.status;
  },

  [types.SECONDMENT_FINISH] (state, rsp) {
    state.secondmentList[rsp.index].status = rsp.status;
  },

  [types.GET_RACK] (state, rsp) {
    console.info(rsp);
    state.rack = rsp;
  },

  [types.EDIT_LOCATION] (state, rsp) {
    console.info(rsp.indexs);
    state.rack[rsp.indexs.l].name = rsp.data.name;
  },

  [types.EDIT_RACK] (state, rsp) {
      console.info(rsp.indexs);
      // console.info(state.rack[rsp.indexs.l].rack[state.rack[rsp.indexs.l][rsp.indexs.r]]);
      state.rack[rsp.indexs.l].rack[rsp.indexs.r].name = rsp.data.name;
  },
  [types.EDIT_BOX] (state, rsp) {
      console.info(rsp.indexs);
      state.rack[rsp.indexs.l].rack[rsp.indexs.r].box[rsp.indexs.b].name = rsp.data.name;
  },

  [types.DELETE_FILERACK] (state, rsp) {
    state.rack = rsp;
  },

  [types.ADD_LOCATION] (state, rsp) {
    state.rack = rsp;
  },

  [types.ADD_RACK] (state, rsp) {
    state.rack = rsp;
  },

  [types.ADD_BOX] (state, rsp) {
    state.rack = rsp;
  }

}

// actions
const actions = {
  addBox({commit, state}, request) {
    stock.addBox(request).then((rsp)=>{
      commit(types.ADD_BOX, rsp.data.data);
    });
  },
  addRack({commit, state}, request) {
    stock.addRack(request).then((rsp)=>{
      commit(types.ADD_RACK, rsp.data.data);
    });
  },
  addLocation({commit, state}, request) {
    stock.addLocation(request).then((rsp)=>{
      commit(types.ADD_LOCATION, rsp.data.data);
    });
  },
  deleteFileRack({commit, state}, request) {
    stock.deleteFileRack(request).then((rsp)=>{
      commit(types.DELETE_FILERACK, rsp.data.data);
    });
  },
  editRack({commit, state}, request) {
    let index = request.index;
    delete request.index;
    stock.editRack(request).then((rsp)=>{
      commit(types.EDIT_RACK, {indexs:index,data:rsp.data.data.data});
    });
    
  },
  editBox({commit, state}, request) {
    let index = request.index;
    delete request.index;
    stock.editBox(request).then((rsp)=>{
      commit(types.EDIT_BOX, {indexs:index,data:rsp.data.data.data});
    });
  },
  editLocation({commit, state}, request) {
    let index = request.index;
    delete request.index;
    stock.editLocation(request).then((rsp)=>{
      commit(types.EDIT_LOCATION, {indexs:index,data:rsp.data.data.data});
    });
  },

  // 档案架
  rack({commit, state}, request) {
    stock.rack(request).then((rsp)=>{
      // console.info(rsp.data.data);
      commit(types.GET_RACK, rsp.data.data);
    });
  },
  // 
  secondmentFinish({commit, state}, request) {
    stock.secondmentFinish(request).then((rsp)=>{
      commit(types.SECONDMENT_FINISH,{index:request.index,status:rsp.data.data.status});
    });
  },
  secondmentGiveback({commit, state}, request) {
    stock.secondmentGiveback(request).then((rsp)=>{
      commit(types.SECONDMENT_GIVEBACK,{index:request.index,status:rsp.data.data.status});
    });
  },
  secondmentTake({commit, state}, request) {
    stock.secondmentTake(request).then((rsp)=>{
      commit(types.SECONDMENT_TAKE,{index:request.index,status:rsp.data.data.status});
    });
  },
  secondmentDistribute({commit, state}, request) {
    stock.secondmentDistribute(request).then((rsp)=>{
      commit(types.SECONDMENT_DISTRIBUTE,{index:request.index,status:rsp.data.data.status});
    });
  },
  // 借调审核
  secondmentAudit({commit, state}, request) {
    stock.secondmentAudit(request).then((rsp)=>{
      commit(types.SECONDMENT_AUDIT, {index:request.index,status:rsp.data.data.status});
    });
  },

  secondmentList({commit, state}, p) {
    stock.secondmentList(p).then((rsp)=>{
      commit(types.SECONDMENT_LIST, rsp.data.data);
    });
  },

  secondment({commit, state}, p) {
    stock.secondment(p).then((rsp)=>{
      console.info(rsp);
    });
  },

  profile({commit, status}, p) {
    stock.profile(p).then((rsp)=>{
      commit(types.GET_PROFILE, rsp.data.data);
    });
  },
  profileList({commit, state}, p) {
    stock.profileList(p).then((rsp)=>{
      // console.info(rsp.data.data);
      commit(types.GET_PROFILE_LIST, rsp.data.data);
    });
  },

  addPaper({commit, state}, p) {
    stock.addPaper(p).then((rsp)=>{
      console.info(rsp);
    })
  },

  // 查找业务编号
  searchNumber({commit, state}, p) {
    

    return new Promise(resolve => {
        stock.searchNumber(p).then((rsp)=>{
          resolve(rsp.data.data);
        });
        
    });

  },
  archiveAc({commit, state}, p) {
    stock.archiveAc(p).then((rsp)=>{
      // commit(types.ARCHIVEAC, rsp.data);
    });
  },
  
  getRecord ({commit,state}, p) {
    

    stock.getRecord(p).then((rsp)=>{
      // console.info(rsp);
      commit(types.GET_RECORD, rsp.data.data);
    });
    
    

  },

  showRecord( {commit, state}, p) {
    stock.showRecord(p).then((rsp)=>{
      commit(types.SHOW_RECORD, rsp.data.data);
    });
  },
  allocation ({commit, state}, p) {
    // console.info(p);
    // return false;
    stock.allocation(p).then((rsp) =>{
      commit(types.ALLOCATION, rsp.data.data);
    });
  },
  audit ({commit, state}, p) {
    stock.audit(p).then((rsp)=>{
      // commit(types.ALLOCATION, rsp.data.data);
    });
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}