import * as actions from './actions'
import * as getters from './getters'

import user from './modules/user'
import articles from './modules/articles'
import layout from './modules/layout'
import stock from './modules/stock'
import product from './modules/product'
import permissions from './modules/permissions'

// import createLogger from '../../../src/plugins/logger'

const debug = process.env.NODE_ENV !== 'production'

const StoreConstructorOptions = {
	actions,
  	getters,
  	modules: {
    	user,
    	articles,
    	layout,
      stock,
      product,
      permissions
  	},
  	strict: debug,
  	plugins: []
  	// plugins: debug ? [createLogger()] : []

}

export default StoreConstructorOptions;
