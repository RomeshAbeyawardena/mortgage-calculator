import Vue from 'vue';
import App from './component/app';
import AsyncComputed from 'vue-async-computed';
require("./scss/index.scss");
require("./component");
require("./filter");
require("./directive");

document.addEventListener("DOMContentLoaded", () => {
Vue.use(AsyncComputed);

new Vue({
  el: '#app',
  render: h => h(App),
    }); 
});
