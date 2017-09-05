import * as actions from './actions'
import * as getters from './getters'

import user from './modules/user'
import articles from './modules/articles'
import layout from './modules/layout'

// import createLogger from '../../../src/plugins/logger'


const debug = process.env.NODE_ENV !== 'production'

const StoreConstructorOptions = {
	actions,
  	getters,
  	modules: {
    	user,
    	articles,
    	layout
  	},
  	strict: debug,
  	plugins: []
  	// plugins: debug ? [createLogger()] : []

}

export default StoreConstructorOptions;
