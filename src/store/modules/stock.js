import stock from '../../api/stock'
import * as types from '../mutation-types'
import routes from '../../router/routes'


const state = {
  record: [],
  curRecord:{},
  recordTotal:0
}
// getters
const getters = {
  record: state => state.record,
  curRecord: state => state.curRecord,
  recordTotal: state => state.recordTotal,
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

  }
  

}

// actions
const actions = {

  archiveAc({commit, state}, p) {
    console.info(p);
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