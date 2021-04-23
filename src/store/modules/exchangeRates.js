import axios from "axios";

const state = () => ({
  exchangeRates: [],
  currencies: [],
});

const getters = {
  getExchangeRate: (state) => (source, target) => {
    const baseExchange = state.exchangeRates.find(
      (exchangeRate) => exchangeRate.base === source
    );
    const rate = baseExchange?.rates[target];
    return rate || 1;
  },
  getAllExchangeRates: (state) => () => {
    const baseExchange = state.exchangeRates[0];
    return Object.keys(baseExchange.rates);
  },
};

const actions = {
  async fetchExchangeRates({ commit }, base = "EUR") {
    const res = await axios(`https://api.ratesapi.io/api/latest?base=${base}`);
    // TODO: Add cache control.
    commit("setExchangeRates", res.data);
  },
};

const mutations = {
  setExchangeRates(state, exchangeRates) {
    state.exchangeRates = state.exchangeRates.concat(exchangeRates);

    if (state.currencies.length === 0) {
      state.currencies = Object.keys(exchangeRates.rates);
    }
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
