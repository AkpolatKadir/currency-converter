import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "reset-css";
import axios from "axios";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

axios.defaults.baseURL = "https://api.ratesapi.io/api";

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
