import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(VueToast, {
  position: "top-left",
  duration: 5000,
  dismissible: true,
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
