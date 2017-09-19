import product from '../../api/product'
import * as types from '../mutation-types'
import routes from '../../router/routes'


const state = {
  product: [],
  productParams:[],
  productFiles:[],
  
}
// getters
const getters = {
  product: state => state.product,
  productParams: state => state.productParams,
  productFiles: state => state.productFiles,
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
  },

  [types.UPDATE_PRODUCT] (state, data) {
    // console.info(data);
      state.product.splice(data.index, 1, data.tmp);

  },
  [types.GET_PRODUCT_PARAMS] (state, data) {
    state.productParams = [];
    data.forEach((line, k)=>{
      line.addOptionValue = '';
      if(line.type == 1 || line.type == 4) {
        line.options = [];
      } else {
        if(line.values) {
          line.options = line.values;
        }
        // line.options = line.values;
      }
      state.productParams.push(line);
    });
    // state.productParams = data;
  },

  [types.GET_PRODUCT_FILES] (state, data) {
    // console.info(data);
    // console.info('-------');
    state.productFiles = [];
    data.forEach((line,k)=>{
      console.info(line);
      line.uploadList = [];
      line.defaultList = [
        {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
      ];
      state.productFiles.push(line);
    })
    // state.productFiles = data;
  },

  [types.ADD_PARMAS_LINE] (state) {
    state.productParams.push({
        name:'',
        type:1,
        is_fontend_show:true,
        options:[],
        addOptionValue:''
    });
  },

  [types.UPDATE_PRVS] (state, data) {
    // console.inof(data);
    state.productParams = data;
  },

  upPrvs (state, data) {
    // console.info(data);
  }
}

// actions
const actions = {

  save({commit, state}, p) {
    product.saveParams(p).then((rsp)=>{
      // console.info(rsp);
      commit(types.UPDATE_PRVS, rsp.data.request);
    });
  },

  saveFiles({commit, state}, p) {
    product.saveFiles(p).then((rsp)=>{
      console.info(rsp);
      // commit(types.UPDATE_PRVS_FILES, rsp.data.request);
    });
  },

  addParmasLine({commit, state}) {
    commit(types.ADD_PARMAS_LINE);
  },


  getProductParams({commit, state}, p) {
    return new Promise(resolve => {
        product.getProductParams(p).then((rsp)=>{
          commit(types.GET_PRODUCT_PARAMS, rsp.data.data);
          resolve(rsp.data.data);
        });
        
      })
  },


  getproductFiles({commit, state}, p) {
    return new Promise(resolve => {
        product.getproductFiles(p).then((rsp)=>{
          console.info(rsp);
          console.log('-----------');
          commit(types.GET_PRODUCT_FILES, rsp.data.data);
          resolve(rsp.data.data);
        });
        
      })
  },





  
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