import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import VueLazyload from 'vue-lazyload';
// import store from './store';

import 'common/sass/index.scss';

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
