<template>
  <div id="app">
    <h1 class="appName">Currency Converter</h1>

    <div class="card">
      <input
        class="inputDate"
        type="date"
        min="1999-01-04"
        :max="today"
        id="conversion-history-date"
        name="conversion-history-date"
        aria-label="Conversion Rates Date"
        :value="selectedDate"
        @change="setSelectedDate($event.target.value)"
      />

      <div class="currencyItems">
        <CurrencyItem
          id="source"
          v-model="source"
          title="Source"
          :disabled="error"
          @onFocus="setFocus"
        />
        <CurrencyItem
          id="target"
          v-model="target"
          title="Target"
          :disabled="error"
          @onFocus="setFocus"
        />
      </div>

      <p class="exchangeRate">
        1 {{ source.currency }} =
        {{ !isLoading ? exchangeRateText : "..." }}
        {{ target.currency }}
      </p>
    </div>
  </div>
</template>

<script>
import CurrencyItem from "@/components/CurrencyItem.vue";
import { getConversionResult, getToday } from "@/utils";
import { PRECISION } from "@/constants";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {
    CurrencyItem,
  },
  data: function () {
    return {
      source: {
        amount: "1",
        currency: "",
      },
      target: {
        amount: "1",
        currency: "",
      },
      exchangeRate: 1,
      focusedInput: "source",
    };
  },
  methods: {
    ...mapMutations(["setSelectedDate"]),
    ...mapActions(["fetchExchangeRates"]),
    openFailureToast(errorMessage) {
      this.$toast.open({
        message: errorMessage,
        type: "error",
      });
    },
    setFocus(input) {
      this.focusedInput = input;
    },
  },
  computed: {
    ...mapGetters(["getExchangeRate"]),
    ...mapState({
      error: (state) => state.exchangeRates.error,
      isLoading: (state) => state.exchangeRates.isLoading,
      selectedDate: (state) => state.exchangeRates.selectedDate,
    }),
    today() {
      return getToday();
    },
    exchangeRateText() {
      return this.exchangeRate.toFixed(PRECISION);
    },
  },
  watch: {
    "source.amount": function (val) {
      if (this.focusedInput === "source") {
        this.target = {
          ...this.target,
          amount: getConversionResult(val, this.exchangeRate),
        };
      }
    },
    "source.currency": function (val) {
      this.fetchExchangeRates({ base: val }).then(() => {
        this.exchangeRate = this.getExchangeRate(
          this.source.currency,
          this.target.currency
        );
      });
    },
    "target.amount": function (val) {
      if (this.focusedInput === "target") {
        this.source = {
          ...this.source,
          amount: getConversionResult(val, 1 / this.exchangeRate),
        };
      }
    },
    "target.currency": function () {
      this.exchangeRate = this.getExchangeRate(
        this.source.currency,
        this.target.currency
      );
    },
    selectedDate: function (val) {
      this.fetchExchangeRates({
        base: this.source.currency,
        date: val,
      }).then(() => {
        this.exchangeRate = this.getExchangeRate(
          this.source.currency,
          this.target.currency
        );
      });
    },
    exchangeRate: function (val) {
      this.target = {
        ...this.target,
        amount: getConversionResult(this.source.amount, val),
      };
    },
    error: function (val) {
      if (val) this.openFailureToast(val);
    },
  },

  created() {
    this.fetchExchangeRates({ base: "EUR" }).then(() => {
      this.source.currency = "EUR"; // TODO: Get Local currency.
      this.target.currency = "USD";
    });
  },
};
</script>

<style lang="scss">
#app {
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 120px;
}

.inputDate {
  margin-bottom: 60px;
}

.appName {
  text-align: center;
}

.currencyItems {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  display: block;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
  border-radius: 6px;
  gap: 10px;
  min-height: 250px;
  width: 100%;
  max-width: 984px;
  margin: auto;
  box-shadow: 0 4px 29px rgb(0 0 0 / 10%);
}
</style>
