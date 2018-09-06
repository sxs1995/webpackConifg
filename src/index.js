import str from './a.js';
document.getElementById('app').innerHTML = str;
import './index.css';
import './style.less';
import './style2.less';
if (module.hot) {
    module.hot.accept() //热更新
    // module.hot.accept('./a.js', function () {
    //     let str = require('./a.js');
    //     document.getElementById('app').innerHTML = str;
    // })
}