import Vue from "vue";
import Vuex from "vuex";
import exchangeRates from "./modules/exchangeRates";

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  modules: {
    exchangeRates,
  },
});

export default store;
