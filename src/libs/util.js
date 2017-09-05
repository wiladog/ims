import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - ims' : 'ims';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://archives.edai.dev' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    // baseURL: ajaxUrl,
    timeout: 30000
});

export default util;