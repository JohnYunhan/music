import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import Ripple from 'vue-ripple-directive';
import store from './store';

import 'common/sass/index.scss';

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body);

Vue.directive('ripple', Ripple);
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
