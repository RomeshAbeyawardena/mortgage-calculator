import Vue from 'vue';
import App from './component/app';
require("./scss/index.scss");
require("./component");
require("./filter");
require("./directive");

document.addEventListener("DOMContentLoaded", () => {
    
new Vue({
  el: '#app',
  render: h => h(App),
    }); 
});
