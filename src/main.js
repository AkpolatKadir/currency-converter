import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "reset-css";
import { initFontAwesome, initAxios, initToastNotification } from "@/inits";

initFontAwesome();
initAxios();
initToastNotification();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
