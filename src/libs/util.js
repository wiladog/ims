import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - ims' : 'ims';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    '' :
    env === 'production' ?
    'http://demo.jixinghai.com/yidaiwang/public/index.php/' :
    'http://demo.jixinghai.com/yidaiwang/public/index.php/';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default util;