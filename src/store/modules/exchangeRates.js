import axios from "axios";

const state = () => ({
  exchangeRates: [],
});

const getters = {};

const actions = {
  async fetchExchangeRates({ commit }) {
    const res = await axios("https://api.ratesapi.io/api/latest");
    commit("setExchangeRates", res.data);
  },
};

const mutations = {
  setExchangeRates(state, currencies) {
    state.exchangeRates = currencies;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
