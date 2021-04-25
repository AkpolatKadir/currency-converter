import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export function initToastNotification() {
  Vue.use(VueToast, {
    position: "top-left",
    duration: 5000,
    dismissible: true,
  });
}
