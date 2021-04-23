import axios from "axios";

const state = () => ({
  selectedDate: new Date().toISOString().split("T")[0],
  exchangeRates: {},
  currencies: [],
});

const getters = {
  getExchangeRate: (state) => (source, target) => {
    const rates = state.exchangeRates[state.selectedDate]?.[source];
    const rate = rates?.[target];
    return rate || 1;
  },
};

const actions = {
  async fetchExchangeRates({ state, commit }, base = "EUR") {
    const baseExchange = state.exchangeRates[state.selectedDate]?.[base];
    if (baseExchange) {
      return;
    }

    const res = await axios(`https://api.ratesapi.io/api/latest?base=${base}`);
    commit("setExchangeRates", res.data);

    if (state.currencies.length === 0) {
      const currencies = Object.keys(res.data.rates).concat(base);
      commit("setCurrencies", currencies);
    }
  },
};

const mutations = {
  setExchangeRates(state, exchangeRates) {
    const { date, base, rates } = exchangeRates;

    state.exchangeRates = {
      [date]: {
        ...state.exchangeRates[date],
        [base]: rates,
      },
    };
  },

  setCurrencies(state, currencies) {
    state.currencies = currencies;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
