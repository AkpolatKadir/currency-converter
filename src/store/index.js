import Vue from "vue";
import Vuex from "vuex";
import exhangeRates from "./modules/exchangeRates";

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  modules: {
    exhangeRates,
  },
});

export default store;
