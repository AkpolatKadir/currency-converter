import axios from "axios";

const state = () => ({
  selectedDate: new Date().toISOString().split("T")[0],
  exchangeRates: {},
  currencies: [],
});

const getters = {
  getExchangeRate: (state) => (source, target) => {
    const { exchangeRates, selectedDate } = state;
    const rates = exchangeRates[selectedDate]?.[source];
    const rate = rates?.[target];
    return rate || 1;
  },
};

const actions = {
  async fetchExchangeRates(
    { state, commit },
    { date = state.selectedDate, base = "EUR" }
  ) {
    const baseExchange = state.exchangeRates[date]?.[base];
    if (baseExchange) {
      return;
    }

    const res = await axios(`https://api.ratesapi.io/api/${date}?base=${base}`);
    commit("setExchangeRates", { exchangeRates: res.data, date });

    if (state.currencies.length === 0) {
      const currencies = Object.keys(res.data.rates).concat(base);
      commit("setCurrencies", currencies);
    }
  },
};

const mutations = {
  setExchangeRates(state, { exchangeRates, date }) {
    const { base, rates } = exchangeRates;

    state.exchangeRates[date] = {
      ...state.exchangeRates[date],
      [base]: rates,
    };
  },

  setCurrencies(state, currencies) {
    state.currencies = currencies;
  },

  setSelectedDate(state, date) {
    state.selectedDate = date;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
