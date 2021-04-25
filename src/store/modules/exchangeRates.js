import axios from "axios";
import { getDateText } from "../../utils";
import { defaultNetworkErrorMessage } from "../../constants";

const state = () => ({
  selectedDate: getDateText(new Date()),
  exchangeRates: {},
  currencies: [],
  isLoading: false,
  error: null,
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
    const hasBaseExchange = state.exchangeRates[date]?.[base];
    if (hasBaseExchange) {
      return;
    }

    try {
      commit("fetchExchangeRatesRequest");

      const res = await axios(`/${date}?base=${base}`);
      commit("setExchangeRates", { exchangeRates: res.data, date });
      commit("fetchExchangeRatesSuccess");

      if (state.currencies.length === 0) {
        const currencies = Object.keys(res.data.rates).concat(base);
        commit("setCurrencies", currencies);
      }
    } catch (e) {
      commit(
        "fetchExchangeRatesFailure",
        e.response?.data?.error || defaultNetworkErrorMessage
      );
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
    state.currencies = currencies.sort();
  },

  setSelectedDate(state, date) {
    state.selectedDate = date;
  },

  fetchExchangeRatesRequest(state) {
    state.error = null;
    state.isLoading = true;
  },

  fetchExchangeRatesSuccess(state) {
    state.error = null;
    state.isLoading = false;
  },

  fetchExchangeRatesFailure(state, error) {
    state.error = error;
    state.isLoading = false;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
