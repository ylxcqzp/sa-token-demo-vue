import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import secret from "@/utils/secureUtil";

Vue.prototype.$Secret = secret;

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


