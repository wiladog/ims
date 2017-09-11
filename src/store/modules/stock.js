import stock from '../../api/stock'
import * as types from '../mutation-types'
import routes from '../../router/routes'


const state = {
  record: []
  
}
// getters
const getters = {
  record: state => state.record,
  
}




// mutations
const mutations = {
  
  [types.GET_RECORD] (state, data) {
      state.record = data;
  },

  [types.ALLOCATION] (state, data) {
    
  }
  

}

// actions
const actions = {
  
  getRecord ({commit,state}, p) {
    console.info(p);
    

    stock.getRecord(p).then((rsp)=>{
      // console.info(rsp);
      commit(types.GET_RECORD, rsp.data.data);
    });
    
    // let logins = user.logins(p);
    // logins.then((rsp) =>{
    //   // console.info(rsp);
    //   commit(types.LOGIN, rsp.data);
    // }).catch((error) => {
    //   commit(types.INTERNAL_ERROR);
    //   // console.info(error);
    // });
    // return logins;


  },
  allocation ({commit, state}, p) {
    // console.info(p);
    // return false;
    stock.allocation(p).then((rsp) =>{
      commit(types.ALLOCATION, rsp.data.data);
    });
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}