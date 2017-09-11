import product from '../../api/product'
import * as types from '../mutation-types'
import routes from '../../router/routes'


const state = {
  product: []
  
}
// getters
const getters = {
  product: state => state.product,
  
}


// mutations
const mutations = {
  
  [types.GET_PRODUCT] (state, data) {
      state.product = data;
  },

  [types.DELETE_PRODUCT] (state, data) {
      // console.info(data);
      state.product.splice(data, 1);
  },

  [types.CREATE_PRODUCT] (state, data) {
      state.product.push(data.data);
      // state.
  },

  [types.UPDATE_PRODUCT] (state, data) {
    // console.info(data);
      state.product.splice(data.index, 1, data.tmp);

  }
}

// actions
const actions = {
  
  getProduct ({commit,state}, p) {
    product.getProduct(p).then((rsp)=>{
      commit(types.GET_PRODUCT, rsp.data.data);
    });
  },
  createProduct ({commit, state}, p) {
    product.createProduct(p).then((rsp)=>{
      commit(types.CREATE_PRODUCT, rsp.data.data);
    });
  },
  updateProduct ({commit, state}, p) {
    let index = p.index;
    delete p.index;
    product.updateProduct(p).then((rsp)=>{
      // console.log(rsp.data.data.data);
      let tmp = rsp.data.data.data;
      commit(types.UPDATE_PRODUCT, {tmp, index});
    });
  },
  deleteProduct ({commit, state}, p) {
    let index = p.index;
    delete p.index;
    product.deleteProduct(p).then((rsp)=>{
      console.info(rsp);
      commit(types.DELETE_PRODUCT, index);
    });
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}