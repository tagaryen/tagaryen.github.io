import Vue from "vue";
import App from "./App";
import router from './router'
import events from './eventBus'
import ElementUI from "element-ui";
import "@scss/style.scss";


Vue.config.productionTip = true;
Vue.prototype.$events = events;
Vue.prototype.$save = window.localStorage;

Vue.use(ElementUI)


new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
